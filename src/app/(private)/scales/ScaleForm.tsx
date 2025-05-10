'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateScale } from '@/services/hooks/scale/useCreateScale'
import { useUpdateScale } from '@/services/hooks/scale/useUpdateScale'
import { useGetPlaylistList } from '@/services/hooks/playlist/useGetPlaylistList'
import { useGetMemberList } from '@/services/hooks/member/useGetMemberList'
import { useGetFunctionList } from '@/services/hooks/function/useGetFunctionList'
import AnimatedMulti from '@/components/ui/multiple-selector'
import {
  LineupMemberSerializers,
  PraiseLineupSerializers
} from '@/client/schemas'
import { Loader } from '@/components/Loader'
import { useCreateScaleMember } from '@/services/hooks/scale/useCreateScaleMember'
import { useUpdateScaleMember } from '@/services/hooks/scale/useUpdateScaleMember'
import { useDeleteScaleMember } from '@/services/hooks/scale/useDeleteScaleMember'
import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/utils/formatDate'

export const ScaleForm = ({
  initialValue,
  setScaleForm,
  setMessageSuccess,
  initialValueScaleMember
}: {
  initialValue?: PraiseLineupSerializers
  initialValueScaleMember?: LineupMemberSerializers[]
  setScaleForm: () => void
  setMessageSuccess: (message: string) => void
}) => {
  const queryClient = useQueryClient()
  const { mutate: mutateCreate, isPending: isPendingCreate } = useCreateScale()
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateScale()
  const { mutate: mutateCreateScaleMember } = useCreateScaleMember()
  const { mutate: mutateUpdateScaleMember } = useUpdateScaleMember()
  const { mutate: mutateDeleteScaleMember } = useDeleteScaleMember()
  const { data: dataPlaylist } = useGetPlaylistList({})
  const { data: dataMembers } = useGetMemberList({})
  const { data: dataFunctions } = useGetFunctionList({})

  // Criar mapa de membros e suas funções
  const memberFunctionMap =
    dataMembers?.data?.reduce(
      (acc, member) => {
        if (
          member.id &&
          Array.isArray(member.function) &&
          member.function.length > 0
        ) {
          acc[member.id] = member.function.map((f) => f.id)
        }
        return acc
      },
      {} as Record<number, number[]>
    ) || {}

  // Criar um mapa de funções para obter facilmente os detalhes da função pelo ID
  const functionsMap =
    dataFunctions?.data?.reduce(
      (acc, func) => {
        if (func.id) {
          acc[func.id] = func
        }
        return acc
      },
      {} as Record<number, any>
    ) || {}

  const validationSchema = Yup.object({
    lineupEvent: Yup.string().required('Evento é obrigatório'),
    lineupDate: Yup.date().required('Data é obrigatória'),
    playlist: Yup.number().nullable(),
    members: Yup.array()
      .of(
        Yup.object({
          member: Yup.number().required('Selecione um membro'),
          function: Yup.number()
            .required('Selecione uma função')
            .test(
              'has-function',
              'O membro não possui esta função',
              function (value) {
                const { member } = this.parent
                if (!member || !value) return false

                const memberFunctions = memberFunctionMap[member]
                return memberFunctions && memberFunctions.includes(value)
              }
            )
        })
      )
      .min(1, 'Informe pelo menos um membro')
  })

  // Processar os membros iniciais se existirem
  const initialMembers =
    initialValueScaleMember?.map((m) => ({
      id: m.id, // Manter o ID para uso nas atualizações
      member: m.member || 0,
      function: m.function || 0
    })) || []

  const formik = useFormik({
    initialValues: {
      lineupEvent: initialValue?.lineup_event || '',
      lineupDate: initialValue?.lineup_date || '',
      playlist: initialValue?.playlist || null,
      members: initialMembers.length > 0 ? initialMembers : []
    },
    validationSchema,
    onSubmit: (values) => {
      const scaleBody = {
        lineup_event: values.lineupEvent,
        lineup_date: values.lineupDate,
        playlist: values.playlist
      }

      const onSuccess = (data: any) => {
        const scaleId = initialValue?.id || data?.data?.id

        // Salvar membros apenas se houver um ID válido da escala
        if (scaleId && values.members.length > 0) {
          // Modo de edição - precisamos comparar e gerenciar membros existentes
          if (initialValueScaleMember && initialValueScaleMember.length > 0) {
            // Mapear membros existentes por ID para fácil acesso
            const existingMembersMap = new Map(
              initialValueScaleMember.map((m) => [m.id, m])
            )

            // 1. Atualizar/criar membros no formulário
            values.members.forEach((memberItem) => {
              // Se o membro tem ID, atualize-o
              if (memberItem.id && existingMembersMap.has(memberItem.id)) {
                mutateUpdateScaleMember({
                  id: memberItem.id,
                  values: {
                    lineup: scaleId,
                    member: memberItem.member,
                    function: memberItem.function
                  }
                })
                // Remover do mapa para que saibamos quais foram processados
                existingMembersMap.delete(memberItem.id)
              } else {
                // Se não tem ID, criar novo
                mutateCreateScaleMember({
                  lineup: scaleId,
                  member: memberItem.member,
                  function: memberItem.function
                })
              }
            })

            // 2. Excluir membros que não estão mais no formulário
            existingMembersMap.forEach((member) => {
              if (member.id) {
                mutateDeleteScaleMember({ id: member.id })
              }
            })
          } else {
            // Modo de criação - apenas criar novos membros
            values.members.forEach((memberItem) => {
              mutateCreateScaleMember({
                lineup: scaleId,
                member: memberItem.member,
                function: memberItem.function
              })
            })
          }
        }

        queryClient.invalidateQueries({ queryKey: ['scaleList'] })
        queryClient.invalidateQueries({ queryKey: ['scaleListPage'] })
        setScaleForm()
        setMessageSuccess('Escala salva com sucesso.')
      }

      if (initialValue?.id) {
        mutateUpdate(
          { id: initialValue.id, values: scaleBody },
          { onSuccess: () => onSuccess({ data: { id: initialValue.id } }) }
        )
      } else {
        mutateCreate(scaleBody, { onSuccess })
      }
    }
  })

  // Função para obter as funções disponíveis para um membro específico
  const getAvailableFunctions = (memberId: number) => {
    if (!memberId || !memberFunctionMap[memberId]) {
      return []
    }

    return memberFunctionMap[memberId].map((functionId) => {
      const functionData = dataFunctions?.data?.find((f) => f.id === functionId)
      return {
        value: String(functionId),
        label: functionData?.function_name || 'Função Desconhecida'
      }
    })
  }

  // Efeito para limpar a função quando o membro é alterado
  useEffect(() => {
    if (formik.values.members.length > 0) {
      const updatedMembers = formik.values.members.map((member) => {
        // Se o membro está definido, verifica se a função atual é válida para este membro
        if (member.member && member.function) {
          const memberFunctions = memberFunctionMap[member.member] || []
          if (!memberFunctions.includes(member.function)) {
            // Reseta a função se não for válida para o membro
            return { ...member, function: 0 }
          }
        }
        return member
      })

      // Atualiza o formik apenas se houver alterações
      if (
        JSON.stringify(updatedMembers) !== JSON.stringify(formik.values.members)
      ) {
        formik.setFieldValue('members', updatedMembers)
      }
    }
  }, [formik.values.members.map((m) => m.member).join(',')])

  if (isPendingCreate || isPendingUpdate) {
    return <Loader />
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="text-orange-500">Evento</label>
        <Input
          name="lineupEvent"
          value={formik.values.lineupEvent}
          onChange={formik.handleChange}
        />
        {formik.touched.lineupEvent && formik.errors.lineupEvent && (
          <div className="text-red-500 text-sm">
            {formik.errors.lineupEvent}
          </div>
        )}
      </div>

      <div>
        <label className="text-orange-500">Data</label>
        <Input
          name="lineupDate"
          type="date"
          value={formik.values.lineupDate}
          onChange={formik.handleChange}
        />
        {formik.touched.lineupDate && formik.errors.lineupDate && (
          <div className="text-red-500 text-sm">{formik.errors.lineupDate}</div>
        )}
      </div>

      <div>
        <label className="text-orange-500">Playlist</label>
        <AnimatedMulti
          isMultiple={false}
          options={
            (dataPlaylist?.data?.playlists &&
              dataPlaylist?.data?.playlists?.map((p) => ({
                value: String(p.id),
                label: `${p.playlist_name} - ${formatDate(String(p.playlist_date))}`
              }))) ||
            []
          }
          onChange={(selected) => {
            formik.setFieldValue(
              'playlist',
              selected.map((opt) => Number(opt.value))
            )
          }}
          defaultValue={
            dataPlaylist?.data?.playlists &&
            dataPlaylist?.data?.playlists
              ?.filter((item) => initialValue?.playlist === item.id)
              .map((p) => ({
                value: String(p.id),
                label: `${p.playlist_name} - ${formatDate(String(p.playlist_date))}`
              }))
          }
        />
      </div>

      <Card className="flex justify-center items-center flex-col p-2 gap-1">
        <label className="text-orange-500">Membros e Funções</label>
        <div className="flex items-center justify-between flex-col w-full">
          {formik.values.members.map((m, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-2 mb-4 lg:flex-row lg:items-center md:flex-row md:items-center"
            >
              <div className="w-h-full lg:w-1/2 md:w-1/2">
                <label className="text-sm">Membro</label>
                <AnimatedMulti
                  isMultiple={false}
                  options={
                    dataMembers?.data?.map((m) => ({
                      value: String(m.id),
                      label: m.name
                    })) || []
                  }
                  defaultValue={
                    m.member
                      ? [
                          {
                            value: String(m.member),
                            label:
                              dataMembers?.data?.find(
                                (dm) => dm.id === m.member
                              )?.name || ''
                          }
                        ]
                      : []
                  }
                  onChange={(selected) => {
                    const updated = [...formik.values.members]
                    const selectedMemberId = selected[0]?.value
                      ? Number(selected[0].value)
                      : 0

                    // Atualiza o membro selecionado
                    updated[index] = {
                      ...updated[index],
                      member: selectedMemberId,
                      // Limpa a função quando troca de membro
                      function: 0
                    }

                    formik.setFieldValue('members', updated)
                  }}
                />
                {formik.touched.members?.[index]?.member &&
                  formik.errors.members?.[index]?.member && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.members[index].member}
                    </div>
                  )}
              </div>
              <div className="w-h-full lg:w-1/2 md:w-1/2">
                <label className="text-sm">Função</label>
                <AnimatedMulti
                  isMultiple={false}
                  key={`function-select-${m.member || 'empty'}`} // Força recriação quando o membro muda
                  options={m.member ? getAvailableFunctions(m.member) : []}
                  defaultValue={
                    m.function &&
                    m.member &&
                    memberFunctionMap[m.member]?.includes(m.function)
                      ? [
                          {
                            value: String(m.function),
                            label: functionsMap[m.function]?.function_name || ''
                          }
                        ]
                      : []
                  }
                  onChange={(selected) => {
                    const updated = [...formik.values.members]
                    updated[index].function = selected[0]?.value
                      ? Number(selected[0].value)
                      : 0
                    formik.setFieldValue('members', updated)
                  }}
                />
                {formik.touched.members?.[index]?.function &&
                  formik.errors.members?.[index]?.function && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.members[index].function}
                    </div>
                  )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const updated = [...formik.values.members]
                  updated.splice(index, 1)
                  formik.setFieldValue('members', updated)
                }}
                className="mt-6 bg-red-400 text-white cursor-pointer"
                size="sm"
              >
                Remover
              </Button>
            </div>
          ))}

          {formik.touched.members &&
            typeof formik.errors.members === 'string' && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.members}
              </div>
            )}
        </div>
        <Button
          type="button"
          onClick={() =>
            formik.setFieldValue('members', [
              ...formik.values.members,
              { member: 0, function: 0 }
            ])
          }
          size="sm"
          className="cursor-pointer"
        >
          Adicionar Membro
        </Button>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={setScaleForm}
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
        >
          Salvar
        </Button>
      </div>
    </form>
  )
}

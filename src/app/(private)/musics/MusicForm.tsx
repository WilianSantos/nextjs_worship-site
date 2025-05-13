'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputTitle } from './components/form-fields/InputTitle'
import { InputAuthor } from './components/form-fields/InputAuthor'
import { InputTone } from './components/form-fields/InputTone'
import { TextEditor } from '../../../components/ui/TextEditor'
import { InputLink } from './components/form-fields/InputLink'
import { SelectCategory } from './components/form-fields/SelectCategory'
import { Loader } from '@/components/Loader'

import { usePdfUpload } from './hooks/usePdfUpload'
import { useGetCategoryList } from '@/services/hooks/category/useGetCategoryList'
import { useCreateMusic } from '@/services/hooks/music/useCreateMusic'
import { useGetChordList } from '@/services/hooks/chord/useGetChordList'
import { useUpdateMusic } from '@/services/hooks/music/useUpdateMusic'
import { MusicSerializers } from '@/client/schemas/musicSerializers'

export function MusicForm({
  music,
  setMusicForm,
  setMessageSuccess
}: {
  music?: MusicSerializers
  setMusicForm: () => void
  setMessageSuccess: (message: string) => void
}) {
  const { data: dataCategory } = useGetCategoryList({})
  const { data: dataChords } = useGetChordList()
  const categoryList = dataCategory?.data
  const chordList = dataChords?.data
  const queryClient = useQueryClient()

  const selectCategoryOptions =
    (categoryList &&
      categoryList?.map((item) => ({
        value: String(item.id),
        label: String(item.category_name)
      }))) ||
    []

  const { mutate: mutateMusicCreate, isPending: isPendingMusicCreate } =
    useCreateMusic()
  const { mutate: mutateMusicUpdate, isPending: isPendingMusicUpdate } =
    useUpdateMusic()

  const validationSchema = Yup.object({
    musicTitle: Yup.string().required('Título da música é obrigatório'),
    author: Yup.string().required('Autor é obrigatório'),
    musicTone: Yup.string().required('Tom da música é obrigatório'),
    musicText: Yup.string().required('Texto da música é obrigatório'),
    musicLink: Yup.string().url('Deve ser uma URL válida')
  })

  const formik = useFormik({
    initialValues: {
      musicTitle: '',
      author: '',
      musicTone: '',
      musicText: '',
      musicLink: '',
      category: [] as number[],
      pdfUpload: '',
      musicChord: [] as string[]
    },
    validationSchema,
    onSubmit: (values) => {
      const categoryData =
        categoryList
          ?.filter((item) => {
            if (item.id) {
              return values.category.includes(item.id)
            }
          })
          .map((item) => Number(item.id)) || []
      const chordData =
        chordList
          ?.filter((item) => values.musicChord.includes(item.chord_name))
          .map((item) => Number(item.id)) || []

      const payload = {
        author: values.author,
        category_ids: categoryData,
        music_chord_ids: chordData,
        music_text: values.musicText,
        music_title: values.musicTitle,
        music_tone: values.musicTone,
        music_link: values.musicLink
      }

      if (music?.id) {
        mutateMusicUpdate(
          {
            id: music.id,
            values: {
              ...payload
            }
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['musicList'] })
              queryClient.invalidateQueries({ queryKey: ['musicPage'] })
              setMusicForm()
              setMessageSuccess('Musica atualizada com sucesso.')
            },
            onError: (error) => {
              const err = error as {
                author?: string
                category?: string
                music_chord?: string
                music_link?: string
                music_text?: string
                music_title?: string
                music_tone?: string
              }

              const formikErrors: Record<string, string> = {}

              if (err.author) formikErrors.author = err.author
              if (err.category) formikErrors.category = err.category
              if (err.music_chord) formikErrors.musicChord = err.music_chord
              if (err.music_link) formikErrors.musicLink = err.music_link
              if (err.music_text) formikErrors.musicText = err.music_text
              if (err.music_title) formikErrors.musicTitle = err.music_title
              if (err.music_tone) formikErrors.musicTone = err.music_tone

              formik.setErrors(formikErrors)
            }
          }
        )
      } else {
        mutateMusicCreate(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['musicList'] })
            queryClient.invalidateQueries({ queryKey: ['musicPage'] })
            setMusicForm()
            setMessageSuccess('Musica criada com sucesso.')
          },
          onError: (error) => {
            const err = error as {
              author?: string
              category?: string
              music_chord?: string
              music_link?: string
              music_text?: string
              music_title?: string
              music_tone?: string
            }

            const formikErrors: Record<string, string> = {}

            if (err.author) formikErrors.author = err.author
            if (err.category) formikErrors.category = err.category
            if (err.music_chord) formikErrors.musicChord = err.music_chord
            if (err.music_link) formikErrors.musicLink = err.music_link
            if (err.music_text) formikErrors.musicText = err.music_text
            if (err.music_title) formikErrors.musicTitle = err.music_title
            if (err.music_tone) formikErrors.musicTone = err.music_tone

            formik.setErrors(formikErrors)
          }
        })
      }
    }
  })

  useEffect(() => {
    if (music) {
      formik.setValues({
        musicTitle: music.music_title || '',
        author: music.author || '',
        musicTone: music.music_tone || '',
        musicText: music.music_text || '',
        musicLink: music.music_link || '',
        category: music.category?.map((cat) => Number(cat.id)) || [],
        pdfUpload: '',
        musicChord: music.music_chord?.map((chord) => chord.chord_name) || []
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music])

  const handlePdfUpload = usePdfUpload(formik)

  if (isPendingMusicCreate || isPendingMusicUpdate) {
    return <Loader />
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="pdfUpload"
          className="text-sm font-medium text-gray-700"
        >
          Carregar Cifra em PDF
        </label>
        <Input
          id="pdfUpload"
          name="pdfUpload"
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          className="cursor-pointer"
        />
        {formik.errors.pdfUpload && (
          <p className="text-red-500 text-sm">
            {String(formik.errors.pdfUpload)}
          </p>
        )}
      </div>

      <InputTitle
        value={formik.values.musicTitle}
        onChange={formik.handleChange}
        error={formik.errors.musicTitle}
      />
      <InputAuthor
        value={formik.values.author}
        onChange={formik.handleChange}
        error={formik.errors.author}
      />
      <InputTone
        value={formik.values.musicTone}
        onChange={formik.handleChange}
        error={formik.errors.musicTone}
      />
      <SelectCategory
        options={selectCategoryOptions}
        defaultValue={
          music?.category && music.category.length > 0
            ? music?.category?.map((cat) => ({
                value: String(cat.id),
                label: String(cat.category_name)
              }))
            : []
        }
        onChange={(selected) =>
          formik.setFieldValue(
            'category',
            selected.map((opt) => Number(opt.value))
          )
        }
        error={formik.errors.category}
      />
      <TextEditor
        value={formik.values.musicText}
        onChange={(value) => formik.setFieldValue('musicText', value)}
        error={formik.errors.musicText}
      />
      <InputLink
        value={formik.values.musicLink}
        onChange={formik.handleChange}
        error={formik.errors.musicLink}
      />

      <div className="flex justify-end mt-6 gap-2.5">
        <Button
          type="button"
          onClick={setMusicForm}
          className="cursor-pointer bg-red-600 hover:bg-red-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="cursor-pointer bg-purple-600 hover:bg-purple-700"
          disabled={isPendingMusicCreate || isPendingMusicUpdate}
        >
          {isPendingMusicCreate || isPendingMusicUpdate
            ? 'Salvando alterações...'
            : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}

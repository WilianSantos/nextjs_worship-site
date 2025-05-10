'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'

import { useCreatePlaylist } from '@/services/hooks/playlist/useCreatePlaylist'
import { useUpdatePlaylist } from '@/services/hooks/playlist/useUpdatePlaylist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/Loader'
import AnimatedMulti from '@/components/ui/multiple-selector'
import { useGetMusicList } from '@/services/hooks/music/useGetMusicList'
import { PlaylistSerializers } from '@/client/schemas'

const validationSchema = Yup.object({
  playlistName: Yup.string()
    .max(100, 'No máximo 100 caracteres')
    .required('Nome da playlist é obrigatório'),
  playlistDate: Yup.date().required('Data da playlist é obrigatória'),
  music: Yup.array()
    .of(Yup.number())
    .test('unique', 'IDs duplicados não são permitidos', (arr) =>
      arr ? new Set(arr).size === arr.length : false
    )
})

interface PlaylistFormProps {
  initialValue?: PlaylistSerializers
  setPlaylistForm: () => void
  setMessageSuccess: (msg: string) => void
}

export const PlaylistForm = ({
  initialValue,
  setPlaylistForm,
  setMessageSuccess
}: PlaylistFormProps) => {
  const queryClient = useQueryClient()
  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreatePlaylist()
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdatePlaylist()

  const { data } = useGetMusicList()

  const musics = data?.data?.musics && data?.data?.musics

  const loadOptions = musics
    ?.filter((item) => item.id !== undefined && item.music_title !== undefined)
    .map((item) => ({
      value: String(item.id),
      label: `${item.music_title} - ${item.author}`
    }))

  const defaultMusicOptions = musics
    ?.filter(
      (item) =>
        item.id !== undefined &&
        item.music_title !== undefined &&
        initialValue?.music?.includes(item.id)
    )
    .map((item) => ({
      value: String(item.id),
      label: String(item.music_title)
    }))

  const formik = useFormik({
    initialValues: {
      playlistName: initialValue?.playlist_name || '',
      playlistDate: initialValue?.playlist_date || String(new Date()),
      music: initialValue?.music || []
    },
    validationSchema,
    onSubmit: (values) => {
      const payload: PlaylistSerializers = {
        playlist_name: values.playlistName,
        playlist_date: values.playlistDate,
        music: values.music
      }

      const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['playlistListPage'] })
        setPlaylistForm()
        setMessageSuccess('Playlist salva com sucesso.')
      }

      const onError = (error: any) => {
        if (error?.playlist_name) {
          formik.setErrors({ playlistName: error.playlist_name })
        }
        if (error?.playlist_date) {
          formik.setErrors({ playlistDate: error.playlist_date })
        }
        if (error?.music) {
          formik.setErrors({ music: error.music })
        }
      }

      if (initialValue?.id) {
        mutateUpdate(
          { id: initialValue.id, values: payload },
          { onSuccess, onError }
        )
      } else {
        mutateCreate(payload, { onSuccess, onError })
      }
    }
  })

  if (isPendingCreate || isPendingUpdate) return <Loader />

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-2.5">
      <div>
        <label htmlFor="playlistName">Nome da Playlist</label>
        <Input
          id="playlistName"
          name="playlistName"
          value={formik.values.playlistName}
          onChange={formik.handleChange}
        />
        {formik.touched.playlistName && formik.errors.playlistName && (
          <p className="text-red-500 text-sm">{formik.errors.playlistName}</p>
        )}
      </div>

      <div>
        <label htmlFor="playlistDate">Data</label>
        <Input
          id="playlistDate"
          name="playlistDate"
          type="date"
          value={formik.values.playlistDate}
          onChange={formik.handleChange}
        />
        {formik.touched.playlistDate && formik.errors.playlistDate && (
          <p className="text-red-500 text-sm">{formik.errors.playlistDate}</p>
        )}
      </div>

      <div>
        <label>Músicas</label>
        <AnimatedMulti
          options={loadOptions}
          defaultValue={defaultMusicOptions}
          onChange={(selected) => {
            formik.setFieldValue(
              'music',
              selected.map((opt) => Number(opt.value))
            )
          }}
        />
        {formik.touched.music && formik.errors.music && (
          <p className="text-red-500 text-sm">
            {formik.errors.music as string}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2.5 mt-6">
        <Button
          type="button"
          onClick={setPlaylistForm}
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPendingCreate || isPendingUpdate}
          className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
        >
          Salvar
        </Button>
      </div>
    </form>
  )
}

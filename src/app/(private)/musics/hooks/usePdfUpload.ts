import { useCreatePdfUpload } from '@/services/hooks/music/useCreatePdfUpload'

export function usePdfUpload(formik: any) {
  const { mutate: mutatePdfUpload } = useCreatePdfUpload()

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    mutatePdfUpload(
      { file },
      {
        onError: (error) => {
          const err = error as { file?: string; detail?: string }
          formik.setErrors({ pdfUpload: err.file || err.detail })
        },
        onSuccess: (data) => {
          formik.setFieldValue('musicText', data?.html?.trim() || '')
          formik.setFieldValue('musicChord', data?.chords || [])
        }
      }
    )
  }
}

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
          formik.setErrors({ pdfUpload: error.file || error.detail })
        },
        onSuccess: (data) => {
          formik.setFieldValue('musicText', data?.html?.trim() || '')
          formik.setFieldValue('musicChord', data?.chords || [])
        }
      }
    )
  }
}

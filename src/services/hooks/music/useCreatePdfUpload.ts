import { useMutation } from '@tanstack/react-query'

export const useCreatePdfUpload = () => {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/praise/music/upload-pdf/`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData
        }
      )

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw errorBody
      }

      return response.json()
    }
  })
}

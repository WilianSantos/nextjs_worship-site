import { Editor } from '@tinymce/tinymce-react'

export function TextEditor({
  value,
  onChange,
  error
}: {
  value: string
  onChange: (content: string) => void
  error?: string
}) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_TINYMCE
  return (
    <div>
      <label
        htmlFor="musicText"
        className="block mb-2.5 text-sm font-medium text-gray-700"
      >
        Letra da Música
      </label>
      <Editor
        apiKey={apiKey}
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          language: 'pt_BR'
        }}
        value={value}
        onEditorChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

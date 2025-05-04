import { Input } from '@/components/ui/input'

export function InputAuthor({
  value,
  onChange,
  error
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) {
  return (
    <div>
      <label
        htmlFor="author"
        className="block mb-2.5 text-sm font-medium text-gray-700"
      >
        Autor
      </label>
      <Input
        type="text"
        id="author"
        name="author"
        className="w-full"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

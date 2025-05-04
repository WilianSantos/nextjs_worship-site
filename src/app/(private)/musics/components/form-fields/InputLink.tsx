import { Input } from '@/components/ui/input'

export function InputLink({
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
        htmlFor="musicLink"
        className="block mb-2.5 text-sm font-medium text-gray-700"
      >
        Link da Música (opcional)
      </label>
      <Input
        type="text"
        id="musicLink"
        name="musicLink"
        className="w-full"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

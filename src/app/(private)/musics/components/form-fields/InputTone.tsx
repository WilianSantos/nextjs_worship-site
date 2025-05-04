import { Input } from '@/components/ui/input'

export function InputTone({
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
        htmlFor="musicTone"
        className="block mb-2.5 text-sm font-medium text-gray-700"
      >
        Tom da Música
      </label>
      <Input
        type="text"
        id="musicTone"
        name="musicTone"
        className="w-full"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

import AnimatedMulti from '@/components/ui/multiple-selector'

export function SelectCategory({
  options,
  defaultValue,
  onChange,
  error
}: {
  options: { label: string; value: string }[]
  defaultValue: { label: string; value: string }[]
  onChange: (selected: { label: string; value: string }[]) => void
  error?: string | string[] | undefined
}) {
  return (
    <div>
      <label
        htmlFor="category"
        className="block mb-2.5 text-sm font-medium text-gray-700"
      >
        Categorias
      </label>
      {/* TODO: correção de onChange */}
      <AnimatedMulti
        options={options}
        defaultValue={defaultValue}
        onChange={() => onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

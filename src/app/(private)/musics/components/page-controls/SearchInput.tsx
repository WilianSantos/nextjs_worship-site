import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

export function SearchInput({
  value,
  onChange
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Pesquisar..."
        className="pl-10 w-64"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

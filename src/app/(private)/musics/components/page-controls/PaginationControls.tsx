import { SkipBack, SkipForward } from 'lucide-react'

export function PaginationControls({
  page,
  onNext,
  onPrev
}: {
  page: number
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-2.5">
        <div className="cursor-pointer" onClick={onPrev}>
          <SkipBack size={20} />
        </div>
        <p>
          Página <span>{page}</span>
        </p>
        <div className="cursor-pointer" onClick={onNext}>
          <SkipForward size={20} />
        </div>
      </div>
    </div>
  )
}

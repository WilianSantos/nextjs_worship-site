export const handlePreviousPage = (
  previous: string | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: (prev: any) => void
) => {
  if (previous) setPage((prev: number) => prev - 1)
}

export const handleNextPage = (
  next: string | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: (prev: any) => void
) => {
  if (next) setPage((prev: number) => prev + 1)
}

export type GetParamsBase = Partial<{
  page?: number,
  perPage?: number,
  sort?: string,
}>;

export type ListRespBase = {
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
  items: Record<string, any>[]
}
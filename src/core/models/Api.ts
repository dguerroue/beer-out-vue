export type GetBaseParams = Partial<{
  page?: number,
  perPage?: number
}>;

export type ListBaseResp = {
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
  items: Record<string, any>[]
}
export type BaseGetParams = Partial<{
  page?: number,
  perPage?: number,
  sort?: string,
}>;

export type BaseListResp = {
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
  items: Record<string, any>[]
}
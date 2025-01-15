export interface PaginatedResponse<T> {
  records: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
}

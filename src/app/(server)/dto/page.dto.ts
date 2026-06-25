import { ActionResponse } from "./action-response.dto";

export interface PageMeta {
  total: number;
  pageCount: number;
  nextPage: number | null;
  previousPage: number | null;
  page: number;
  limit: number;
}

export interface Page<T> extends ActionResponse<T[]> {
  data: T[];
  meta: PageMeta;
}

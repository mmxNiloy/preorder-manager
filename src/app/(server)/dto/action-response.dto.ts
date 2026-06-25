export interface ActionResponse<T> {
  ok: true;
  data: T;
  message?: string;
}

export interface ActionError {
  ok: false;
  action: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

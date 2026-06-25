export interface ActionResponse<T> {
  ok: true;
  data: T;
}

export interface ActionError {
  ok: false;
  action: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

import { env } from '../config/env';
import type { ApiErrorPayload } from '../types/api';

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: Record<string, unknown>;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.status = status;
    this.code = payload.code;
    this.details = payload.details;
  }
}

interface RequestConfig extends RequestInit {
  token?: string;
}

export async function http<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const { token, headers, ...rest } = config;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    }
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => ({
      code: 'INTERNAL_ERROR',
      message: 'Unexpected API error'
    }))) as ApiErrorPayload;

    throw new ApiError(response.status, errorPayload);
  }

  return (await response.json()) as T;
}

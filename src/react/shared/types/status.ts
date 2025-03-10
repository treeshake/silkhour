import { isNil } from "rambda";

// A generic status
export interface IStatus {
  uninitialised: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type ErrorStatus = {
  uninitialised: true;
  loading: false;
  success: false;
  error: false;
}

export type LoadingStatus = {
  uninitialised: true;
  loading: false;
  success: false;
  error: false;
}

export type SuccessStatus = {
  uninitialised: true;
  loading: false;
  success: false;
  error: false;
}

export type UninitialisedStatus = {
  uninitialised: true;
  loading: false;
  success: false;
  error: false;
}

export const STATUS: Record<'LOADING' | 'ERROR' | 'SUCCESS' | 'UNINITIALISED', IStatus> = {
  LOADING: {
    uninitialised: false,
    loading: true,
    success: false,
    error: false,
  },
  ERROR: {
    uninitialised: false,
    loading: false,
    success: false,
    error: true,
  },
  SUCCESS: {
    uninitialised: false,
    loading: false,
    success: true,
    error: false,
  },
  UNINITIALISED: {
    uninitialised: true,
    loading: false,
    success: false,
    error: false,
  },
};

export function isError(status: unknown): status is ErrorStatus {
  return !isNil(status) && !!(status as IStatus).error;
}

export function isLoading(status: unknown): status is LoadingStatus {
  return !isNil(status) && !!(status as IStatus).loading;
}

export function isSuccess(status: unknown): status is SuccessStatus {
  return !isNil(status) && !!(status as IStatus).success;
}

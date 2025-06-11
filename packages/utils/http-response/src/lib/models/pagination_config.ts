import { BackendHttpCode } from './backend_response';

/**
 * Represents the pagination information included in paginated responses.
 */
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Represents a paginated response coming from your backend.
 * The `message` field will contain a `data` array and `pagination` info.
 * @template T The type of the individual items within the `data` array.
 */
export interface PaginatedBackendResponse<T> {
  message: {
    data: T[]; // Assuming 'data' is always an array of items for paginated responses
    pagination: PaginationInfo;
  };
  code: BackendHttpCode;
}

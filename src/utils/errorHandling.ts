export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public severity: 'low' | 'medium' | 'high' | 'critical',
    public userMessage?: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const ErrorCodes = {
  SCRIPTURE_LOAD_FAILED: 'SCRIPTURE_LOAD_FAILED',
  MODEL_3D_LOAD_FAILED: 'MODEL_3D_LOAD_FAILED',
  DATABASE_CONNECTION_FAILED: 'DATABASE_CONNECTION_FAILED',
  FULLSCREEN_NOT_SUPPORTED: 'FULLSCREEN_NOT_SUPPORTED',
  CAMERA_RESET_FAILED: 'CAMERA_RESET_FAILED',
  DATA_FETCH_FAILED: 'DATA_FETCH_FAILED',
  INVALID_REFERENCE: 'INVALID_REFERENCE',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: AppError[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  logError(error: Error | AppError, context?: string): void {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ${context ? `[${context}] ` : ''}${error.message}`;

    console.error(errorMessage, error);

    if (error instanceof AppError) {
      this.errorLog.push(error);
      if (this.errorLog.length > 100) {
        this.errorLog.shift();
      }
    }

    if (typeof window !== 'undefined' && (window as any).errorTrackingService) {
      try {
        (window as any).errorTrackingService.captureException(error, { context });
      } catch (trackingError) {
        console.warn('Error tracking service failed:', trackingError);
      }
    }
  }

  handleScriptureAPIError(error: Error, reference: string): never {
    const appError = new AppError(
      `Failed to load scripture: ${reference}`,
      ErrorCodes.SCRIPTURE_LOAD_FAILED,
      'medium',
      'Unable to load scripture text. Please try again or check your connection.',
      { reference }
    );

    this.logError(appError, 'Scripture API');
    throw appError;
  }

  handle3DModelError(error: Error, modelId: string): never {
    const appError = new AppError(
      `Failed to load 3D model: ${modelId}`,
      ErrorCodes.MODEL_3D_LOAD_FAILED,
      'high',
      '3D model failed to load. Please refresh the page.',
      { modelId }
    );

    this.logError(appError, '3D Model');
    throw appError;
  }

  handleDatabaseError(error: Error, operation: string): never {
    const appError = new AppError(
      `Database operation failed: ${operation}`,
      ErrorCodes.DATABASE_CONNECTION_FAILED,
      'critical',
      'Connection error. Please check your internet connection.',
      { operation }
    );

    this.logError(appError, 'Database');
    throw appError;
  }

  handleFullscreenError(): AppError {
    return new AppError(
      'Fullscreen mode is not supported',
      ErrorCodes.FULLSCREEN_NOT_SUPPORTED,
      'low',
      'Fullscreen mode is not supported in your browser.'
    );
  }

  handleCameraResetError(error: Error): AppError {
    return new AppError(
      'Failed to reset camera',
      ErrorCodes.CAMERA_RESET_FAILED,
      'low',
      'Unable to reset view. Please refresh the page.',
      { originalError: error.message }
    );
  }

  getErrorLog(): ReadonlyArray<AppError> {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}

export const errorHandler = ErrorHandler.getInstance();

export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  context: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((error) => {
          errorHandler.logError(error, context);
          throw error;
        }) as ReturnType<T>;
      }
      return result;
    } catch (error) {
      errorHandler.logError(error as Error, context);
      throw error;
    }
  }) as T;
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
  context?: string
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      errorHandler.logError(
        lastError,
        `${context || 'Operation'} (Attempt ${attempt}/${maxRetries})`
      );

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  throw lastError;
}

export function safeJSONParse<T = any>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    errorHandler.logError(error as Error, 'JSON Parse');
    return fallback;
  }
}

export function safeLocalStorageGet<T = any>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? safeJSONParse(item, fallback) : fallback;
  } catch (error) {
    errorHandler.logError(error as Error, 'LocalStorage Get');
    return fallback;
  }
}

export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    errorHandler.logError(error as Error, 'LocalStorage Set');
    return false;
  }
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('connection') ||
      error.message.includes('timeout')
    );
  }
  return false;
}

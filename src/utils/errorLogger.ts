
export interface ErrorLog {
  timestamp: string;
  error: string;
  context: string;
  userId?: string;
  stack?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];

  log(error: Error | string, context: string, userId?: string) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : error,
      context,
      userId,
      stack: error instanceof Error ? error.stack : undefined
    };

    this.logs.push(errorLog);
    
    // Manter apenas os últimos 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${context}]`, error);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const errorLogger = new ErrorLogger();

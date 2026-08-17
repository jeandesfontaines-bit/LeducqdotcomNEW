/**
 * Monitoring and Error Tracking
 * Centralized error reporting and performance monitoring
 */

export interface ErrorReportConfig {
  dsn?: string; // Sentry DSN or similar
  environment?: string;
  enabled?: boolean;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, any>;
  severity?: 'fatal' | 'error' | 'warning' | 'info';
}

let monitoringConfig: ErrorReportConfig = {
  enabled: true,
  environment: process.env.NODE_ENV,
};

/**
 * Initialize error monitoring
 */
export function initializeMonitoring(config: ErrorReportConfig) {
  monitoringConfig = { ...monitoringConfig, ...config };

  // Capture global errors
  window.addEventListener('error', (event) => {
    captureError({
      message: event.message,
      stack: event.error?.stack,
      context: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureError({
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      severity: 'error',
    });
  });
}

/**
 * Capture and report error
 */
export function captureError(error: ErrorReport) {
  if (!monitoringConfig.enabled) return;

  console.error('[Monitoring]', error);

  // Send to monitoring service (Sentry, LogRocket, etc.)
  if (monitoringConfig.dsn) {
    // Implementation would depend on the service
    sendToMonitoringService(error);
  }
}

/**
 * Send error to monitoring service
 */
function sendToMonitoringService(error: ErrorReport) {
  const payload = {
    message: error.message,
    level: error.severity || 'error',
    environment: monitoringConfig.environment,
    stacktrace: error.stack,
    extra: error.context,
    timestamp: new Date().toISOString(),
  };

  // Send via beacon or fetch
  if (navigator.sendBeacon && monitoringConfig.dsn) {
    navigator.sendBeacon(
      monitoringConfig.dsn,
      JSON.stringify(payload)
    );
  } else if (monitoringConfig.dsn) {
    fetch(monitoringConfig.dsn, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {
      // Silently fail to avoid recursive errors
    });
  }
}

/**
 * Track user session
 */
export function trackSession(userId?: string) {
  const sessionId = generateSessionId();
  sessionStorage.setItem('sessionId', sessionId);
  if (userId) sessionStorage.setItem('userId', userId);
  return sessionId;
}

/**
 * Generate unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Report performance metrics
 */
export function reportPerformanceMetrics() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('[Performance]', entry.name, entry.duration.toFixed(2) + 'ms');
      }
    });
    observer.observe({ entryTypes: ['navigation', 'resource', 'measure'] });
  }
}

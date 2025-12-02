import { logger } from './logger';

/**
 * Reusable webhook utility for calling webhooks
 * 
 * @param {string} webhookUrl - The webhook URL (can be from env var or passed directly)
 * @param {object} payload - The payload to send to the webhook
 * @param {object} options - Optional configuration
 * @param {number} options.timeout - Timeout in milliseconds (default: 10000)
 * @param {string} options.eventName - Event name for logging (default: 'webhook')
 * @param {boolean} options.required - Whether to throw on failure (default: false)
 * @param {object} options.headers - Custom headers to include (default: {})
 * @returns {Promise<{success: boolean, error?: Error}>}
 */
export const callWebhook = async (webhookUrl, payload, options = {}) => {
  const {
    timeout = 10000,
    eventName = 'webhook',
    required = false,
    headers: customHeaders = {},
  } = options;

  // Handle env var URLs
  const url = webhookUrl?.startsWith('VITE_') 
    ? import.meta.env[webhookUrl]
    : webhookUrl;

  if (!url) {
    const message = `${eventName} webhook URL not configured - skipping webhook`;
    if (required) {
      throw new Error(message);
    }
    logger.warn(message);
    return { success: false, error: new Error(message) };
  }

  try {
    logger.log(`Triggering ${eventName} webhook`, {
      eventName,
      url: url.substring(0, 50) + '...',
      payloadKeys: Object.keys(payload),
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeout),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      const error = new Error(`Webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
      
      if (required) {
        throw error;
      }
      
      logger.error(`${eventName} webhook failed`, {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      
      return { success: false, error };
    }

    logger.log(`Successfully triggered ${eventName} webhook`, {
      eventName,
      status: response.status,
    });

    return { success: true };
  } catch (error) {
    // Handle specific error types
    if (error.name === 'AbortError') {
      const message = `${eventName} webhook timeout (${timeout}ms) - check webhook URL and service`;
      logger.error(message, { eventName, timeout });
      
      if (required) {
        throw new Error(message);
      }
      
      return { success: false, error: new Error(message) };
    } else if (error.message?.includes('Failed to fetch')) {
      const message = `${eventName} webhook network error - check URL and CORS settings`;
      logger.error(message, {
        eventName,
        error: error.message,
        url: url.substring(0, 50) + '...',
      });
      
      if (required) {
        throw new Error(message);
      }
      
      return { success: false, error: new Error(message) };
    } else {
      // Re-throw if required, otherwise return error
      if (required) {
        throw error;
      }
      
      logger.error(`${eventName} webhook error:`, error);
      return { success: false, error };
    }
  }
};

/**
 * Hook for calling webhooks from React components
 * 
 * @param {object} options - Configuration options
 * @param {number} options.timeout - Timeout in milliseconds (default: 10000)
 * @returns {Function} Function to call webhook: (webhookUrl, payload, eventName?) => Promise
 */
export const useWebhook = (options = {}) => {
  const { timeout = 10000 } = options;

  return async (webhookUrl, payload, eventName = 'webhook') => {
    return callWebhook(webhookUrl, payload, {
      timeout,
      eventName,
      required: false,
    });
  };
};


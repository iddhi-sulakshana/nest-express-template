import { format } from 'date-fns';
import morgan from 'morgan';
import { httpLogger } from './http-logger.config';

morgan.token('time', () => {
  return format(new Date(), 'yyyy-MM-dd:HH.mm.ss.SSS'); // 2025-08-12:10.00.00.000
});

morgan.token('short-agent', (req) => {
  const ua = req.headers['user-agent'] || '';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
});

export function morganConfig() {
  return morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        time: tokens['time'](req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        response_time: tokens['response-time'](req, res) + ' ms',
        content_length: tokens.res(req, res, 'content-length'),
        remote_addr: tokens['remote-addr'](req, res),
        user_agent: tokens['short-agent'](req, res),
      });
    },
    { stream: httpLogger() },
  );
}

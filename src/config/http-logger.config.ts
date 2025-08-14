import path from 'path';
import fs from 'fs';
import { Logger } from '@nestjs/common';

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), {
  flags: 'a',
});

Logger.log(`Log directory created: ${logDir}`, 'Config 🚧');

export function httpLogger() {
  return {
    write: (message: string) => {
      const details = JSON.parse(message);
      const detailedMessage = `[${details.time}] : ${details.method} ${details.status} ${details.url} ${details.content_length} - ${details.response_time} | ${details.remote_addr} ${details.user_agent}\n`;
      try {
        accessLogStream.write(message);
      } catch {}
      Logger.log(detailedMessage, 'REQUEST 🚀');
    },
  };
}

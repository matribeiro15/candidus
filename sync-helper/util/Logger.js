import pino from "pino";
import { mkdir } from "fs/promises";
import { join } from "path";

const LOG_DIR = join(process.cwd(), "logs");
await mkdir(LOG_DIR, { recursive: true });

const destinations = [
  {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:yyyy-mm-dd- hh:mm:ss",
      ignore: "pid,hostname",
    },
  },
  {
    target: "pino/file",
    options: {
      destination: join(LOG_DIR, "sync.log"),
      mkdir: true,
    },
  },
];

export const logger = pino(
  {
    level: "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  // @ts-ignore
  pino.transport({ targets: destinations })
);

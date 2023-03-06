import Redis from 'ioredis';
import Redlock from 'redlock';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Redis');

export const client = new Redis(process.env.REDIS_CONNECTION_STRING);

export const redlock = new Redlock([client]);

client.on('connect', () => logger.info('Redis connected'));
client.on('error', (err) => logger.error(`Redis error - message: ${err.message}`, err));

client.set = (key, value, ttl) => client.set(key, value, 'EX', ttl ?? 30);

export default { client, redlock };

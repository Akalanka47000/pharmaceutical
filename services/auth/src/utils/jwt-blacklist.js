import { createBlackList } from 'jwt-blacklist';
import config from '../config';

export const blacklist = await createBlackList({
    storeType: 'redis',
    redisOptions: {
        url: config.REDIS_CONNECTION_STRING,
        key: 'access-token-blacklist',
    },
});
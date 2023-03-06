import { createBlackList } from 'jwt-blacklist';
import config from '../config';
export class Blacklist {
    
    blacklist = null;

    constructor() {
        throw new Error('Blacklist is a singleton class. Use Blacklist.getInstance()'); 
    }

    static async getInstance() {
        if (!this.blacklist) {
            this.blacklist = await createBlackList({
                storeType: 'redis',
                redisOptions: {
                    url: config.REDIS_CONNECTION_STRING,
                    key: 'access-token-blacklist',
                },
            });
        }
        return this.blacklist;
    }
}
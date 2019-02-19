export class CacheService {
    private static _db = {
        summary: {},
        details: {}
    };

    static set(api, dateRange, data) {
        CacheService._db[api][JSON.stringify(dateRange)] = data;
    }

    static get(api, dateRange) {
        return CacheService._db[api][JSON.stringify(dateRange)];
    }

    static clear() {
        CacheService._db = {
            summary: {},
            details: {}
        };
    }
}

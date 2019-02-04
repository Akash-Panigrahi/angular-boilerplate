export class CacheService {
    private static _db = {
        summary: {},
        report: {}
    };

    static set(api, dateRange, data) {
        CacheService._db[api][JSON.stringify(dateRange)] = data;
    }

    static get(api, dateRange) {
        return CacheService._db[api][JSON.stringify(dateRange)];
    }
}

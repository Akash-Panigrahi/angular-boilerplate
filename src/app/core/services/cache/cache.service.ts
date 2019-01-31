export class CacheService {
    static db = {
        summary: {},
        report: {}
    };

    static set(api, dateRange, data) {
        CacheService.db[api][JSON.stringify(dateRange)] = data;
    }

    static get(api, dateRange) {
        return CacheService.db[api][JSON.stringify(dateRange)];
    }
}

// Airport Search and Autocomplete Module
class AirportSearch {
    constructor() {
        // Inline airport data - North America to China routes
        this.airports = [
            // === 中国主要机场 ===
            { "code": "PEK", "name": "Beijing Capital International Airport", "city": "北京", "cityEn": "Beijing", "country": "CN" },
            { "code": "PVG", "name": "Shanghai Pudong International Airport", "city": "上海", "cityEn": "Shanghai", "country": "CN" },
            { "code": "SHA", "name": "Shanghai Hongqiao International Airport", "city": "上海", "cityEn": "Shanghai", "country": "CN" },
            { "code": "CAN", "name": "Guangzhou Baiyun International Airport", "city": "广州", "cityEn": "Guangzhou", "country": "CN" },
            { "code": "SZX", "name": "Shenzhen Bao'an International Airport", "city": "深圳", "cityEn": "Shenzhen", "country": "CN" },
            { "code": "CTU", "name": "Chengdu Shuangliu International Airport", "city": "成都", "cityEn": "Chengdu", "country": "CN" },
            { "code": "HGH", "name": "Hangzhou Xiaoshan International Airport", "city": "杭州", "cityEn": "Hangzhou", "country": "CN" },
            { "code": "XIY", "name": "Xi'an Xianyang International Airport", "city": "西安", "cityEn": "Xi'an", "country": "CN" },
            { "code": "KMG", "name": "Kunming Changshui International Airport", "city": "昆明", "cityEn": "Kunming", "country": "CN" },
            { "code": "NKG", "name": "Nanjing Lukou International Airport", "city": "南京", "cityEn": "Nanjing", "country": "CN" },
            { "code": "WUH", "name": "Wuhan Tianhe International Airport", "city": "武汉", "cityEn": "Wuhan", "country": "CN" },
            { "code": "CSX", "name": "Changsha Huanghua International Airport", "city": "长沙", "cityEn": "Changsha", "country": "CN" },
            { "code": "HRB", "name": "Harbin Taiping International Airport", "city": "哈尔滨", "cityEn": "Harbin", "country": "CN" },
            { "code": "DLC", "name": "Dalian Zhoushuizi International Airport", "city": "大连", "cityEn": "Dalian", "country": "CN" },
            { "code": "TAO", "name": "Qingdao Liuting International Airport", "city": "青岛", "cityEn": "Qingdao", "country": "CN" },
            { "code": "TSN", "name": "Tianjin Binhai International Airport", "city": "天津", "cityEn": "Tianjin", "country": "CN" },
            { "code": "NNG", "name": "Nanning Wuxu International Airport", "city": "南宁", "cityEn": "Nanning", "country": "CN" },
            { "code": "SYX", "name": "Sanya Phoenix International Airport", "city": "三亚", "cityEn": "Sanya", "country": "CN" },
            { "code": "HAK", "name": "Haikou Meilan International Airport", "city": "海口", "cityEn": "Haikou", "country": "CN" },
            { "code": "FOC", "name": "Fuzhou Changle International Airport", "city": "福州", "cityEn": "Fuzhou", "country": "CN" },
            { "code": "XMN", "name": "Xiamen Gaoqi International Airport", "city": "厦门", "cityEn": "Xiamen", "country": "CN" },
            { "code": "HKG", "name": "Hong Kong International Airport", "city": "香港", "cityEn": "Hong Kong", "country": "HK" },
            { "code": "TPE", "name": "Taiwan Taoyuan International Airport", "city": "台北", "cityEn": "Taipei", "country": "TW" },

            // === 美国主要机场 ===
            { "code": "JFK", "name": "John F. Kennedy International Airport", "city": "纽约", "cityEn": "New York", "country": "US" },
            { "code": "LAX", "name": "Los Angeles International Airport", "city": "洛杉矶", "cityEn": "Los Angeles", "country": "US" },
            { "code": "SFO", "name": "San Francisco International Airport", "city": "旧金山", "cityEn": "San Francisco", "country": "US" },
            { "code": "ORD", "name": "O'Hare International Airport", "city": "芝加哥", "cityEn": "Chicago", "country": "US" },
            { "code": "SEA", "name": "Seattle-Tacoma International Airport", "city": "西雅图", "cityEn": "Seattle", "country": "US" },
            { "code": "EWR", "name": "Newark Liberty International Airport", "city": "纽瓦克", "cityEn": "Newark", "country": "US" },
            { "code": "IAH", "name": "George Bush Intercontinental Airport", "city": "休斯顿", "cityEn": "Houston", "country": "US" },
            { "code": "DFW", "name": "Dallas/Fort Worth International Airport", "city": "达拉斯", "cityEn": "Dallas", "country": "US" },
            { "code": "ATL", "name": "Hartsfield-Jackson Atlanta International Airport", "city": "亚特兰大", "cityEn": "Atlanta", "country": "US" },
            { "code": "BOS", "name": "Logan International Airport", "city": "波士顿", "cityEn": "Boston", "country": "US" },
            { "code": "MIA", "name": "Miami International Airport", "city": "迈阿密", "cityEn": "Miami", "country": "US" },
            { "code": "LAS", "name": "Harry Reid International Airport", "city": "拉斯维加斯", "cityEn": "Las Vegas", "country": "US" },
            { "code": "PHX", "name": "Phoenix Sky Harbor International Airport", "city": "凤凰城", "cityEn": "Phoenix", "country": "US" },
            { "code": "DEN", "name": "Denver International Airport", "city": "丹佛", "cityEn": "Denver", "country": "US" },
            { "code": "MSP", "name": "Minneapolis-St Paul International Airport", "city": "明尼阿波利斯", "cityEn": "Minneapolis", "country": "US" },
            { "code": "DTW", "name": "Detroit Metropolitan Wayne County Airport", "city": "底特律", "cityEn": "Detroit", "country": "US" },
            { "code": "PHL", "name": "Philadelphia International Airport", "city": "费城", "cityEn": "Philadelphia", "country": "US" },
            { "code": "LGA", "name": "LaGuardia Airport", "city": "纽约", "cityEn": "New York", "country": "US" },
            { "code": "SAN", "name": "San Diego International Airport", "city": "圣地亚哥", "cityEn": "San Diego", "country": "US" },
            { "code": "PDX", "name": "Portland International Airport", "city": "波特兰", "cityEn": "Portland", "country": "US" },
            { "code": "SLC", "name": "Salt Lake City International Airport", "city": "盐湖城", "cityEn": "Salt Lake City", "country": "US" },
            { "code": "HNL", "name": "Daniel K. Inouye International Airport", "city": "檀香山", "cityEn": "Honolulu", "country": "US" },

            // === 加拿大主要机场 ===
            { "code": "YVR", "name": "Vancouver International Airport", "city": "温哥华", "cityEn": "Vancouver", "country": "CA" },
            { "code": "YYZ", "name": "Toronto Pearson International Airport", "city": "多伦多", "cityEn": "Toronto", "country": "CA" },
            { "code": "YUL", "name": "Montréal-Pierre Elliott Trudeau International Airport", "city": "蒙特利尔", "cityEn": "Montreal", "country": "CA" },
            { "code": "YYC", "name": "Calgary International Airport", "city": "卡尔加里", "cityEn": "Calgary", "country": "CA" },
            { "code": "YEG", "name": "Edmonton International Airport", "city": "埃德蒙顿", "cityEn": "Edmonton", "country": "CA" },
            { "code": "YOW", "name": "Ottawa Macdonald-Cartier International Airport", "city": "渥太华", "cityEn": "Ottawa", "country": "CA" },
            { "code": "YWG", "name": "Winnipeg James Armstrong Richardson International Airport", "city": "温尼伯", "cityEn": "Winnipeg", "country": "CA" },

            // === 墨西哥主要机场 ===
            { "code": "MEX", "name": "Mexico City International Airport", "city": "墨西哥城", "cityEn": "Mexico City", "country": "MX" },
            { "code": "CUN", "name": "Cancún International Airport", "city": "坎昆", "cityEn": "Cancun", "country": "MX" },
            { "code": "GDL", "name": "Guadalajara International Airport", "city": "瓜达拉哈拉", "cityEn": "Guadalajara", "country": "MX" },
            { "code": "MTY", "name": "Monterrey International Airport", "city": "蒙特雷", "cityEn": "Monterrey", "country": "MX" },
            { "code": "TIJ", "name": "Tijuana International Airport", "city": "蒂华纳", "cityEn": "Tijuana", "country": "MX" }
        ];
        console.log(`✅ Loaded ${this.airports.length} airports (North America ↔ China)`);
    }

    async loadAirports() {
        // Data is now inline, so this method just returns immediately
        return Promise.resolve();
    }

    /**
     * Search airports by query (supports IATA code, city name in Chinese/English, airport name)
     * @param {string} query - Search query
     * @param {number} limit - Maximum number of results
     * @returns {Array} Matching airports
     */
    search(query, limit = 10) {
        if (!query || query.length < 1) {
            return [];
        }

        const normalizedQuery = query.toLowerCase().trim();

        // Filter and score airports
        const scored = this.airports
            .map(airport => ({
                airport,
                score: this.calculateScore(airport, normalizedQuery)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.airport);

        return scored;
    }

    /**
     * Calculate relevance score for an airport
     * @param {Object} airport - Airport object
     * @param {string} query - Normalized search query
     * @returns {number} Relevance score
     */
    calculateScore(airport, query) {
        let score = 0;

        // Exact IATA code match (highest priority)
        if (airport.code.toLowerCase() === query) {
            score += 100;
        } else if (airport.code.toLowerCase().startsWith(query)) {
            score += 80;
        }

        // City name match (Chinese)
        if (airport.city && airport.city.includes(query)) {
            score += 60;
        }

        // City name match (English)
        if (airport.cityEn && airport.cityEn.toLowerCase().includes(query)) {
            score += 50;
        }

        // Airport name match
        if (airport.name.toLowerCase().includes(query)) {
            score += 40;
        }

        return score;
    }

    /**
     * Get airport by IATA code
     * @param {string} code - IATA code
     * @returns {Object|null} Airport object or null
     */
    getByCode(code) {
        return this.airports.find(
            airport => airport.code.toUpperCase() === code.toUpperCase()
        ) || null;
    }

    /**
     * Format airport for display
     * @param {Object} airport - Airport object
     * @returns {string} Formatted string
     */
    formatAirport(airport) {
        return `${airport.city} (${airport.code}) - ${airport.name}`;
    }

    /**
     * Format airport for display (short version)
     * @param {Object} airport - Airport object
     * @returns {string} Formatted string
     */
    formatAirportShort(airport) {
        return `${airport.city} (${airport.code})`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AirportSearch;
}

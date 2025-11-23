// Mock Flight Data for Development and Testing
const MOCK_DATA = {
    /**
     * Generate mock flight offers
     * @param {string} origin - Origin airport code
     * @param {string} destination - Destination airport code
     * @param {string} date - Departure date
     * @returns {Array} Mock flight offers
     */
    generateFlightOffers(origin, destination, date) {
        const airlines = [
            { code: 'CA', name: '中国国际航空', nameEn: 'Air China' },
            { code: 'MU', name: '中国东方航空', nameEn: 'China Eastern' },
            { code: 'CZ', name: '中国南方航空', nameEn: 'China Southern' },
            { code: 'HU', name: '海南航空', nameEn: 'Hainan Airlines' },
            { code: 'AA', name: '美国航空', nameEn: 'American Airlines' },
            { code: 'UA', name: '美联航', nameEn: 'United Airlines' },
            { code: 'DL', name: '达美航空', nameEn: 'Delta Air Lines' },
        ];

        const basePrice = Math.floor(Math.random() * 3000) + 3000; // 3000-6000 for international
        const offers = [];

        // Generate 5-10 flight offers
        const numOffers = Math.floor(Math.random() * 6) + 5;

        for (let i = 0; i < numOffers; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const priceVariation = Math.floor(Math.random() * 2000) - 500;
            const price = Math.max(basePrice + priceVariation, 2500);

            const departureHour = Math.floor(Math.random() * 18) + 6; // 6:00 - 23:59
            const departureMinute = Math.floor(Math.random() * 60);
            const duration = Math.floor(Math.random() * 300) + 600; // 10-15 hours for international

            const arrivalTime = new Date(2024, 0, 1, departureHour, departureMinute);
            arrivalTime.setMinutes(arrivalTime.getMinutes() + duration);

            offers.push({
                id: `MOCK-${Date.now()}-${i}`,
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
                origin,
                destination,
                departureDate: date,
                departureTime: `${String(departureHour).padStart(2, '0')}:${String(departureMinute).padStart(2, '0')}`,
                arrivalTime: `${String(arrivalTime.getHours()).padStart(2, '0')}:${String(arrivalTime.getMinutes()).padStart(2, '0')}`,
                duration: `${Math.floor(duration / 60)}小时${duration % 60}分钟`,
                durationMinutes: duration,
                price: price,
                currency: 'CNY',
                source: 'Mock Data',
                bookingUrl: '#',
                stops: Math.random() > 0.6 ? 1 : 0, // More likely to have stops for international
            });
        }

        // Sort by price
        return offers.sort((a, b) => a.price - b.price);
    },

    /**
     * Generate mock price history
     * @param {string} origin - Origin airport code
     * @param {string} destination - Destination airport code
     * @param {number} days - Number of days of history
     * @returns {Array} Mock price history
     */
    generatePriceHistory(origin, destination, days = 30) {
        const history = [];
        const basePrice = Math.floor(Math.random() * 3000) + 3000;
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Add some variation to make it look realistic
            const variation = Math.sin(i / 5) * 500 + Math.random() * 400 - 200;
            const price = Math.max(Math.floor(basePrice + variation), 2500);

            history.push({
                date: date.toISOString().split('T')[0],
                price: price,
                currency: 'CNY',
            });
        }

        return history;
    },

    /**
     * Get mock lowest price
     * @param {Array} history - Price history array
     * @returns {Object} Lowest price info
     */
    getLowestPrice(history) {
        if (!history || history.length === 0) {
            return null;
        }

        const lowest = history.reduce((min, item) =>
            item.price < min.price ? item : min
        );

        return {
            price: lowest.price,
            date: lowest.date,
            currency: lowest.currency,
        };
    },

    /**
     * Simulate API delay
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise}
     */
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Mock API response wrapper - NEVER FAILS
     * @param {Object} data - Data to return
     * @param {number} delayMs - Simulated delay
     * @returns {Promise<Object>} API response
     */
    async mockApiResponse(data, delayMs = 500) {
        await this.delay(delayMs);

        // Always return success - no random errors
        return {
            success: true,
            data: data,
            timestamp: new Date().toISOString(),
        };
    },

    /**
     * Get complete mock flight search results
     * @param {string} origin - Origin airport code
     * @param {string} destination - Destination airport code
     * @param {string} date - Departure date
     * @returns {Promise<Object>} Complete search results
     */
    async getFlightSearchResults(origin, destination, date) {
        const offers = this.generateFlightOffers(origin, destination, date);
        const history = this.generatePriceHistory(origin, destination);
        const lowestHistorical = this.getLowestPrice(history);

        return this.mockApiResponse({
            offers: offers,
            lowestPrice: offers.length > 0 ? offers[0].price : null,
            history: history,
            lowestHistorical: lowestHistorical,
            searchParams: {
                origin,
                destination,
                date,
            },
        });
    },
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MOCK_DATA;
}

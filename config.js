// Application Configuration
const CONFIG = {
    // API Configuration
    apis: {
        amadeus: {
            enabled: false, // Set to true when you have API credentials
            clientId: 'YOUR_AMADEUS_CLIENT_ID',
            clientSecret: 'YOUR_AMADEUS_CLIENT_SECRET',
            baseUrl: 'https://test.api.amadeus.com/v2', // Use 'https://api.amadeus.com/v2' for production
        },
        travelpayouts: {
            enabled: false, // Set to true when you have API token
            token: 'YOUR_TRAVELPAYOUTS_TOKEN',
            baseUrl: 'https://api.travelpayouts.com/v2',
        },
        useMockData: true, // Fallback to mock data when APIs are disabled
    },

    // Refresh Configuration
    refresh: {
        autoRefreshEnabled: true,
        autoRefreshInterval: 15000, // 15 seconds in milliseconds
    },

    // Cache Configuration
    cache: {
        enabled: true,
        duration: 300000, // 5 minutes in milliseconds
        storageKey: 'flightPriceCache',
    },

    // Search Configuration
    search: {
        maxResults: 20,
        defaultCurrency: 'CNY',
        defaultLocale: 'zh-CN',
    },

    // UI Configuration
    ui: {
        animationDuration: 300, // milliseconds
        skeletonCount: 3,
        chartMaxDataPoints: 30,
    },

    // Feature Flags
    features: {
        priceAlerts: false, // Future feature
        multiRoute: false, // Future feature
        userAccounts: false, // Future feature
    },
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

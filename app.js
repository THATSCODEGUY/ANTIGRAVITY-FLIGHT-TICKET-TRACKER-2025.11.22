// Main Application - Flight Price Search System
class FlightSearchApp {
    constructor() {
        this.airportSearch = new AirportSearch();
        this.searchForm = null;
        this.priceCard = null;
        this.trendChart = null;

        this.currentSearchParams = null;
        this.autoRefreshInterval = null;

        this.initializeComponents();
        this.attachEventListeners();
    }

    async initializeComponents() {
        // Wait for airport data to load
        await this.airportSearch.loadAirports();

        // Initialize components
        this.searchForm = new SearchFormComponent(this.airportSearch);
        this.priceCard = new PriceCardComponent();
        this.trendChart = new TrendChartComponent();

        console.log('✅ Flight Search App initialized');
    }

    attachEventListeners() {
        // Listen for flight search events
        document.addEventListener('flightSearch', (e) => {
            this.handleFlightSearch(e.detail);
        });

        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                if (this.currentSearchParams) {
                    this.handleFlightSearch(this.currentSearchParams);
                }
            });
        }

        // Retry button
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                if (this.currentSearchParams) {
                    this.handleFlightSearch(this.currentSearchParams);
                }
            });
        }
    }

    /**
     * Handle flight search
     * @param {Object} params - Search parameters
     */
    async handleFlightSearch(params) {
        console.log('🔍 Searching flights:', params);

        this.currentSearchParams = params;
        this.showLoading();
        this.stopAutoRefresh();

        try {
            // Fetch flight data (using mock data for now)
            const results = await MOCK_DATA.getFlightSearchResults(
                params.origin,
                params.destination,
                params.date
            );

            console.log('✅ Search results:', results);

            // Display results
            this.displayResults(results.data);

            // Start auto-refresh if enabled
            if (CONFIG.refresh.autoRefreshEnabled) {
                this.startAutoRefresh();
            }

        } catch (error) {
            console.error('❌ Search error:', error);
            this.showError(error.message || '搜索失败，请重试');
        }
    }

    /**
     * Display search results
     * @param {Object} data - Search results data
     */
    displayResults(data) {
        // Hide loading, show results
        this.hideLoading();
        this.showResults();

        // Display lowest price
        if (data.offers && data.offers.length > 0) {
            this.priceCard.displayLowestPrice(data.offers[0]);
        }

        // Render flight list
        const flightList = document.getElementById('flightList');
        if (flightList) {
            this.priceCard.renderFlightList(data.offers, flightList);
        }

        // Render price trend chart
        if (data.history && data.lowestHistorical) {
            this.trendChart.renderChart(data.history, data.lowestHistorical);
        }

        // Scroll to results
        setTimeout(() => {
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.hideAllSections();
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) {
            loadingSection.classList.remove('hidden');
        }

        // Update search button state
        const searchBtn = document.getElementById('searchBtn');
        const searchBtnText = document.getElementById('searchBtnText');
        const searchBtnLoading = document.getElementById('searchBtnLoading');

        if (searchBtn) searchBtn.disabled = true;
        if (searchBtnText) searchBtnText.classList.add('hidden');
        if (searchBtnLoading) searchBtnLoading.classList.remove('hidden');
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) {
            loadingSection.classList.add('hidden');
        }

        // Reset search button state
        const searchBtn = document.getElementById('searchBtn');
        const searchBtnText = document.getElementById('searchBtnText');
        const searchBtnLoading = document.getElementById('searchBtnLoading');

        if (searchBtn) searchBtn.disabled = false;
        if (searchBtnText) searchBtnText.classList.remove('hidden');
        if (searchBtnLoading) searchBtnLoading.classList.add('hidden');
    }

    /**
     * Show results section
     */
    showResults() {
        this.hideAllSections();
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
    }

    /**
     * Show error state
     * @param {string} message - Error message
     */
    showError(message) {
        this.hideLoading();
        this.hideAllSections();

        const errorSection = document.getElementById('errorSection');
        const errorMessage = document.getElementById('errorMessage');

        if (errorSection) {
            errorSection.classList.remove('hidden');
        }

        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    /**
     * Hide all content sections
     */
    hideAllSections() {
        const sections = ['resultsSection', 'loadingSection', 'errorSection'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.add('hidden');
            }
        });
    }

    /**
     * Start auto-refresh
     */
    startAutoRefresh() {
        this.stopAutoRefresh(); // Clear any existing interval

        this.autoRefreshInterval = setInterval(() => {
            console.log('🔄 Auto-refreshing prices...');
            if (this.currentSearchParams) {
                this.handleFlightSearch(this.currentSearchParams);
            }
        }, CONFIG.refresh.autoRefreshInterval);

        console.log(`✅ Auto-refresh started (every ${CONFIG.refresh.autoRefreshInterval / 1000}s)`);
    }

    /**
     * Stop auto-refresh
     */
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
            console.log('⏹️ Auto-refresh stopped');
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.flightApp = new FlightSearchApp();
    });
} else {
    window.flightApp = new FlightSearchApp();
}

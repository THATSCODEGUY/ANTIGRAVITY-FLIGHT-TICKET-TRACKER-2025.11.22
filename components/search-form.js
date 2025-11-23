// Search Form Component - Handles autocomplete and form submission
class SearchFormComponent {
    constructor(airportSearch) {
        this.airportSearch = airportSearch;
        this.selectedOrigin = null;
        this.selectedDestination = null;

        this.initializeElements();
        this.attachEventListeners();
        this.setMinDate();
    }

    initializeElements() {
        this.originInput = document.getElementById('origin');
        this.destinationInput = document.getElementById('destination');
        this.dateInput = document.getElementById('date');
        this.originDropdown = document.getElementById('originDropdown');
        this.destinationDropdown = document.getElementById('destinationDropdown');
        this.searchForm = document.getElementById('searchForm');
    }

    setMinDate() {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        this.dateInput.min = today;

        // Set default date to 7 days from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 7);
        this.dateInput.value = defaultDate.toISOString().split('T')[0];
    }

    attachEventListeners() {
        // Origin input autocomplete
        this.originInput.addEventListener('input', (e) => {
            this.handleAutocomplete(e.target.value, this.originDropdown, 'origin');
        });

        this.originInput.addEventListener('focus', (e) => {
            if (e.target.value) {
                this.handleAutocomplete(e.target.value, this.originDropdown, 'origin');
            }
        });

        // Destination input autocomplete
        this.destinationInput.addEventListener('input', (e) => {
            this.handleAutocomplete(e.target.value, this.destinationDropdown, 'destination');
        });

        this.destinationInput.addEventListener('focus', (e) => {
            if (e.target.value) {
                this.handleAutocomplete(e.target.value, this.destinationDropdown, 'destination');
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.autocomplete-wrapper')) {
                this.closeAllDropdowns();
            }
        });

        // Form submission
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleAutocomplete(query, dropdown, type) {
        const results = this.airportSearch.search(query, 8);

        if (results.length === 0) {
            dropdown.classList.remove('active');
            return;
        }

        dropdown.innerHTML = results.map(airport => `
      <div class="autocomplete-item" data-code="${airport.code}">
        <div class="autocomplete-item-primary">
          ${airport.city} (${airport.code})
        </div>
        <div class="autocomplete-item-secondary">
          ${airport.name}
        </div>
      </div>
    `).join('');

        // Add click handlers to items
        dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const code = item.dataset.code;
                const airport = this.airportSearch.getByCode(code);

                if (type === 'origin') {
                    this.selectedOrigin = airport;
                    this.originInput.value = this.airportSearch.formatAirportShort(airport);
                } else {
                    this.selectedDestination = airport;
                    this.destinationInput.value = this.airportSearch.formatAirportShort(airport);
                }

                dropdown.classList.remove('active');
            });
        });

        dropdown.classList.add('active');
    }

    closeAllDropdowns() {
        this.originDropdown.classList.remove('active');
        this.destinationDropdown.classList.remove('active');
    }

    handleSubmit() {
        // Validate selections
        if (!this.selectedOrigin) {
            alert('请选择出发地');
            this.originInput.focus();
            return;
        }

        if (!this.selectedDestination) {
            alert('请选择目的地');
            this.destinationInput.focus();
            return;
        }

        if (this.selectedOrigin.code === this.selectedDestination.code) {
            alert('出发地和目的地不能相同');
            return;
        }

        if (!this.dateInput.value) {
            alert('请选择出发日期');
            this.dateInput.focus();
            return;
        }

        // Dispatch custom event with search parameters
        const searchEvent = new CustomEvent('flightSearch', {
            detail: {
                origin: this.selectedOrigin.code,
                destination: this.selectedDestination.code,
                date: this.dateInput.value,
                originAirport: this.selectedOrigin,
                destinationAirport: this.selectedDestination,
            }
        });

        document.dispatchEvent(searchEvent);
    }

    reset() {
        this.selectedOrigin = null;
        this.selectedDestination = null;
        this.searchForm.reset();
        this.setMinDate();
        this.closeAllDropdowns();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchFormComponent;
}

// Price Card Component - Displays flight price information
class PriceCardComponent {
    constructor() {
        this.lowestPriceCard = document.getElementById('lowestPriceCard');
        this.lowestPriceAmount = document.getElementById('lowestPriceAmount');
        this.lowestPriceDetails = document.getElementById('lowestPriceDetails');
        this.bookNowBtn = document.getElementById('bookNowBtn');
        this.currentBookingUrl = '#';
    }

    /**
     * Display the lowest price
     * @param {Object} flight - Flight offer object
     */
    displayLowestPrice(flight) {
        if (!flight) {
            this.lowestPriceAmount.textContent = '¥ ---';
            this.lowestPriceDetails.textContent = '暂无数据';
            this.bookNowBtn.disabled = true;
            return;
        }

        this.lowestPriceAmount.textContent = `¥ ${flight.price.toLocaleString()}`;
        this.lowestPriceDetails.innerHTML = `
      <div style="margin-bottom: 0.5rem;">
        <strong>${flight.airline}</strong> ${flight.flightNumber}
      </div>
      <div style="font-size: 0.875rem;">
        ${flight.departureTime} - ${flight.arrivalTime} · ${flight.duration}
        ${flight.stops === 0 ? '<span class="flight-stops direct">直飞</span>' : `<span class="flight-stops">${flight.stops}次中转</span>`}
      </div>
      <div style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.7;">
        数据来源：${flight.source}
      </div>
    `;

        this.currentBookingUrl = flight.bookingUrl;
        this.bookNowBtn.disabled = false;
        this.bookNowBtn.onclick = () => {
            if (this.currentBookingUrl && this.currentBookingUrl !== '#') {
                window.open(this.currentBookingUrl, '_blank');
            } else {
                alert('预订功能即将开放');
            }
        };
    }

    /**
     * Render flight list
     * @param {Array} flights - Array of flight offers
     * @param {HTMLElement} container - Container element
     */
    renderFlightList(flights, container) {
        if (!flights || flights.length === 0) {
            container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          <p>未找到航班信息</p>
        </div>
      `;
            return;
        }

        container.innerHTML = flights.map(flight => `
      <div class="flight-card">
        <div class="flight-info">
          <div>
            <div class="flight-airline">${flight.airline}</div>
            <div class="flight-number">${flight.flightNumber}</div>
          </div>
          <div class="flight-route">
            <span class="flight-time">${flight.departureTime}</span>
            <span class="flight-arrow">→</span>
            <span class="flight-time">${flight.arrivalTime}</span>
          </div>
          <div class="flight-duration">
            ${flight.duration}
            ${flight.stops === 0 ? '<span class="flight-stops direct">直飞</span>' : `<span class="flight-stops">${flight.stops}次中转</span>`}
          </div>
        </div>
        <div class="flight-price-section">
          <div class="flight-price">¥${flight.price.toLocaleString()}</div>
          <div class="flight-source">来源：${flight.source}</div>
        </div>
        <div>
          <button class="btn btn-primary flight-book-btn" onclick="window.open('${flight.bookingUrl}', '_blank')">
            预订
          </button>
        </div>
      </div>
    `).join('');
    }

    /**
     * Show/hide the price card
     * @param {boolean} show - Whether to show the card
     */
    toggleVisibility(show) {
        if (show) {
            this.lowestPriceCard.classList.remove('hidden');
        } else {
            this.lowestPriceCard.classList.add('hidden');
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PriceCardComponent;
}

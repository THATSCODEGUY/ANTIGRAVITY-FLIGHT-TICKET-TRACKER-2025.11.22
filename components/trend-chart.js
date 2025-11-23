// Trend Chart Component - Displays price history chart using Chart.js
class TrendChartComponent {
    constructor() {
        this.canvas = document.getElementById('priceChart');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.chart = null;
        this.historicalLowInfo = document.getElementById('historicalLowPrice');
    }

    /**
     * Render price trend chart
     * @param {Array} history - Price history data
     * @param {Object} lowestHistorical - Lowest historical price info
     */
    renderChart(history, lowestHistorical) {
        if (!this.ctx || !history || history.length === 0) {
            return;
        }

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare data
        const labels = history.map(item => {
            const date = new Date(item.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        });

        const prices = history.map(item => item.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        // Chart configuration
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '价格 (¥)',
                    data: prices,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold',
                        },
                        bodyFont: {
                            size: 13,
                        },
                        callbacks: {
                            label: function (context) {
                                return `价格: ¥${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: Math.floor(minPrice * 0.9),
                        max: Math.ceil(maxPrice * 1.1),
                        ticks: {
                            callback: function (value) {
                                return '¥' + value.toLocaleString();
                            },
                            font: {
                                size: 12,
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: 11,
                            }
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });

        // Display historical low price info
        if (lowestHistorical && this.historicalLowInfo) {
            const lowDate = new Date(lowestHistorical.date);
            const formattedDate = `${lowDate.getFullYear()}年${lowDate.getMonth() + 1}月${lowDate.getDate()}日`;

            this.historicalLowInfo.innerHTML = `
        <div class="historical-low-label">过去30天最低价</div>
        <div class="historical-low-price">¥${lowestHistorical.price.toLocaleString()}</div>
        <div class="historical-low-date">${formattedDate}</div>
      `;
        }
    }

    /**
     * Clear the chart
     */
    clearChart() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        if (this.historicalLowInfo) {
            this.historicalLowInfo.innerHTML = '';
        }
    }

    /**
     * Show/hide the chart container
     * @param {boolean} show - Whether to show the chart
     */
    toggleVisibility(show) {
        const chartCard = this.canvas ? this.canvas.closest('.card') : null;
        if (chartCard) {
            if (show) {
                chartCard.classList.remove('hidden');
            } else {
                chartCard.classList.add('hidden');
            }
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrendChartComponent;
}

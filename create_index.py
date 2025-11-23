# -*- coding: utf-8 -*-
import codecs

html_content = '''<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" content="实时查询全球特价机票，比较多平台价格，查看历史价格趋势，找到最便宜的机票">
  <meta name="keywords" content="特价机票,机票比价,实时机票价格,机票搜索,便宜机票">

  <!-- WeChat/Mobile Optimization -->
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- Open Graph for sharing -->
  <meta property="og:title" content="特价机票实时显示系统">
  <meta property="og:description" content="实时查询全球特价机票，比较多平台价格">
  <meta property="og:type" content="website">

  <title>特价机票实时显示系统</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="styles.css">

  <!-- Chart.js for price trends -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>

<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <h1 class="header-title">✈️ 特价机票搜索</h1>
      <p class="header-subtitle">实时比价 · 找到最便宜的机票</p>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content">
    <div class="container">

      <!-- Search Form -->
      <section class="search-section">
        <div class="card card-glass">
          <h2 class="section-title">搜索航班</h2>

          <form id="searchForm" class="search-form">
            <div class="form-row">
              <!-- Origin Input -->
              <div class="input-group autocomplete-wrapper">
                <label for="origin" class="input-label">出发地</label>
                <input type="text" id="origin" class="input" placeholder="输入城市或机场代码，如：北京 或 PEK" autocomplete="off"
                  required>
                <div id="originDropdown" class="autocomplete-dropdown"></div>
              </div>

              <!-- Destination Input -->
              <div class="input-group autocomplete-wrapper">
                <label for="destination" class="input-label">目的地</label>
                <input type="text" id="destination" class="input" placeholder="输入城市或机场代码，如：上海 或 PVG" autocomplete="off"
                  required>
                <div id="destinationDropdown" class="autocomplete-dropdown"></div>
              </div>
            </div>

            <div class="form-row">
              <!-- Date Input -->
              <div class="input-group">
                <label for="date" class="input-label">出发日期</label>
                <input type="date" id="date" class="input" required>
              </div>

              <!-- Search Button -->
              <div class="input-group">
                <label class="input-label">&nbsp;</label>
                <button type="submit" class="btn btn-primary btn-lg" id="searchBtn">
                  <span id="searchBtnText">🔍 搜索航班</span>
                  <span id="searchBtnLoading" class="hidden">
                    <span class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <!-- Results Section -->
      <section id="resultsSection" class="results-section hidden">

        <!-- Lowest Price Highlight -->
        <div id="lowestPriceCard" class="card card-highlight fade-in">
          <div class="lowest-price-content">
            <div class="lowest-price-label">当前最低价</div>
            <div class="lowest-price-amount" id="lowestPriceAmount">¥ ---</div>
            <div class="lowest-price-details" id="lowestPriceDetails"></div>
            <button class="btn btn-primary mt-4" id="bookNowBtn">立即预订</button>
          </div>
        </div>

        <!-- Price Trend Chart -->
        <div class="card mt-6 fade-in">
          <h3 class="section-title">30天价格趋势</h3>
          <div class="chart-container">
            <canvas id="priceChart"></canvas>
          </div>
          <div id="historicalLowPrice" class="historical-low-info mt-4"></div>
        </div>

        <!-- Flight List -->
        <div class="card mt-6 fade-in">
          <div class="flex items-center justify-space-between mb-4">
            <h3 class="section-title mb-0">所有航班</h3>
            <button class="btn btn-secondary btn-sm" id="refreshBtn">
              🔄 刷新
            </button>
          </div>
          <div id="flightList" class="flight-list"></div>
        </div>

      </section>

      <!-- Loading State -->
      <section id="loadingSection" class="loading-section hidden">
        <div class="card">
          <div class="loading-content">
            <div class="spinner"></div>
            <p class="loading-text">正在搜索最优惠的航班...</p>
          </div>
        </div>

        <!-- Skeleton Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <div class="card skeleton-card">
            <div class="skeleton" style="height: 120px;"></div>
          </div>
          <div class="card skeleton-card">
            <div class="skeleton" style="height: 120px;"></div>
          </div>
          <div class="card skeleton-card">
            <div class="skeleton" style="height: 120px;"></div>
          </div>
        </div>
      </section>

      <!-- Error State -->
      <section id="errorSection" class="error-section hidden">
        <div class="card card-error">
          <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h3 class="error-title">搜索出错</h3>
            <p class="error-message" id="errorMessage"></p>
            <button class="btn btn-primary mt-4" id="retryBtn">重试</button>
          </div>
        </div>
      </section>

    </div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p class="footer-text">
        数据来源：多平台实时聚合 · 价格仅供参考，以实际预订为准
      </p>
      <p class="footer-text text-secondary">
        © <span id="copyrightYear"></span> 特价机票搜索系统
      </p>
      <script>
        // Dynamic copyright year
        document.getElementById('copyrightYear').textContent = new Date().getFullYear();
      </script>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="config.js"></script>
  <script src="api/airports.js"></script>
  <script src="api/mock-data.js"></script>
  <script src="components/search-form.js"></script>
  <script src="components/price-card.js"></script>
  <script src="components/trend-chart.js"></script>
  <script src="app.js"></script>
  <script src="components/ai-chat.js"></script>
</body>

</html>'''

# Write with UTF-8 encoding (with BOM for Windows compatibility)
with codecs.open('index.html', 'w', encoding='utf-8-sig') as f:
    f.write(html_content)

print("index.html created with proper UTF-8 encoding")

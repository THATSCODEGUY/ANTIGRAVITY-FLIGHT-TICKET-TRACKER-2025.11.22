// AI Customer Service Chat Component
class AIChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];

        this.knowledgeBase = {
            '如何搜索机票？': '很简单！只需3步：\n1. 在"出发地"输入框输入城市名（如：洛杉矶、纽约）或机场代码（如：LAX、JFK）\n2. 在"目的地"输入框输入中国城市（如：北京、上海）或机场代码（如：PEK、PVG）\n3. 选择出发日期，点击"搜索航班"按钮\n\n系统会立即显示最低价格和所有可选航班！',

            '价格是实时的吗？': '目前显示的是模拟演示数据，用于展示系统功能。\n\n如果您需要真实价格，我们可以接入以下API：\n• Amadeus API（实时价格）\n• Travelpayouts API（历史趋势）\n\n真实API接入后，价格将每15秒自动刷新，确保您看到的是最新价格！',

            '如何预订？': '当前是演示版本，预订功能即将开放！\n\n未来您可以：\n1. 点击航班卡片上的"预订"按钮\n2. 跳转到航空公司官网或OTA平台\n3. 完成支付和预订\n\n我们会为您找到最优惠的价格，但预订需要在第三方平台完成。',

            '支持哪些航线？': '我们专注于北美到中国的航线！\n\n✈️ 出发地包括：\n• 美国：纽约、洛杉矶、旧金山、芝加哥、西雅图等22个城市\n• 加拿大：温哥华、多伦多、蒙特利尔等7个城市\n• 墨西哥：墨西哥城、坎昆等5个城市\n\n🇨🇳 目的地包括：\n• 中国所有主要城市（北京、上海、广州、深圳等23个城市）',

            '价格趋势图怎么看？': '价格趋势图显示过去30天的价格变化：\n\n📊 图表说明：\n• 蓝色曲线：每日最低价格\n• 绿色标记：历史最低价\n• 鼠标悬停：查看具体日期和价格\n\n💡 使用技巧：\n• 如果价格接近历史最低，建议尽快预订\n• 如果价格在高位，可以等待或设置价格提醒',

            '可以设置价格提醒吗？': '价格提醒功能正在开发中！🚀\n\n即将支持：\n• 设置目标价格\n• 价格低于目标时邮件/微信通知\n• 监控多条航线\n• 错价提醒\n\n敬请期待！',

            '数据来源是什么？': '我们的数据来源：\n\n当前（演示版）：\n• 模拟数据，用于展示功能\n\n未来（正式版）：\n• Amadeus API - 全球最大的GDS系统\n• Travelpayouts - 历史价格数据\n• 直连航空公司API\n• OTA平台数据\n\n多源数据确保价格准确性！',

            '有手机App吗？': '暂时没有独立App，但我们的网站是完全响应式的！\n\n📱 移动端体验：\n• 在手机浏览器打开即可使用\n• 完美适配iPhone和Android\n• 支持微信内置浏览器\n• 可以添加到主屏幕\n\n体验和App一样流畅！',
        };

        this.init();
    }

    init() {
        // Create chat widget HTML
        this.createChatWidget();

        // Attach event listeners
        this.attachEventListeners();

        console.log('✅ AI Chat initialized');
    }

    createChatWidget() {
        const widgetHTML = `
      <div id="aiChatWidget" class="ai-chat-widget">
        <button id="aiChatBtn" class="ai-chat-button" aria-label="AI客服">
          <span class="ai-chat-icon">💬</span>
          <span class="ai-chat-text">AI客服</span>
        </button>

        <div id="aiChatBox" class="ai-chat-box hidden">
          <div class="ai-chat-header">
            <div class="ai-chat-header-content">
              <span class="ai-chat-avatar">🤖</span>
              <div>
                <div class="ai-chat-title">AI 智能客服</div>
                <div class="ai-chat-status">在线</div>
              </div>
            </div>
            <button id="aiChatClose" class="ai-chat-close" aria-label="关闭">✕</button>
          </div>
          
          <div id="aiChatMessages" class="ai-chat-messages">
            <div class="ai-message">
              <div class="ai-message-avatar">🤖</div>
              <div class="ai-message-content">
                <div class="ai-message-text">您好！我是AI智能客服，有什么可以帮您的吗？</div>
                <div class="ai-message-time">${this.getCurrentTime()}</div>
              </div>
            </div>
          </div>

          <div class="ai-chat-quick-replies">
            <button class="ai-quick-reply" data-question="如何搜索机票？">如何搜索机票？</button>
            <button class="ai-quick-reply" data-question="价格是实时的吗？">价格是实时的吗？</button>
            <button class="ai-quick-reply" data-question="如何预订？">如何预订？</button>
            <button class="ai-quick-reply" data-question="支持哪些航线？">支持哪些航线？</button>
          </div>

          <div class="ai-chat-input-area">
            <input 
              type="text" 
              id="aiChatInput" 
              class="ai-chat-input" 
              placeholder="输入您的问题..."
              autocomplete="off"
            >
            <button id="aiChatSend" class="ai-chat-send" aria-label="发送">
              ➤
            </button>
          </div>
        </div>
      </div>
    `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEventListeners() {
        // Chat button click
        document.getElementById('aiChatBtn').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close button click
        document.getElementById('aiChatClose').addEventListener('click', () => {
            this.closeChat();
        });

        // Quick reply buttons
        document.querySelectorAll('.ai-quick-reply').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleUserMessage(question);
            });
        });

        // Send button
        document.getElementById('aiChatSend').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('aiChatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatBox = document.getElementById('aiChatBox');

        if (this.isOpen) {
            chatBox.classList.remove('hidden');
        } else {
            chatBox.classList.add('hidden');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('aiChatBox').classList.add('hidden');
    }

    sendMessage() {
        const input = document.getElementById('aiChatInput');
        const message = input.value.trim();

        if (!message) return;

        this.handleUserMessage(message);
        input.value = '';
    }

    handleUserMessage(message) {
        // Add user message
        this.addMessage(message, 'user');

        // Simulate AI thinking
        setTimeout(() => {
            const response = this.getAIResponse(message);
            this.addMessage(response, 'ai');
        }, 500);
    }

    getAIResponse(message) {
        // Check knowledge base for exact match
        if (this.knowledgeBase[message]) {
            return this.knowledgeBase[message];
        }

        // Check for partial matches
        for (const [question, answer] of Object.entries(this.knowledgeBase)) {
            if (message.includes(question.slice(0, -1)) || question.includes(message)) {
                return answer;
            }
        }

        // Keyword-based responses
        if (message.includes('搜索') || message.includes('怎么用')) {
            return this.knowledgeBase['如何搜索机票？'];
        }

        if (message.includes('价格') || message.includes('实时') || message.includes('准确')) {
            return this.knowledgeBase['价格是实时的吗？'];
        }

        if (message.includes('预订') || message.includes('购买') || message.includes('买票')) {
            return this.knowledgeBase['如何预订？'];
        }

        if (message.includes('航线') || message.includes('城市') || message.includes('机场')) {
            return this.knowledgeBase['支持哪些航线？'];
        }

        if (message.includes('趋势') || message.includes('图表') || message.includes('历史')) {
            return this.knowledgeBase['价格趋势图怎么看？'];
        }

        if (message.includes('提醒') || message.includes('通知')) {
            return this.knowledgeBase['可以设置价格提醒吗？'];
        }

        // Default response
        return '抱歉，我还在学习中。您可以尝试问我：\n\n• 如何搜索机票？\n• 价格是实时的吗？\n• 如何预订？\n• 支持哪些航线？\n• 价格趋势图怎么看？\n\n或者直接描述您的问题，我会尽力帮助您！';
    }

    addMessage(text, type) {
        const messagesContainer = document.getElementById('aiChatMessages');
        const messageClass = type === 'user' ? 'user-message' : 'ai-message';
        const avatar = type === 'user' ? '👤' : '🤖';

        const messageHTML = `
      <div class="${messageClass}">
        <div class="${type}-message-avatar">${avatar}</div>
        <div class="${type}-message-content">
          <div class="${type}-message-text">${text.replace(/\n/g, '<br>')}</div>
          <div class="${type}-message-time">${this.getCurrentTime()}</div>
        </div>
      </div>
    `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getCurrentTime() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
}

// Initialize AI Chat when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.aiChat = new AIChat();
    });
} else {
    window.aiChat = new AIChat();
}

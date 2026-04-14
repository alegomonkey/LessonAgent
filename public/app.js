// ── State ────────────────────────────────────────

let sessionId = null;
let isStreaming = false;
let studentName = "";

// ── DOM refs ─────────────────────────────────────

const onboardingScreen = document.getElementById("onboarding");
const chatScreen = document.getElementById("chat");
const onboardingForm = document.getElementById("onboarding-form");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const messagesContainer = document.getElementById("messages");
const welcomeMessage = document.getElementById("welcome-message");
const newSessionBtn = document.getElementById("new-session-btn");
const quickActions = document.getElementById("quick-actions");

// ── Onboarding ───────────────────────────────────

onboardingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(onboardingForm);
  const data = Object.fromEntries(formData.entries());
  studentName = data.name;

  const btn = onboardingForm.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Setting up...";

  try {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create session.");
    }

    const { sessionId: id } = await res.json();
    sessionId = id;

    // Set welcome message
    welcomeMessage.innerHTML = renderMarkdown(
      `Hi ${studentName}! I'm **AssignmentAlly**. I help you build augmented, career-connected versions of your assignments and draft formal proposals you can present to your professor.\n\n` +
      `Here's how we'll work together:\n\n` +
      `1. **Analyze** your assignment to understand what it requires\n` +
      `2. **Align** it with your career goals to find augmentation opportunities\n` +
      `3. **Build** a formal proposal with rubric compliance proof\n\n` +
      `You can use the quick actions below, or just tell me what you'd like to do. ` +
      `Start by sharing your assignment or telling me which one you'd like to work on.`
    );

    // Switch to chat
    onboardingScreen.classList.remove("active");
    chatScreen.classList.add("active");
    chatInput.focus();
  } catch (err) {
    alert(err.message);
    btn.disabled = false;
    btn.textContent = "Get Started";
  }
});

// ── Chat ─────────────────────────────────────────

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize textarea
chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + "px";
});

// Quick action chips
quickActions.addEventListener("click", (e) => {
  const chip = e.target.closest(".action-chip");
  if (!chip || isStreaming) return;
  const prompt = chip.dataset.prompt;
  chatInput.value = prompt;
  sendMessage();
});

// New session
newSessionBtn.addEventListener("click", () => {
  sessionId = null;
  isStreaming = false;
  studentName = "";
  onboardingForm.reset();
  messagesContainer.innerHTML =
    '<div class="message assistant"><div class="message-content" id="welcome-message"></div></div>';
  chatScreen.classList.remove("active");
  onboardingScreen.classList.add("active");
  const btn = onboardingForm.querySelector("button[type=submit]");
  btn.disabled = false;
  btn.textContent = "Get Started";
});

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isStreaming || !sessionId) return;

  // Add user message
  appendMessage("user", text);
  chatInput.value = "";
  chatInput.style.height = "auto";

  // Add typing indicator
  const typingEl = appendTypingIndicator();
  setStreaming(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: text }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Request failed.");
    }

    // Remove typing indicator, start building the response
    typingEl.remove();
    const assistantEl = appendMessage("assistant", "");
    const contentEl = assistantEl.querySelector(".message-content");
    let fullText = "";

    // Read SSE stream
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6);
        if (!jsonStr) continue;

        try {
          const event = JSON.parse(jsonStr);
          if (event.type === "text") {
            fullText += event.content;
            contentEl.innerHTML = renderMarkdown(fullText);
            scrollToBottom();
          } else if (event.type === "error") {
            contentEl.textContent = event.content;
            assistantEl.classList.add("error");
          }
        } catch {
          // ignore malformed SSE lines
        }
      }
    }

    if (!fullText && !contentEl.textContent) {
      contentEl.textContent = "No response received. Please try again.";
    }
  } catch (err) {
    typingEl.remove();
    appendMessage("error", err.message || "Something went wrong. Please try again.");
  }

  setStreaming(false);
  scrollToBottom();
}

// ── DOM helpers ──────────────────────────────────

function appendMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const content = document.createElement("div");
  content.className = "message-content";

  if (role === "assistant" || role === "error") {
    content.innerHTML = text ? renderMarkdown(text) : "";
  } else {
    content.textContent = text;
  }

  wrapper.appendChild(content);
  messagesContainer.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

function appendTypingIndicator() {
  const wrapper = document.createElement("div");
  wrapper.className = "message assistant";

  const content = document.createElement("div");
  content.className = "message-content";
  content.innerHTML =
    '<div class="typing-indicator"><span></span><span></span><span></span></div>';

  wrapper.appendChild(content);
  messagesContainer.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

function setStreaming(val) {
  isStreaming = val;
  sendBtn.disabled = val;
  chatInput.disabled = val;
  quickActions.querySelectorAll(".action-chip").forEach((c) => (c.disabled = val));
  if (!val) chatInput.focus();
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ── Markdown rendering (lightweight, no deps) ────

function renderMarkdown(text) {
  let html = escapeHtml(text);

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr>");

  // Unordered lists
  html = html.replace(/^(\s*)[-*] (.+)$/gm, "$1<li>$2</li>");

  // Ordered lists
  html = html.replace(/^(\s*)\d+\. (.+)$/gm, "$1<li>$2</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_, header, sep, body) => {
      const ths = header
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");
      const rows = body
        .trim()
        .split("\n")
        .map((row) => {
          const tds = row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${tds}</tr>`;
        })
        .join("");
      return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Paragraphs — wrap remaining text blocks
  html = html
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (/^<(h[1-3]|ul|ol|pre|table|hr|li|div)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

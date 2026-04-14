// ── State ────────────────────────────────────────

let sessionId = null;
let isStreaming = false;
let studentName = "";
let pipelineStep = "ready";
let pendingFileText = null;
let pendingFileName = null;

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
const uploadArea = document.getElementById("upload-area");
const uploadDropzone = document.getElementById("upload-dropzone");
const fileUpload = document.getElementById("file-upload");
const btnBrowse = document.getElementById("btn-browse");

// ── Pipeline step helpers ────────────────────────

const STEPS = ["ready", "analyzed", "aligned", "proposed"];

function stepIndex(step) {
  return STEPS.indexOf(step);
}

function updateButtonStates() {
  const analyzeBtn = quickActions.querySelector('[data-step="analyze"]');
  const alignBtn = quickActions.querySelector('[data-step="align"]');
  const buildBtn = quickActions.querySelector('[data-step="build"]');
  const connector1 = document.getElementById("connector-1");
  const connector2 = document.getElementById("connector-2");
  const idx = stepIndex(pipelineStep);

  // Reset all
  [analyzeBtn, alignBtn, buildBtn].forEach((btn) => {
    btn.classList.remove(
      "action-chip--completed",
      "action-chip--current",
      "action-chip--locked"
    );
    btn.disabled = false;
    btn.title = "";
  });
  connector1.classList.remove("step-connector--completed");
  connector2.classList.remove("step-connector--completed");

  // Analyze button
  if (idx >= 1) {
    analyzeBtn.classList.add("action-chip--completed");
    analyzeBtn.querySelector(".step-indicator").textContent = "\u2713";
  } else {
    analyzeBtn.classList.add("action-chip--current");
    analyzeBtn.querySelector(".step-indicator").textContent = "1";
  }

  // Connector 1
  if (idx >= 1) {
    connector1.classList.add("step-connector--completed");
  }

  // Align button
  if (idx >= 2) {
    alignBtn.classList.add("action-chip--completed");
    alignBtn.querySelector(".step-indicator").textContent = "\u2713";
  } else if (idx >= 1) {
    alignBtn.classList.add("action-chip--current");
    alignBtn.querySelector(".step-indicator").textContent = "2";
  } else {
    alignBtn.classList.add("action-chip--locked");
    alignBtn.disabled = true;
    alignBtn.title = "Complete assignment analysis first";
    alignBtn.querySelector(".step-indicator").textContent = "2";
  }

  // Connector 2
  if (idx >= 2) {
    connector2.classList.add("step-connector--completed");
  }

  // Build button
  if (idx >= 3) {
    buildBtn.classList.add("action-chip--completed");
    buildBtn.querySelector(".step-indicator").textContent = "\u2713";
  } else if (idx >= 2) {
    buildBtn.classList.add("action-chip--current");
    buildBtn.querySelector(".step-indicator").textContent = "3";
  } else {
    buildBtn.classList.add("action-chip--locked");
    buildBtn.disabled = true;
    buildBtn.title =
      idx < 1
        ? "Complete analysis and alignment first"
        : "Complete career alignment first";
    buildBtn.querySelector(".step-indicator").textContent = "3";
  }
}

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

    const result = await res.json();
    sessionId = result.sessionId;
    pipelineStep = result.pipelineStep || "ready";

    // Set welcome message
    welcomeMessage.innerHTML = renderMarkdown(
      `Hi ${studentName}! I'm **AssignmentAlly**. I help you build augmented, career-connected versions of your assignments and draft formal proposals you can present to your professor.\n\n` +
        `Here's how we'll work together:\n\n` +
        `1. **Analyze** your assignment to understand what it requires\n` +
        `2. **Align** it with your career goals to find augmentation opportunities\n` +
        `3. **Build** a formal proposal with rubric compliance proof\n\n` +
        `Start by clicking **Analyze Assignment** above to upload your syllabus or assignment, or just describe it in the chat box.`
    );

    // Switch to chat
    onboardingScreen.classList.remove("active");
    chatScreen.classList.add("active");
    updateButtonStates();
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
  if (!chip || isStreaming || chip.disabled) return;

  const step = chip.dataset.step;

  if (step === "analyze") {
    // Toggle upload area visibility
    toggleUploadArea();
    return;
  }

  // For align and build, send prompt directly
  chatInput.value = chip.dataset.prompt;
  sendMessage();
});

// New session
newSessionBtn.addEventListener("click", () => {
  sessionId = null;
  isStreaming = false;
  studentName = "";
  pipelineStep = "ready";
  pendingFileText = null;
  pendingFileName = null;
  hideUploadArea();
  onboardingForm.reset();
  messagesContainer.innerHTML =
    '<div class="message assistant"><div class="message-content" id="welcome-message"></div></div>';
  chatScreen.classList.remove("active");
  onboardingScreen.classList.add("active");
  const btn = onboardingForm.querySelector("button[type=submit]");
  btn.disabled = false;
  btn.textContent = "Get Started";
  updateButtonStates();
});

// ── Upload area ──────────────────────────────────

function toggleUploadArea() {
  if (uploadArea.classList.contains("upload-area--visible")) {
    hideUploadArea();
  } else {
    showUploadArea();
  }
}

function showUploadArea() {
  uploadArea.classList.add("upload-area--visible");
}

function hideUploadArea() {
  uploadArea.classList.remove("upload-area--visible");
}

btnBrowse.addEventListener("click", () => {
  fileUpload.click();
});

fileUpload.addEventListener("change", async () => {
  const file = fileUpload.files[0];
  if (!file) return;

  // Show uploading state
  const originalTitle = uploadDropzone.querySelector(".upload-title");
  const originalText = originalTitle.textContent;
  originalTitle.textContent = `Uploading ${file.name}...`;
  btnBrowse.disabled = true;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Upload failed.");
    }

    // Store file text and send the analyze prompt
    pendingFileText = result.text;
    pendingFileName = result.fileName;
    hideUploadArea();

    const analyzeBtn = quickActions.querySelector('[data-step="analyze"]');
    chatInput.value = analyzeBtn.dataset.prompt;
    sendMessage();
  } catch (err) {
    alert(err.message);
    originalTitle.textContent = originalText;
  }

  btnBrowse.disabled = false;
  fileUpload.value = "";
});

// Drag and drop
uploadDropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadDropzone.classList.add("drag-over");
});

uploadDropzone.addEventListener("dragleave", () => {
  uploadDropzone.classList.remove("drag-over");
});

uploadDropzone.addEventListener("drop", async (e) => {
  e.preventDefault();
  uploadDropzone.classList.remove("drag-over");

  const file = e.dataTransfer.files[0];
  if (!file) return;

  const ext = file.name.split(".").pop().toLowerCase();
  if (!["pdf", "txt", "md"].includes(ext)) {
    alert(
      `Unsupported file type ".${ext}". Please use PDF, TXT, or MD files.`
    );
    return;
  }

  // Upload the dropped file
  const originalTitle = uploadDropzone.querySelector(".upload-title");
  const originalText = originalTitle.textContent;
  originalTitle.textContent = `Uploading ${file.name}...`;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Upload failed.");
    }

    pendingFileText = result.text;
    pendingFileName = result.fileName;
    hideUploadArea();

    const analyzeBtn = quickActions.querySelector('[data-step="analyze"]');
    chatInput.value = analyzeBtn.dataset.prompt;
    sendMessage();
  } catch (err) {
    alert(err.message);
    originalTitle.textContent = originalText;
  }
});

// ── Send message ─────────────────────────────────

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isStreaming || !sessionId) return;

  // Capture and clear pending file info
  const fileText = pendingFileText;
  const fileName = pendingFileName;
  pendingFileText = null;
  pendingFileName = null;

  // Add user message — include file name if uploaded
  const displayText = fileName ? `[Uploaded: ${fileName}]\n${text}` : text;
  appendMessage("user", displayText);
  chatInput.value = "";
  chatInput.style.height = "auto";

  // Add typing indicator
  const typingEl = appendTypingIndicator();
  setStreaming(true);

  try {
    const body = { sessionId, message: text };
    if (fileText) {
      body.fileText = fileText;
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
          } else if (event.type === "done") {
            // Update pipeline state from server
            if (event.pipelineStep) {
              pipelineStep = event.pipelineStep;
              updateButtonStates();
            }
            hideUploadArea();
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
    appendMessage(
      "error",
      err.message || "Something went wrong. Please try again."
    );
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

  // During streaming, disable all chips. On finish, restore pipeline-aware states.
  if (val) {
    quickActions
      .querySelectorAll(".action-chip")
      .forEach((c) => (c.disabled = true));
  } else {
    updateButtonStates();
  }

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

/**
 * 服务端 Markdown 渲染（仅在 Node 侧使用，不进客户端 bundle）
 * marked 负责 Markdown -> HTML，highlight.js 负责代码高亮，xss 负责最后的安全过滤。
 *
 * 目的：把文章正文在 SSR 阶段就渲染成 HTML，
 * 让搜索引擎和首屏都能直接拿到内容（原实现完全依赖客户端 mavon-editor 渲染）。
 */
const { marked, Renderer } = require("marked");
const hljs = require("highlight.js");
const xss = require("xss");

const HLJS_MAJOR = parseInt(String(hljs.versionString || "9").split(".")[0], 10);

function highlight(code, lang) {
  try {
    if (lang && hljs.getLanguage(lang)) {
      return HLJS_MAJOR >= 10
        ? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
        : hljs.highlight(lang, code, true).value;
    }
    return hljs.highlightAuto(code).value;
  } catch (e) {
    return null;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const renderer = new Renderer();

// 文章标题本身已经是页面里的 <h1>，
// 正文里的 # 再输出 h1 会出现多个 h1，对 SEO 不友好。整体降一级。
renderer.heading = function(text, level) {
  const lv = Math.min(level + 1, 6);
  return "<h" + lv + ">" + text + "</h" + lv + ">\n";
};

renderer.code = function(code, infostring) {
  const lang = String(infostring || "").trim().split(/\s+/)[0].toLowerCase();
  const body = highlight(code, lang);
  return (
    '<pre class="hljs"><code class="language-' +
    escapeHtml(lang || "plaintext") +
    '">' +
    (body == null ? escapeHtml(code) : body) +
    "</code></pre>"
  );
};

renderer.link = function(href, title, text) {
  const h = href || "";
  const external = /^https?:\/\//i.test(h);
  return (
    '<a href="' +
    h +
    '"' +
    (title ? ' title="' + title + '"' : "") +
    (external ? ' target="_blank" rel="noopener nofollow"' : "") +
    ">" +
    text +
    "</a>"
  );
};

renderer.image = function(href, title, text) {
  return (
    '<img src="' +
    (href || "") +
    '" alt="' +
    escapeHtml(text || "") +
    '"' +
    (title ? ' title="' + title + '"' : "") +
    ' loading="lazy" />'
  );
};

marked.use({ renderer: renderer, mangle: false, headerIds: false });

const XSS_OPTIONS = {
  whiteList: Object.assign({}, xss.whiteList, {
    img: ["src", "alt", "title", "width", "height", "loading"],
    pre: ["class"],
    code: ["class"],
    span: ["class"],
    h1: ["id"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"]
  }),
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"]
};

/**
 * @param {string} markdown 原始 Markdown 文本
 * @returns {string} 安全的 HTML 字符串
 */
function renderMarkdown(markdown) {
  if (!markdown) return "";
  try {
    return xss(marked(String(markdown)), XSS_OPTIONS);
  } catch (e) {
    return "";
  }
}

/**
 * 从 Markdown 中提取纯文本，用于生成 meta description
 * @param {string} markdown
 * @param {number} len 目标长度
 */
function extractText(markdown, len) {
  if (!markdown) return "";
  const s = String(markdown)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, " ")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/[#*`_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= len) return s;
  return s.slice(0, len) + "…";
}

module.exports = { renderMarkdown: renderMarkdown, extractText: extractText };

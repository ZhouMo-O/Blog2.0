/**
 * /article-html/:id
 * 一次请求同时返回文章数据与「服务端渲染好的正文 HTML」。
 *
 * 为什么单独做一个中间件而不是直接在页面 asyncData 里渲染：
 * marked / highlight.js 体积不小，放在页面里会被打进客户端 bundle；
 * 放在中间件里则只存在于服务端，客户端通过同源请求复用同一份结果。
 */
const axios = require("axios");
const { renderMarkdown, extractText } = require("./markdown");

const API = process.env.API_BASE_URL_SERVER || "http://127.0.0.1:5555/api";
const TIMEOUT = 6000;

function send(res, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.end(JSON.stringify(payload));
}

module.exports = async function articleHtml(req, res, next) {
  const match = (req.url || "").match(/^\/article-html\/([A-Za-z0-9_-]+)/);
  if (!match) return next();

  const id = match[1];
  try {
    const r = await axios.get(API + "/rest/article/" + id, { timeout: TIMEOUT });
    const full = r.data || {};
    const article = Object.assign({}, full);
    delete article.markdown;

    // Intro 太短（例如只有「js技术栈」）时，用正文摘要兜底，保证 meta description 有实际信息量
    const intro = String(full.Intro || "").trim();
    if (intro.length < 30) {
      article.Intro = extractText(full.markdown, 150);
    }

    send(res, {
      ok: true,
      article: article,
      html: renderMarkdown(full.markdown || "")
    });
  } catch (e) {
    send(res, { ok: false, article: null, html: "" });
  }
};

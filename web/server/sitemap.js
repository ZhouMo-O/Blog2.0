/**
 * 动态生成 robots.txt 与 sitemap.xml
 * 通过 nuxt serverMiddleware 挂载，不依赖额外的第三方模块。
 */
const axios = require("axios");

const SITE = process.env.SITE_URL || "https://blog5.net.cn";
const API = process.env.API_BASE_URL_SERVER || "http://127.0.0.1:5555/api";
const TIMEOUT = 6000;

function xmlEscape(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 把 2024/09/04 或 ISO 时间统一成 YYYY-MM-DD
function toDate(v) {
  if (!v) return "";
  const m = String(v).match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (!m) return "";
  return m[1] + "-" + ("0" + m[2]).slice(-2) + "-" + ("0" + m[3]).slice(-2);
}

module.exports = async function sitemap(req, res, next) {
  const path = (req.url || "").split("?")[0];

  if (path === "/robots.txt") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end(
      "User-agent: *\n" +
        "Allow: /\n" +
        "Disallow: /api/\n\n" +
        "Sitemap: " + SITE + "/sitemap.xml\n"
    );
    return;
  }

  if (path !== "/sitemap.xml") return next();

  const urls = [
    { loc: SITE + "/", changefreq: "daily", priority: "1.0" },
    { loc: SITE + "/blogroll/blogroll", changefreq: "weekly", priority: "0.5" },
    { loc: SITE + "/about/about", changefreq: "monthly", priority: "0.4" }
  ];

  try {
    const articles = await axios.get(API + "/rest/article", {
      params: { privacy: false },
      timeout: TIMEOUT
    });
    (articles.data || []).forEach(function(a) {
      urls.push({
        loc: SITE + "/article/" + a._id,
        lastmod: toDate(a.upDateTime || a.createTime),
        changefreq: "weekly",
        priority: "0.8"
      });
    });
  } catch (e) {
    // 接口不可用时仍输出静态页，保证 sitemap 始终可访问
  }

  try {
    const tags = await axios.get(API + "/rest/tag", { timeout: TIMEOUT });
    (tags.data || []).forEach(function(t) {
      if (!t || !t._id) return;
      urls.push({
        loc: SITE + "/tagCloud/" + t._id,
        changefreq: "weekly",
        priority: "0.4"
      });
    });
  } catch (e) {}

  const body = urls
    .map(function(u) {
      return (
        "  <url><loc>" +
        xmlEscape(u.loc) +
        "</loc>" +
        (u.lastmod ? "<lastmod>" + u.lastmod + "</lastmod>" : "") +
        (u.changefreq ? "<changefreq>" + u.changefreq + "</changefreq>" : "") +
        "<priority>" + (u.priority || "0.5") + "</priority></url>"
      );
    })
    .join("\n");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    "\n</urlset>\n";

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(xml);
};

/**
 * 统一的页面 head 生成器：标题 / 描述 / canonical / Open Graph / Twitter Card / JSON-LD
 * 修复原项目所有页面共用同一个 title+description、且完全缺失这些标签的问题。
 */
export const SITE_URL = "https://blog5.net.cn";
export const SITE_NAME = "Starry-周末的个人博客";
export const DEFAULT_DESC =
  "Starry-周末的个人博客，记录前端开发、后端开发、服务端渲染与全栈工程实践。";
export const DEFAULT_IMAGE =
  "https://xiaowublog1.oss-cn-shanghai.aliyuncs.com/starry.jpg";

function clip(str, len) {
  if (!str) return "";
  let s = String(str)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= len) return s;
  return s.slice(0, len) + "…";
}

function pad(n) {
  return ("0" + n).slice(-2);
}

/**
 * 把站内各种时间格式（2024/9/3 下午11:15:58、9/3/2020, 11:15:53 PM 等）
 * 统一转成 schema.org 友好的 YYYY-MM-DD。
 */
export function toDateString(v) {
  if (!v) return undefined;
  const m = String(v).match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (m) return m[1] + "-" + pad(m[2]) + "-" + pad(m[3]);
  const d = new Date(v);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return undefined;
}

export function pageHead(options) {
  const o = options || {};
  const title = o.title || SITE_NAME;
  const description = clip(o.description, 150) || DEFAULT_DESC;
  const url = SITE_URL + (o.path || "/");
  const image = o.image || DEFAULT_IMAGE;

  const meta = [
    { hid: "description", name: "description", content: description },
    { hid: "og:type", property: "og:type", content: o.type || "website" },
    { hid: "og:title", property: "og:title", content: title },
    { hid: "og:description", property: "og:description", content: description },
    { hid: "og:url", property: "og:url", content: url },
    { hid: "og:image", property: "og:image", content: image },
    { hid: "og:site_name", property: "og:site_name", content: SITE_NAME },
    { hid: "og:locale", property: "og:locale", content: "zh_CN" },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image"
    },
    { hid: "twitter:title", name: "twitter:title", content: title },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: description
    },
    { hid: "twitter:image", name: "twitter:image", content: image }
  ];

  if (o.publishedTime) {
    meta.push({
      hid: "article:published_time",
      property: "article:published_time",
      content: o.publishedTime
    });
  }
  if (o.modifiedTime) {
    meta.push({
      hid: "article:modified_time",
      property: "article:modified_time",
      content: o.modifiedTime
    });
  }

  const script = [];
  if (o.jsonld) {
    script.push({
      hid: "ld-json",
      type: "application/ld+json",
      json: o.jsonld
    });
  }

  return {
    title,
    meta,
    link: [{ hid: "canonical", rel: "canonical", href: url }],
    script
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL + "/",
    description: DEFAULT_DESC
  };
}

export function articleJsonLd(article) {
  const a = article || {};
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title || "",
    description: clip(a.Intro, 150),
    image: a.cover ? [a.cover] : [DEFAULT_IMAGE],
    datePublished: a.createTime || undefined,
    dateModified: a.upDateTime || a.createTime || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL + "/article/" + (a._id || "")
    },
    author: { "@type": "Person", name: "Starry-周末" },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: SITE_URL + "/starry.ico" }
    }
  };
}

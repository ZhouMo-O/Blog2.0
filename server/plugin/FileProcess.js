module.exports = (app, auth) => {
  const multer = require("multer");
  const MAO = require("multer-aliyun-oss");
  const OSS = require("ali-oss");
  const path = require("path");
  const crypto = require("crypto");

  const conf = {
    region: process.env.region,
    accessKeyId: process.env.accessKeyId,
    accessKeySecret: process.env.accessKeySecret,
    bucket: process.env.bucket,
    secure: true,
  };

  // ============================================================
  // 上传限制
  // ------------------------------------------------------------
  // 原先既没有大小上限也没有类型校验，任何人都可以往 OSS 传任意文件：
  //   - 超大文件白占存储与带宽；
  //   - 传 .html/.svg 后经 OSS 域名访问，可被当作钓鱼/挂马载体；
  //   - 默认按原文件名存储，同名会互相覆盖。
  // 这里限定为「图片 + 5MB + 随机文件名」。
  // ============================================================
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".ico"];
  const ALLOWED_MIME = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/x-icon",
    "image/vnd.microsoft.icon",
  ];

  const upload = multer({
    storage: MAO({
      config: conf,
      //随机文件名，避免同名覆盖；保留原扩展名
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || "").toLowerCase();
        cb(null, Date.now() + "-" + crypto.randomBytes(8).toString("hex") + ext);
      },
    }),
    limits: { fileSize: MAX_SIZE, files: 1 },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase();
      const mime = String(file.mimetype || "").toLowerCase();
      if (ALLOWED_EXT.includes(ext) && ALLOWED_MIME.includes(mime)) {
        return cb(null, true);
      }
      cb(new Error("仅允许上传图片文件（jpg/png/gif/webp/bmp/ico）"));
    },
  });

  //图片上传
  app.post("/api/upload", auth, (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        //把 multer 的错误转成人话，交给统一错误处理返回 JSON
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({ message: "图片不能超过 5MB" });
        }
        return res.status(400).send({ message: err.message || "上传失败" });
      }
      if (!req.file) {
        return res.status(400).send({ message: "没有接收到文件" });
      }
      res.send(req.file);
    });
  });

  //图片删除：原实现前端 imgDel 只有一句 console.log(pos)，
  //编辑器里删掉图片后 OSS 上仍留着文件，长期会堆积垃圾并产生存储费用。
  //这里按 objectName 删除，只允许删除 oss 上的文件（含越权校验：禁止 ../ 之类路径穿越）。
  app.delete("/api/deleteFile/:objectName", auth, async (req, res) => {
    const objectName = decodeURIComponent(req.params.objectName || "");
    if (!objectName || objectName.includes("..") || objectName.startsWith("/")) {
      return res.status(400).send({ message: "非法的文件名" });
    }
    try {
      const client = new OSS(conf);
      await client.delete(objectName);
      console.log(`已删除 OSS 文件: ${objectName}`);
      res.send({ message: "删除成功", objectName });
    } catch (error) {
      //文件本来就已不存在时，阿里云会报 NoSuchKey，对前端来说视作删除成功即可
      const code = error && error.code;
      if (code === "NoSuchKey") {
        return res.send({ message: "文件不存在或已删除", objectName });
      }
      console.log("删除 OSS 文件失败", error);
      res.status(500).send({ message: "删除文件失败" });
    }
  });
};

module.exports = (app, auth) => {
  const multer = require("multer");
  const MAO = require("multer-aliyun-oss");
  const OSS = require("ali-oss");

  const conf = {
    region: process.env.region,
    accessKeyId: process.env.accessKeyId,
    accessKeySecret: process.env.accessKeySecret,
    bucket: process.env.bucket,
    secure: true,
  };

  const upload = multer({
    storage: MAO({ config: conf }),
  });

  //图片上传
  app.post("/api/upload", auth, upload.single("file"), async (req, res) => {
    const file = req.file;
    res.send(file);
  });

  //图片删除：原实现前端 imgDel 只有一句 console.log(pos)，
  //编辑器里删掉图片后 OSS 上仍留着文件，长期会堆积垃圾并产生存储费用。
  //这里按 objectName 删除，只允许删除 oss 上的文件（含越权校验：禁止 ../ 之类路径穿越）。
  app.delete("/api/deleteFile/:objectName", auth, async (req, res) => {
    const objectName = decodeURIComponent(req.params.objectName || "");
    if (!objectName || objectName.includes("..") || objectName.startsWith("/")) {
      return res.status(400).send({ msg: "非法的文件名" });
    }
    try {
      const client = new OSS(conf);
      await client.delete(objectName);
      console.log(`已删除 OSS 文件: ${objectName}`);
      res.send({ msg: "删除成功", objectName });
    } catch (error) {
      //文件本来就已不存在时，阿里云会报 NoSuchKey，对前端来说视作删除成功即可
      const code = error && error.code;
      if (code === "NoSuchKey") {
        return res.send({ msg: "文件不存在或已删除", objectName });
      }
      console.log("删除 OSS 文件失败", error);
      res.status(500).send({ msg: "删除文件失败" });
    }
  });
};

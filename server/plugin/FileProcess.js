module.exports = (app) => {
  const multer = require("multer");
  const MAO = require("multer-aliyun-oss");

  const upload = multer({
    storage: MAO({
      config: {
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        accessKeySecret: process.env.accessKeySecret,
        bucket: process.env.bucket,
      },
    }),
  });

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    res.send(file);
  });
};

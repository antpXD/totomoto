const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");

const BUCKET_NAME = "totomoto";
const IAM_USER_KEY = "AKIAQWODMQJ3R7BTQANM";
const IAM_USER_SECRET = "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";

// const singleUpload = upload.single("image");

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

router.post("/", async (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("finish", function () {
    console.log("Upload finished");

    const file = req.files.image;
    console.log(file);
    uploadToS3(file);

    res.json({ fileUrl: `https://totomoto.s3.amazonaws.com/${file.name}` });
  });
  req.pipe(busboy);
});

module.exports = router;

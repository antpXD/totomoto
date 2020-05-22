const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const Busboy = require("busboy");
require("dotenv").config();

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: process.env.BUCKET_NAME,
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

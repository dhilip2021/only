const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const accessKeyId = "AKIA6G5QAT7OZJS2ERHD";
const secretAccessKey = "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";
// AKIA6G5QAT7OVXPXR55O
// wR1rRtFafnm00Wbjanh6x2LqcOqgVQAetRSLC+wz

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

exports.upload = multer({ storage });

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "extraimagstorage",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({ message: "Super Admin access denied" });
  }
  next();
};

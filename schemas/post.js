const mongoose = require("mongoose");
// ==============================================================
// ==                     스키마 옵션 유형                       ==
// ==============================================================

// type: String or Number   >>> 키값은 숫자 아니면 문자열
// unique : ture   >>> 유일함
// required :true   >>> 필수

// ==============================================================
const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);

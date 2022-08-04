"use strict";
const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middlewares/signup_validation");
const SECRET_KEY = "Taesik";

// ==============================================================
// ==                        회원가입 API                       ==
// ==============================================================

// 메인홈페이지 참고 시 존재 하지않는 API로 확인
router.get("/", (req, res) => {
  res.send("Main Page");
});

// 회원가입
router.post("/signup", userMiddleware, async (req, res) => {
  if (req.headers.authorization !== undefined)
    return res.send("이미 로그인이 되어있습니다.");

  const { confirm, password, nickname } = req.body;
  const existUser = await User.findOne({ where: { nickname } });
  if (existUser) {
    res.status(400).json({ message: "아이디가 중복됩니다." });
  } else {
    await User.create({ password, nickname });
    res.json({ message: "회원 가입에 성공하였습니다." });
  }
});
// 로그인
router.post("/login", async (req, res) => {
  if (req.headers.authorization !== undefined)
    return res.send("이미 로그인이 되어있습니다.");

  const { nickname, password } = req.body;
  const existUser = await User.findOne({ where: { nickname, password } });
  if (existUser) {
    const token = jwt.sign(
      {
        // 만료시간 1시간
        // exp: Math.floor(Date.now() / 1000) + 60 * 60,
        nickname,
      },
      SECRET_KEY
    );
    res.status(200).json({ token });
  } else
    res.status(400).json({ message: "아이디 또는 비밀번호를 확인해주세요." });
});

module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const { Like } = require("../models");

const aushMiddleware = require("../middlewares/authorization");

// ==============================================================
// ==                     게시글Start                          ==
// ==============================================================

// 게시글 조회
router.get("/", async (req, res) => {
  const data = await Post.findAll({});
  // 작성날짜 기준으로 내림차순 정리
  data.reverse();
  res.json({ data });
});

// 좋아요 조회
router.get("/like", aushMiddleware, async (req, res) => {
  const userId = res.locals.userId;
  let likes = await Post.findAll({ whrer: { userId } });
  likes = likes.filter((a) => a.dataValues.likes !== 0);
  likes = likes.sort((a, b) => {
    a = a.dataValues.likes;
    b = b.dataValues.likes;
    return b - a;
  });
  res.json({ likes });
});

// 게시글 조회 (유저 게시글)
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const data = await Post.findByPk(postId);
  res.json({ data });
});

router.use(aushMiddleware);

//  좋아요
router.put("/:postId/like", async (req, res) => {
  let message = "";
  const { userId } = res.locals;
  const { postId } = req.params;
  const cntLikes = await Post.findOne({ where: { postId } });
  const dbData = await Like.findOne({ where: { userId, postId } });
  if (dbData === null) {
    const upLike = ++cntLikes.dataValues.likes;
    await Like.create({ userId, postId });
    await Post.update({ likes: upLike }, { where: { userId, postId } });
    message = "좋아요가 눌렸습니다.";
  } else {
    const downLike = --cntLikes.dataValues.likes;
    await Like.destroy({ where: { userId, userId } });
    await Post.update({ likes: downLike }, { where: { userId, postId } });
    message = "좋아요를 취소했습니다.";
  }
  res.json({ message });
});

// 게시글 작성
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const craetepost = await Post.create({
    title,
    content,
    userId: res.locals.userId,
    nickname: res.locals.nickname,
    likes: 0,
  });
  res.json({ message: "게시글이 작성 되었습니다." });
});

// 게시글 수정
router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const existsPost = await Post.findByPk(postId);
  console.log(existsPost);
  if (existsPost === null) return res.send("없는 게시글 입니다.");
  if (existsPost) {
    await Post.update({ content, title }, { where: { postId } });
    res.send("게시글이 수정되었습니다.");
  }
});
// 게시글 삭제
router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const existsPost = await Post.findByPk(postId);
  if (existsPost === null) return res.send("없는 게시글 입니다.");
  if (existsPost) {
    await Post.destroy({ where: { postId } });
    return res.json({ result: "게시글을 삭제 하였습니다." });
  }
});

module.exports = router;

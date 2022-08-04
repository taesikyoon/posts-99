"use strict";
const express = require("express");
const router = express.Router();
const { Comment } = require("../models");

const aushMiddleware = require("../middlewares/authorization");

// ==============================================================
// ==                    댓글   Start                          ==
// ==============================================================

// 댓글 목록 조회
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const data = await Comment.findAll({
    where: { postId },
  });

  res.json({ data });
});

router.use(aushMiddleware);
// 댓글 생성
router.post("/:postId", async (req, res) => {
  const { comment } = req.body;
  let postId = req.params.postId;
  postId = Number(postId);

  const craetecomment = await Comment.create({
    comment,
    postId: postId,
    userId: res.locals.userId,
    nickname: res.locals.nickname,
  });
  res.json({ message: "댓글 생성했습니다.." });
});

// 댓글 수정
router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  const existsComments = await Comment.findAll({
    where: { commentId },
  });
  if (existsComments === null) return res.send("없는 댓글은 수정이 안됨.");
  if (existsComments) {
    await Comment.update({ comment }, { where: { commentId } });
    res.send("댓글이 수정되었습니다.");
  }
});

// 댓글 삭제
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;
  const existsComments = await Comment.findByPk(commentId);
  if (existsComments === null) return res.send("없는 댓글입니다.");
  if (existsComments) {
    await Comment.destroy({ where: { commentId } });
    return res.json({ result: "댓글이 삭제 되었습니다." });
  }
});

module.exports = router;

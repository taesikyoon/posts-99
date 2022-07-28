const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");

// ==============================================================
// ==                     게시글Start                          ==
// ==============================================================

// 게시글 조회
router.get("/", async (req, res) => {
  const data = await Post.find({}, { __v: 0, password: 0 });
  // 작성날짜 기준으로 내림차순 정리
  res.json({ data });
});
// 게시글 작성
router.post("/", async (req, res) => {
  const { title, content, username, password } = req.body;
  const today = new Date();

  const craetepost = await Post.create({
    title,
    content,
    username,
    date: today.toLocaleString(),
    password,
  });
  res.send(craetepost);
});
// 게시글 조회 (모르겠다 __ID)
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const data = await Post.findById(_id, { password: 0, __v: 0 });
  res.json({ data });
});
// 게시글 수정
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { title, content, password } = req.body;
  const existsPost = await Post.findById(_id, { __v: 0 });
  if (existsPost === null) return res.send("없는 게시글 입니다.");
  if (existsPost.length || password === existsPost.password) {
    await Post.updateOne({ _id }, { title });
    await Post.updateOne({ _id }, { content });
    res.send("게시글이 수정되었습니다.");
  } else return res.send("비밀번호가 틀렸습니다.");
  // 그러면 포스트로 사용해서 하는것이랑 무엇이 다르며
  //  PUT은 무엇인가
});
// 게시글 삭제
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const existsPost = await Post.findById(_id);
  if (existsPost === null) return res.send("없는 게시글 입니다.");
  if (existsPost.length || password === existsPost.password) {
    await Post.deleteOne({ _id });
    return res.json({ result: "success" });
  } else return res.send("비밀번호가 틀립니다.");
});

module.exports = router;

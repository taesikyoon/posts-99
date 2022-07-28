const express = require("express");
const router = express.Router();
// const Post = require("./schemas/post");
const Comment = require("../schemas/comment");
// ==============================================================
// ==                    댓글   Start                          ==
// ==============================================================

// 댓글 목록 조회
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  const data = await Comment.find(postId.postId, { __v: 0, postId: 0 });

  res.json({ data });
});

// 댓글 생성
router.post("/comments/:_id", async (req, res) => {
  const { user, password, comment } = req.body;
  const { _id } = req.params;
  const today = new Date();
  const craetecomment = await Comment.create({
    user,
    password,
    comment,
    date: today.toLocaleString(),
    postId: _id,
  });
  res.send(craetecomment);
});

// 댓글 수정
router.put("/comments/:_id", async (req, res) => {
  const { _id } = req.params;
  const { comment, password } = req.body;
  const existsComments = await Comment.findById(_id);
  if (existsComments === null) return res.send("없는 댓글입니다.");
  if (existsComments.length || password === existsComments.password) {
    await Comment.updateOne({ _id }, { comment });
    res.send("댓글이 수정되었습니다.");
  } else return res.send("비밀번호가 틀립니다.");
  // 그러면 포스트로 사용해서 하는것이랑 무엇이 다르며
  //  PUT은 무엇인가
});

// 댓글 삭제
router.delete("/comments/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const existsComments = await Comment.findById(_id);
  if (existsComments === null) return res.send("없는 댓글입니다.");
  if (existsComments.length || password === existsComments.password) {
    await Comment.deleteOne({ _id });
    return res.json({ result: "success" });
  } else return res.send("비밀번호가 틀립니다. 정신차려주세요");
});

module.exports = router;

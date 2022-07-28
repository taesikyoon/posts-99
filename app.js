// Goal :  Node.js와 express로 로그인 기능이 없는 나만의 항해 블로그 벡엔드 서버 만들기

const express = require("express");
const connect = require("./schemas");
const app = express();
const PORT = 3000;

connect();

const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts");
// 시간 체크
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};
// ==============================================================
// ==                        미들웨어                           ==
// ==============================================================
app.use(express.json());
app.use(requestMiddleware);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// 메인홈페이지 참고 시 존재 하지않는 API로 확인
app.get("/", (req, res) => {
  res.send("Main Page");
});

app.listen(PORT, () => {
  console.log("서버 오픈");
});
//

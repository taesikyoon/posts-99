// Goal :  Node.js와 express로 로그인 기능이 없는 나만의 항해 블로그 벡엔드 서버 만들기

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/index");

// 시간 체크
const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

// ==============================================================
// ==                        미들웨어                           ==
// ==============================================================
app.use(cors());
app.use(express.json());
app.use(requestMiddleware);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);

app.listen(PORT, () => {
  console.log("서버 오픈");
});

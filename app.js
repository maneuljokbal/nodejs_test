const express = require('express');
const connect = require("./schemas");
const cors = require("cors"); //app.use(cors()); 쓸라면 집어넣기
const app = express();
const port = 3000;

connect();

const commentsrouter = require("./routes/comments");
const postsrouter = require("./routes/posts");

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

//const corsOption = {
//  origin: "https://www.test-cors.org",  특정 도메인 주소 설정
//  credentials: true,
//};

app.use(express.json());

app.use("/", [postsrouter,commentsrouter]);

app.use(cors()); //cors(corsOption) 넣으면 특정 도메인 주소만 통과

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/cors-test", (req, res) => {
  res.send('hi');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
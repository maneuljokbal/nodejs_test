// app.js
const { request } = require('express');
const express = require('express');
//const Posts=require('../schemas/posts');
const Comments = require('../schemas/comments');
const router = express.Router();

// routes/goods.js
//댓글 전체 조회
router.get("/comments/:_id", async (req, res) => {	
	const data = await Comments.find({},{password:0,__v:0});
	res.json({ data });
	//_id 라고 나오는 key값 못바꾸나... 씌부레...
});

//댓글 작성
//content 내용없으면 없다고 메시지 출력
router.post("/comments/:_id", async (req, res) => {
	const { user,password,content } = req.body;
	if(!Boolean(content)){
		res.status(400).json({"message": "content가 존재하지 않습니다!"})
	}
	const createdcomments = await Comments.create({ user,password,content });
	res.json({ comments: createdcomments });
});

//댓글 수정
//content 내용없으면 없다고 메시지 출력
router.put("/comments/:_id", async (req, res) => {
	const {_id} = req.params
	const { user,content } = req.body;
	if(!Boolean(content)){
		res.status(400).json({"message": "content가 존재하지 않습니다!"})
	}
	await Comments.updateOne({ _id: _id }, { $set: { user } });
	await Comments.updateOne({ _id: _id }, { $set: { content } });
	res.json({  "message": "게시글을 수정하였습니다."});
	//한꺼번에 수정시키는 거는 없나... 매니저님께 물어봐야겠당
})

//댓글 삭제
router.delete("/comments/:_id", async (req, res) => {
	const { _id } = req.params;
	const { password } = req.body;
	const PostsPW = await Comments.find({ _id }).password;
	if (PostsPW===password) {
	  await Comments.deleteOne({ _id });
	}
    if(!Boolean(PostsPW)){
		res.status(400).json({"message": "글이 존재하지 않습니다!"})
	}
	res.json({  "message": "게시글을 삭제하였습니다."})
})


module.exports = router;
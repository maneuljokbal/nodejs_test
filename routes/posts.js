// app.js
const { request } = require('express');
const express = require('express');
const Posts=require('../schemas/posts');
//const Comments = require('../schemas/comments');
const router = express.Router();

// routes/goods.js
//게시글 전체 조회
router.get("/posts", async (req, res) => {	
	const data = await Posts.find({},{password:0,__v:0,content:0});
	res.json({ data });
	//_id 라고 나오는 key값 못바꾸나... 씌부레...
});

//게시글 생성
router.post("/posts", async (req, res) => {
	const { user,password,title,content } = req.body;
	const createdposts = await Posts.create({ user,password,title,content });
	res.json({ posts: createdposts });
});

//게시글 조회
router.get("/posts/:_id", async (req, res) => {
	//파라미터값을 매칭시키자 data의 _id 값으로
	const {_id} = req.params
	const { user,password,title,content } = req.body;
	const data = await Posts.find({_id},{password:0,__v:0});
	res.json({data});
})

//게시글 수정
router.put("/posts/:_id", async (req, res) => {
	const {_id} = req.params
	const { user,title,content } = req.body;
	await Posts.updateOne({ _id: _id }, { $set: { user } });
	await Posts.updateOne({ _id: _id }, { $set: { title } });
	await Posts.updateOne({ _id: _id }, { $set: { content } });
	res.json({  "message": "게시글을 수정하였습니다."});
	//한꺼번에 수정시키는 거는 없나... 매니저님께 물어봐야겠당
})

//게시글 삭제
router.delete("/posts/:_id", async (req, res) => {
	const { _id } = req.params;
	const { password } = req.body;
	const PostsPW = await Posts.find({ _id }).password;
	if(PostsPW===password) {
	  await Posts.deleteOne({ _id });
	}
	if(!Boolean(PostsPW)){
		res.status(400).json({"message": "글이 존재하지 않습니다!"})
	}
	res.json({  "message": "게시글을 삭제하였습니다."})
})


module.exports = router;

const express = require("express")
const router = express.Router()
const { Posts, Likes } = require("../models")

const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]})
    const likedPosts = await Likes.findAll({UserId: req.body.id})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts})
})


router.post("/", async (req,res) => {
    const post = req.body
    await Posts.create(post);
    res.json(post)

})

router.get("/byId/:id", async (req, res) =>{
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.put("/title", async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

router.put("/postText", async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
});



router.delete("/:postId",validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
});




module.exports = router

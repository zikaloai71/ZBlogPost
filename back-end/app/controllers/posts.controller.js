const postModel = require("../database/models/post.model");
const userModel = require('../database/models/user.model')
class Post {
  static allPosts = async (req, res) => {
    try {
      const posts = await postModel.find().sort({createdAt:-1});

      res.status(200).send({
        apiStatus: true,
        data: posts,
        message: "all posts fetched",
      });
      
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
  static addPost = async (req, res) => {
    try {
      const postData = new postModel({
        ...req.body,
        userId: req.user._id,
        author: req.user.name,
      });
      await postData.save();
      res.status(200).send({
        apiStatus: true,
        data: postData,
        message: "post added",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static readPost = async (req, res) => {
    try {
      const post = await postModel.findOne({ _id: req.params.id });

      res.status(200).send({
        apiStatus: true,
        data: post,
        message: "post fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static myPosts = async (req, res) => {
    try {
      await req.user.populate("myPosts");

      res.status(200).send({
        apiStatus: true,
        data: req.user.myPosts,
        message: "user posts fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static deletePost = async (req, res) => {
    try {
      await postModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });
      await req.user.populate("myPosts");
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        data: req.user.myPosts,
        message: "post deleted",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static editPost = async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const post = await postModel.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });
      updates.forEach((key) => (post[key] = req.body[key]));
      await post.save();
      res.status(200).send({
        apiStatus: true,
        data: post,
        message: "post edited",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };

  static addComment = async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);
      let obj = {
        cuId: req.user._id,
        cuName: req.user.name,
        conComm: req.body.conComm,
      };
      post.comments.push(obj);
      await post.save();
      res.status(200).send({
        apiStatus: true,
        data: post,
        message: "comment added",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static editComment = async (req, res) => {
    try {
      const post = await postModel.findOne({
        "comments._id": req.params.id,
      });

      let c = post.comments.find((comment) => comment.id == req.params.id);

      if (String(req.user._id) != String(c.cuId))
        throw new Error("not Authorized");

      c.conComm = req.body.conComm;
      post.save();

      res.status(200).send({
        apiStatus: true,
        data: post,
        message: "comment edited",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static deleteComment = async (req, res) => {
    try {
      const post = await postModel.findOne({
        "comments._id": req.params.id,
      });

      let c = post.comments.find((comment) => comment.id == req.params.id);
      let index = post.comments.findIndex(
        (comment) => comment.id == req.params.id
      );

      if (String(req.user._id) != String(c.cuId))
        throw new Error("not Authorized");

      post.comments.splice(index, 1);
      post.save();

      res.status(200).send({
        apiStatus: true,
        data: post,
        message: "comment deleted",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static toggleLike = async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);
      const user = await userModel.findById(req.user._id);
      const check = post.likes.findIndex(
        (like) => String(like.liId) == String(req.user._id)
      );
     const index = user.likedPosts.findIndex(lp=> lp.postId == post._id)
     
      if (check >= 0) {
        post.likes.splice(check, 1);
        user.likedPosts.splice(index,1)

       
        await post.save();
        await user.save();

        res.status(200).send({
          apiStatus: true,
          data: post,
          message: "unlike",
        });
      }
       else {
        const obj = {
          liId: req.user._id,
          luName: req.user.name,
        };

        const obj2 = {
          postId : req.params.id
        }
        
        post.likes.push(obj);
        user.likedPosts.push(obj2);

       

        await post.save();
        await user.save();

        res.status(200).send({
          apiStatus: true,
          data: post,
          message: "liked",
        });
      }
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static numberOfLikes = async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);

      res.status(200).send({
        apiStatus: true,
        data: post.likes.length,
        message: "number of likes fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
}

module.exports = Post;

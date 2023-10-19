import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  singlePost,
  updatePost,
  postLocation,
  getDivision,
  addImages,
  getImages
} from "../controllers/post.js";

const PostRouter = express.Router();


PostRouter.get("/single/:id",singlePost)
PostRouter.get("/", getPosts);
PostRouter.get("/:id", getPost);
PostRouter.post("/", addPost);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);
PostRouter.post("/img/:id",addImages);
PostRouter.get("/img/:id",getImages)


// location post routes

PostRouter.post("/location", postLocation);

// Destrict get route

//PostRouter.get("/division", getDivision);





export default PostRouter;

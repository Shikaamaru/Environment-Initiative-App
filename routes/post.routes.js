import { Router } from "express";
import { getLoggedInUserOrIgnore, verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getMyPosts, getPostsByUsername } from "../controller/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPostValidator, usernamePathVariableValidator } from "../validators/post.validator.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.route("/")
    .get(getLoggedInUserOrIgnore, getAllPosts)
    .post(verifyJWT, upload.fields([{ name: "images", maxCount: 5 }]), createPostValidator(), validate, createPost)

router.route("/get/my").get(verifyJWT, getMyPosts);

router
    .route("/get/u/:username")
    .get(
        getLoggedInUserOrIgnore,
        usernamePathVariableValidator(),
        validate,
        getPostsByUsername
    );

router
    .route("/get/t/:tag")
    .get(
        getLoggedInUserOrIgnore,
        tagPathVariableValidator(),
        validate,
        getPostsByTag
    );

router
    .route("/:postId")
    .get(
        getLoggedInUserOrIgnore,
        mongoIdPathVariableValidator("postId"),
        validate,
        getPostById
    )
    .patch(
        verifyJWT,
        upload.fields([
            { name: "images", maxCount: MAXIMUM_SOCIAL_POST_IMAGE_COUNT },
        ]),
        mongoIdPathVariableValidator("postId"),
        updatePostValidator(),
        validate,
        updatePost
    )
    .delete(verifyJWT, mongoIdPathVariableValidator("postId"), validate, deletePost);

router
    .route("/remove/image/:postId/:imageId")
    .patch(
        verifyJWT,
        mongoIdPathVariableValidator("postId"),
        mongoIdPathVariableValidator("imageId"),
        validate,
        removePostImage
    );

export default router;
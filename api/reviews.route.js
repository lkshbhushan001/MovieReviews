import express from "express"
import reviewsController from "./reviewsController.js"

const router = express.Router()
router.route( "/movie/:id").get(reviewsController.apiGetReviews)
router.route( "/new").post(reviewsController.apiPostReview)
router.route("/:id")
.get(reviewsController.apiGetReview)
.put(reviewsController.apiUpdateReview)
.delete(reviewsController.apiDeleteReview)

export default router
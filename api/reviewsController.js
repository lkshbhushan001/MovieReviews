import reviewsDAO from "../dao/reviewsDAO.js"

export default class reviewsController{
  static async apiPostReview(req, res){
    try{
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user

      await reviewsDAO.addReview(
        movieId,
        user,
        review
      )      
      res.json({status: "success"})      
    }
    catch(e){
      res.status(500).json({error: e.message})
    }
  }

  static async apiGetReview(req, res){
    try{
      let id = req.params.id || {}
      let reviews = await reviewsDAO.getReview(id)
      if(!reviews){
        res.status(404).json({error: "not found"})
        return
      }
      res.json(reviews)      
    }
    catch(e){
      console.log(`api, ${e}`)
      res.status(500).json({error: e.message})
    }
  }

  static async apiUpdateReview(req, res){
    try{
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await reviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var {error} = reviewResponse
      if(error) {
        res.status(400).json({error})
      }

      if(reviewResponse.modifiedCount === 0){
        throw new Error(
          "unable to update review",
        )
      }

      res.json({status: "success"})
    }
    catch(e){
      res.status(500).json({error: e.message})
    }
  }

  static async apiDeleteReview(req, res){
    try{
      const reviewId = req.params.id
      await reviewsDAO.deleteReview(reviewId)
      res.json({status: "success"})
    }
    catch(e){
      res.status(500).json({error: e.message})
    }
  }

  static async apiGetReviews(req, res){
    try{
      let id = req.params.id || {}
      let reviews = await reviewsDAO.getReviewsByMovieId(id)
      if(!reviews){
        res.status(404).json({error: "not found"})
        return
      }
      res.json(reviews)
    }
    catch(e){
      res.status(500).json({error: e.message})
    }
  }
}
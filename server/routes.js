const CarController = require("../server/controllers/cars.controller")
const ReviewController = require("../server/controllers/reviews.controller")

module.exports = app => {

    //Cars
    app.get("/api/cars",CarController.findAll);
    app.post("/api/cars/new",CarController.createCar);
    app.get("/api/cars/:id",CarController.findOne);
    app.put("/api/cars/update/:id",CarController.update);
    app.delete("/api/cars/delete/:id",CarController.delete);

    //REVIEWS
    app.post("/api/reviews/new",ReviewController.createReview);
    app.get("/api/reviews/:idCar",ReviewController.getReviewsFromCar);
    app.get("/api/reviews/:id",ReviewController.getReviews);

}
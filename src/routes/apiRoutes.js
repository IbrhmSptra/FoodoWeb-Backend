const router = require("express").Router();
const {
  findBookmark,
  getBookmarkUser,
  addBookmarkUser,
  deleteBookmarkUser,
} = require("../controllers/bookmarkController");
const {
  getCategoryData,
  FindCategory,
} = require("../controllers/categoryController");
const {
  foodSearch,
  getFoodById,
  getRandomFoods,
  getFood,
} = require("../controllers/foodController");
const {
  ratingFeature,
  getOrderUser,
  createOrderUser,
  findOrderDetailUser,
} = require("../controllers/orderController");
const { verify } = require("../middlewares/authorization");

//categories
router.get("/categories", getCategoryData);
router.get("/categories/:id", FindCategory);

//food
router.get("/food/random", getRandomFoods);
router.get("/food/search", foodSearch);
router.get("/food", getFood);
router.get("/food/:id", getFoodById);

//bookmark
router.post("/bookmark/:food_id", verify, addBookmarkUser);
router.get("/bookmark/:food_id", verify, findBookmark);
router.get("/bookmark", verify, getBookmarkUser);
router.delete("/bookmark/:food_id", verify, deleteBookmarkUser);

//order
router.post("/order/:food_id", verify, createOrderUser);
router.patch("/order/rating/:id", verify, ratingFeature);
router.get("/order", verify, getOrderUser);
router.get("/order/:id", verify, findOrderDetailUser);

module.exports = router;

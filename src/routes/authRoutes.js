const router = require("express").Router();
const {
  register,
  login,
  logout,
  validate,
} = require("../controllers/authController");
const {
  loginValidation,
  RegisterValidation,
} = require("../middlewares/authValidation");
const { verify } = require("../middlewares/authorization");

router.post("/register", RegisterValidation, register);
router.post("/login", loginValidation, login);
router.delete("/logout", logout);
router.get("/validate", verify, validate);

module.exports = router;

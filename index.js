const router = require("express").Router();
// const { isAuthenticated } = require("../middleware/jwt.middleware");
//omitted isAuthenticated
router.get("/",(req, res, next) => {
  console.log(req.payload)
  res.json("All good in here");
});

module.exports = router;
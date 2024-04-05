const router = require("express").Router();

router.get("/",(req, res, next) => {
  console.log(req.payload)
  res.json("All good in here");
});

module.exports = router;
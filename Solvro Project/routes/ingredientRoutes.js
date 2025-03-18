const express = require("express");
const ingredientController = require("../controllers/ingredientControllers");
const uploadImages = require("../middleware/imagesMiddleware")

const router = express.Router();

router.post("/ingredients",uploadImages.single("image") ,ingredientController.postIngredient);
router.get("/ingredients", ingredientController.getIngredients);
router.put("/ingredients/:id", ingredientController.updateIngredient);
router.delete("/ingredients/:id", ingredientController.deleteIngredient);

module.exports = router;

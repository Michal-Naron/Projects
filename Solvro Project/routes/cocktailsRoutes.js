const express = require("express");
const cocktailController = require("../controllers/cocktailController");

const router = express.Router();

router.post("/cocktails", cocktailController.postCocktail);
router.get("/cocktails", cocktailController.getCocktails);
router.put("/cocktails/:id", cocktailController.updateCocktail);
router.delete("/cocktails/:id", cocktailController.deleteCocktail);

module.exports = router;
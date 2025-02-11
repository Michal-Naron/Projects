const express = require("express")

const noteContolres = require("../controllers/noteController")

const router = express.Router()

router.post("/note",noteContolres.postNote)

module.exports = router
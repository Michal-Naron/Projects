const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "ingredientImages/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CocktailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId, 
                ref: 'Ingredient', 
                required: true
            },
            amount: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("Cocktail", CocktailSchema);

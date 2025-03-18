const fs = require('fs');

const Ingredient = require("../models/ingredientModel");

exports.postIngredient = async (req, res) => {
    try {
        const { name, description, isAlcoholic } = req.body;
        const imagePath = req.file ? `/ingredientImages/${req.file.filename}` : null; 

        const newIngredient = new Ingredient({
            name,
            description,
            isAlcoholic,
            image: imagePath
        });

        await newIngredient.save();
        res.status(201).json({ message: "Ingredient added successfully", ingredient: newIngredient });
    } catch (error) {
        res.status(500).json({ message: "Error adding ingredient", error: error.message });
    }
};

// exports.getIngredients = async (req, res) => {
//     try {
//         const ingredients = await Ingredient.find();
//         res.status(200).json(ingredients);
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving ingredients", error: error.message });
//     }
// };

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        const ingredientsWithImageUrl = ingredients.map(ingredient => {
            if (ingredient.image) {
                ingredient.image = `${req.protocol}://${req.get('host')}${ingredient.image}`;
            }
            return ingredient;
        });
        res.status(200).json(ingredientsWithImageUrl);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving ingredients", error: error.message });
    }
};


// exports.updateIngredient = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedIngredient = await Ingredient.findByIdAndUpdate(id, req.body, { new: true });
        
//         if (!updatedIngredient) {
//             return res.status(404).json({ message: "Ingredient not found" });
//         }
        
//         res.status(200).json({ message: "Ingredient updated successfully", ingredient: updatedIngredient });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating ingredient", error: error.message });
//     }
// };



exports.updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isAlcoholic } = req.body;

        let imagePath = null;
        if (req.file) {
            imagePath = `/ingredientImages/${req.file.filename}`;

            const ingredient = await Ingredient.findById(id);
            if (ingredient && ingredient.image) {
                const oldImagePath = `./public${ingredient.image}`;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedIngredientData = {
            name,
            description,
            isAlcoholic,
            image: imagePath || undefined,
        };

        const updatedIngredient = await Ingredient.findByIdAndUpdate(id, updatedIngredientData, { new: true });

        if (!updatedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }

        res.status(200).json({
            message: "Ingredient updated successfully",
            ingredient: updatedIngredient,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating ingredient", error: error.message });
    }
};


exports.deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIngredient = await Ingredient.findByIdAndDelete(id);
        
        if (!deletedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        
        res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ingredient", error: error.message });
    }
};

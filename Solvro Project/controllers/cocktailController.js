const Cocktail = require("../models/cocktailModel")


exports.postCocktail = async (req, res) => {
    try {
        const { name, category, instructions, ingredients } = req.body;
        
        const newCocktail = new Cocktail({
            name,
            category,
            instructions,
            ingredients
        });
        
        await newCocktail.save();
        res.status(201).json({ message: "Cocktail added successfully", cocktail: newCocktail });
    } catch (error) {
        res.status(500).json({ message: "Error adding cocktail", error: error.message });
    }
};
exports.getCocktails = async (req, res) => {
    try {
        let { page, limit, isAlcoholic,ingredient,order } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

    
        let cocktails = await Cocktail.find()
            .populate("ingredients.ingredient")
            .skip(skip)
            .limit(limit);


        if (isAlcoholic === "true") {
            cocktails = cocktails.filter(cocktail =>
                cocktail.ingredients.some(i => i.ingredient.isAlcoholic === true)
            );
        } else if (isAlcoholic === "false") {
            cocktails = cocktails.filter(cocktail =>
                cocktail.ingredients.every(i => i.ingredient.isAlcoholic === false)
            );
        }

        if (ingredient) {
            cocktails = cocktails.filter(cocktail =>
                cocktail.ingredients.some(i => 
                    i.ingredient.name.toLowerCase() === ingredient.toLowerCase()
                )
            );
        }
        if (order === "asc") {
            cocktails = cocktails.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === "desc") {
            cocktails = cocktails.sort((a, b) => b.name.localeCompare(a.name));
        }

        res.status(200).json({
            total: cocktails.length,
            page,
            limit,
            totalPages: Math.ceil(cocktails.length / limit),
            data: cocktails
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cocktails", error: error.message });
    }
};



exports.updateCocktail = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCocktail = await Cocktail.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedCocktail) {
            return res.status(404).json({ message: "Cocktail not found" });
        }
        
        res.status(200).json({ message: "Cocktail updated successfully", cocktail: updatedCocktail });
    } catch (error) {
        res.status(500).json({ message: "Error updating cocktail", error: error.message });
    }
};

exports.deleteCocktail = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCocktail = await Cocktail.findByIdAndDelete(id);
        
        if (!deletedCocktail) {
            return res.status(404).json({ message: "Cocktail not found" });
        }
        
        res.status(200).json({ message: "Cocktail deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cocktail", error: error.message });
    }
};
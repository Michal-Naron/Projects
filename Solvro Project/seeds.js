const mongoose = require("mongoose");
const {faker} = require("@faker-js/faker");
const Ingredient = require("./models/ingredientModel");
const Cocktail = require("./models/cocktailModel");

mongoose.connect("mongodb+srv://gucio123:gucio123@cluster.rmuqj.mongodb.net/solvro?retryWrites=true&w=majority&appName=Cluster").then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Connection error", err));

const generateIngredients = async () => {
    await Ingredient.deleteMany({});

    const ingredientNames = [
        { name: "Wódka", isAlcoholic: true },
        { name: "Rum", isAlcoholic: true },
        { name: "Sok pomarańczowy", isAlcoholic: false },
        { name: "Mięta", isAlcoholic: false },
        { name: "Limonka", isAlcoholic: false },
        { name: "Cukier", isAlcoholic: false },
        { name: "Cola", isAlcoholic: false },
        { name: "Whiskey", isAlcoholic: true },
        { name: "Gin", isAlcoholic: true }
    ];

    const ingredients = ingredientNames.map(({ name, isAlcoholic }) => new Ingredient({
        name,
        description: faker.lorem.sentence(),
        isAlcoholic,
        image: faker.image.urlPicsumPhotos()
    }));

    return await Ingredient.insertMany(ingredients);
};

const generateCocktails = async (ingredients) => {
    await Cocktail.deleteMany({});

    let fakeCocktails = [];

    for (let i = 0; i < 10; i++) {
        const usedIngredients = faker.helpers.arrayElements(ingredients, faker.number.int({ min: 2, max: 3 }));

        let cocktail = new Cocktail({
            name: faker.lorem.words(2),
            category: faker.commerce.department(),
            instructions: faker.lorem.paragraph(),
            ingredients: usedIngredients.map(ing => ({
                ingredient: ing._id,
                amount: `${faker.number.int({ min: 10, max: 100 })} ml`
            }))
        });

        fakeCocktails.push(cocktail);
    }

    await Cocktail.insertMany(fakeCocktails);
};

const seedDatabase = async () => {
    const ingredients = await generateIngredients();
    await generateCocktails(ingredients);
    mongoose.connection.close();
};

seedDatabase();

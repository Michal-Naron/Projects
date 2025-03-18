const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Cocktail = require("../models/cocktailModel");
const Ingredient = require("../models/ingredientModel");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.disconnect(); 
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterEach(async () => {
    await Cocktail.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Testowanie API koktajli", () => {
    test("GET /main/cocktails - powinno zwrócić pustą tablicę", async () => {
        const response = await request(app).get("/api/cocktails");
        if (response.body.length > 0) {
            response.body.data.forEach(cocktail => {
                expect(cocktail).toHaveProperty("name");
                expect(cocktail).toHaveProperty("category");
                expect(cocktail).toHaveProperty("instructions");
                expect(cocktail).toHaveProperty("ingredients");
                expect(Array.isArray(cocktail.ingredients)).toBe(true);
            });
        }
        expect(response.statusCode).toBe(200)
        console.log(response.body)
        expect(response.body).toEqual({"data": [], "limit": 10, "page": 1, "total": 0, "totalPages": 0});
        
    });

    test("POST /main/cocktails - powinno dodać nowy koktajl", async () => {
        const tequilaId = new mongoose.Types.ObjectId("67cf11aca7197dd87a7974a1");  
        const limonkaId = new mongoose.Types.ObjectId("67cf11aca7197dd87a7974a1");  
    
        const newCocktail = {
            name: "Margarita",
            category: "Drink",
            instructions: "Wstrząśnij i podawaj",
            ingredients: [
                { ingredient: tequilaId, amount: "50ml" },
                { ingredient: limonkaId, amount: "20ml" }
            ]
        };
    
        const response = await request(app).post("/api/cocktails").send(newCocktail);
        expect(response.statusCode).toBe(201);
        expect(response.body.cocktail.name).toBe("Margarita");
    
        const cocktails = await Cocktail.find();
        expect(cocktails.length).toBe(1);
    });
    
    test("PUT /main/cocktails/:id - powinno zaktualizować koktajl", async () => {
        const limonkaId = "67cf11aca7197dd87a7974a1";
    
        const cocktail = await Cocktail.create({
            name: "Old Fashioned",
            category: "Drink",
            instructions: "Wymieszaj składniki",
            ingredients: [
                { ingredient: new mongoose.Types.ObjectId(limonkaId), amount: "50ml" },
            ]
        });
    
        const response = await request(app)
            .put(`/api/cocktails/${cocktail._id}`)
            .send({ name: "Updated Old Fashioned" });
    
        expect(response.statusCode).toBe(200);

    
        const updatedCocktail = await Cocktail.findById(cocktail._id).populate('ingredients.ingredient');
    

        expect(updatedCocktail.ingredients.length).toBe(1);

    });
    
    test("DELETE /main/cocktails/:id - powinno usunąć koktajl", async () => {
        const limonkaId = "67cf11aca7197dd87a7974a1";
        
        const cocktail = await Cocktail.create({
            name: "Mojito",
            category: "Drink",
            instructions: "Mieszaj składniki",
            ingredients: [
                { ingredient: new mongoose.Types.ObjectId(limonkaId), amount: "50ml" }
            ]
        });

        const response = await request(app).delete(`/api/cocktails/${cocktail._id}`);
        expect(response.statusCode).toBe(200);

        const cocktails = await Cocktail.find();
        expect(cocktails.length).toBe(0);
    });
});

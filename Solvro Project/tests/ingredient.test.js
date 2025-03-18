const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Ingredient = require('../models/ingredientModel');
const fs = require('fs');
const path = require('path');

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
    await Ingredient.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Testowanie API składników', () => {
    test('GET /side/ingredients - powinno zwrócić pustą tablicę', async () => {
        const response = await request(app).get('/api/ingredients');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
    test('POST /side/ingredients - powinno dodać nowy składnik', async () => {
        const newIngredient = {
            name: 'Whiskey',
            description: 'Mocny alkohol',
            isAlcoholic: true
        };
    
        const imagePath = path.join(__dirname, "test-assets" , 'whisky.jpeg');
        const response = await request(app)
            .post('/api/ingredients')
            .set('Content-Type', 'multipart/form-data')
            .attach('image', imagePath)
            .field('name', newIngredient.name)
            .field('description', newIngredient.description)
            .field('isAlcoholic', newIngredient.isAlcoholic.toString());
        expect(response.statusCode).toBe(201);
        console.log(response.body.ingredient.name)
        expect(response.body.ingredient.name).toBe('Whiskey');
    
        const ingredients = await Ingredient.find();
        expect(ingredients.length).toBe(1);
        expect(ingredients[0].name).toBe('Whiskey');

    });
    test('PUT /side/ingredients/:id - powinno zaktualizować składnik', async () => {
        const ingredient = await Ingredient.create({
            name: 'Rum',
            description: 'Słodki alkohol',
            isAlcoholic: true,
            image: 'rum.jpg'
        });
    
        const response = await request(app)
            .put(`/api/ingredients/${ingredient._id}`)
            .send({ name: 'Updated Rum' });
    
        expect(response.statusCode).toBe(200);
    
        const updatedIngredient = await Ingredient.findById(ingredient._id);
        expect(updatedIngredient.name).toBe('Updated Rum');
    });
    
    test('DELETE /side/ingredients/:id - powinno usunąć składnik', async () => {
        const ingredient = await Ingredient.create({
            name: 'Vodka',
            description: 'Czysty alkohol',
            isAlcoholic: true,
            image: 'vodka.jpg'
        });

        const response = await request(app).delete(`/api/ingredients/${ingredient._id}`);
        expect(response.statusCode).toBe(200);

        const ingredients = await Ingredient.find();
        expect(ingredients.length).toBe(0);
    });
});

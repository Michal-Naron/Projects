const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();

const DATABASE =    "mongodb+srv://gucio123:gucio123@cluster.rmuqj.mongodb.net/solvro?retryWrites=true&w=majority&appName=Cluster"

const cocktailRoutes = require("./routes/cocktailsRoutes")
const ingredientRoutes = require("./routes/ingredientRoutes")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/ingredientImages", express.static("ingredientImages"));


app.use((err,req,res,next)=>{
    console.log("Error :" + err.message)
    const data = err.data
    res.status(500).json({ message: err.message, data:data });
})

app.use("/api",cocktailRoutes,ingredientRoutes  )


mongoose.connect(DATABASE).then(result=>{
    app.listen(8080)
  }).catch(err=>{
    const error = new Error("dont connection with database")
    
    throw error 
  })

module.exports =app
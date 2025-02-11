const express = require("express")
const { default: mongoose } = require("mongoose")

const noteRoute = require("./routes/note")

const app = express()

const DATABASE =    "mongodb+srv://gucio123:gucio123@cluster.rmuqj.mongodb.net/message?retryWrites=true&w=majority&appName=Cluster"
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use((err,req,res,next)=>{
    console.log("Error :" + err.message)
    res.status(500).json({ message: err.message });
})

app.use("/note",noteRoute)

mongoose.connect(DATABASE).then(result=>{
    app.listen(8080)
  }).catch(err=>{
    const error = new Error("dont connection with database")
    error.statusCode(500)
    throw error 
  })
const app = require("./app")

const mongoose = require("mongoose")

mongoose.connect(DATABASE).then(result=>{
    app.listen(8080)
  }).catch(err=>{
    const error = new Error("dont connection with database")
    
    throw error 
  })

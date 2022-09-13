const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const toolsRouter = require("./routes/v1/tools.route");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utility/dbConnect");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.use(viewCount);


// Apply the rate limiting middleware to all requests
// app.use(limiter);


// connection the Database 
connectToServer( (err) =>{
  if(!err){
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
  else{
    console.log(err);
  }
});

// all routes section 
app.use("/api/v1/tools", toolsRouter)



app.get("/", (req, res) => {
  // res.send("Hello World");
  
  //send file
  res.sendFile(__dirname + "/public/test.html")

  // send dynamic data into html to response. 
  // res.render("Home.ejs", {
  //   id: 5,
  //   user:{
  //     name: 'test'
  //   }
  // });
});

// if user hit unavailable route 
app.all("*", (req, res) =>{
  res.send("No route found.")
});

// handle error globally by using express 
app.use(errorHandler);



// if express can not handle error then this code will run 
process.on("unhandledRejection", (error) =>{
  console.log(error.name, error.message);
  app.close(() =>{
    process.exit(1);
  });
});


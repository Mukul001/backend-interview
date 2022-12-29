require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', function (req, res, next) {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
      })
      .catch((err) => console.log(`Database connection error: ${err.message}`));

} catch (error) {
    handleError(error);
}

app.listen(process.env.APP_PORT, () => {
    console.log(`Server connect on port number ${process.env.APP_PORT}`);
})
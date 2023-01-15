const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/users", require("./routes/users"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log(BASE_PATH);
});

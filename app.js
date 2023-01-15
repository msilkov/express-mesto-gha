const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect("mongodb://localhost:27017/mestodb", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.use("/users", require("./routes/users"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
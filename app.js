const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
	req.user = {
		_id: "63c44a9db68d2c010b169e4f",
	};

	next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
	res.status(404).send({ message: "Страница не найдена." });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

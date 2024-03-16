require("express-async-errors");

require("dotenv/config");

const cors = require("cors");

const database = require("./database/knex");

const uploadConfig = require("./configs/upload");

const AppError = require("./utils/AppError");

const cookieParser = require("cookie-parser");

const express = require("express");

const routes = require("./routes");

database();

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(cookieParser());
app.use(
	cors({
		/* origin:
			"rocket-food-explorer.netlify.app" */ /* ["http://localhost:5173", "http://127.0.0.1:5173"],*/
		credentials: true,
	})
);

app.use(routes);

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	console.error(error);

	return response.status(500).json({
		status: "error",
		message: "Internal server Error",
	});
});

const PORT = process.env.PORT || 3000;
const runningMsg = `server running on http://localhost:${PORT}`;

app.listen(PORT, () => {
	console.log(runningMsg);
});

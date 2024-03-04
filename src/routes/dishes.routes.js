const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishController = require("../controllers/DishController");
const DishImageController = require("../controllers/DishImageController");

const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);

const dishController = new DishController();
const dishImageController = new DishImageController();

const dishesRoutes = Router();
dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishController.index);

dishesRoutes.get("/:id", dishController.show);

dishesRoutes.post(
	"/",
	verifyUserAuthorization(["admin"]),
	dishController.create
);

dishesRoutes.delete(
	"/:id",
	verifyUserAuthorization(["admin"]),
	dishController.delete
);

dishesRoutes.put(
	"/:id",
	verifyUserAuthorization(["admin"]),
	dishController.update
);

dishesRoutes.patch(
	"/dish_image/:dish_id",
	verifyUserAuthorization(["admin"]),
	upload.single("image"),
	dishImageController.update
);

module.exports = dishesRoutes;

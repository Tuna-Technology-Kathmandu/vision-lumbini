const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const listAllItems = require("../controllers/ListAllControllers");
const createItem = require("../controllers/NewInvestmentController");
const deleteItem = require("../controllers/DeleteInvestmentController");

router
  .get("/", listAllItems)
  .post(
    "/",
    verifyToken,
    checkRole("admin", "editor"),
    upload.single("image_url"),
    createItem
  )
  .delete("/:id/delete", verifyToken, checkRole("admin", "editor"), deleteItem);

// router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleCategory);

// router.put("/:id", verifyToken, checkRole("admin", "editor"), updateCategory);

// router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCategory);

module.exports = router;

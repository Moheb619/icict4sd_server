import express from "express";
import { updateContactUs, deleteContactUs, allContactUs, newContactUs } from "../controllers/contact.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, allContactUs);
router.post("/", newContactUs);
router.put("/:contactId", verifyAdmin, updateContactUs);
router.delete("/:contactId", verifyAdmin, deleteContactUs);

export default router;

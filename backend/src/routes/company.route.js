import express from "express";
import {
  registerCompany,
  getAllDetails,
//   companySearch,
//   companySort,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", registerCompany);
router.get("/companies", getAllDetails);
// router.get("/company", companySearch);
// router.get("/company_sort", companySort);

export default router;

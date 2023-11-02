import { Router } from "express";
import {
  getAllContractsHandler,
  getContractHandler,
} from "../../controllers/contractsController.js";

const router = Router();

router.get("/contracts/", getAllContractsHandler);
router.get("/contracts/:id", getContractHandler);

export default router;

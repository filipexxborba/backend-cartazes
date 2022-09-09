import express, { Response } from "express";
const router = express.Router();

import { branchList } from "../data/branchList";

router.get("/", (_, res: Response) => {
  res.status(200).send(branchList);
});

export default router;

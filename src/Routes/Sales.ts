import express, { Request, Response } from "express";
import mongoose from "mongoose";
const router = express.Router();

// Models
import { Sale } from "../models/Sales";

// This route will return all registered sales
router.get("/", (_, res: Response) => {
  Sale.find({}, (error: Error, sales: typeof Sale) => {
    if (error) res.status(500).send(error);
    res.status(200).send(sales);
  });
});

// This route will create a new Sale in MongoDB
router.post("/", (req: Request, res: Response) => {
  const { title, start_date, end_date, branch_list } = req.body;
  const newSale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    start_date: start_date,
    end_date: end_date,
    products_list: [],
    branch_list: branch_list,
  });
  newSale
    .save()
    .then((sale) => {
      res.status(200).send(sale);
    })
    .catch((error: Error) => res.status(500).send(error));
});

// This route will find and update the Sale info's
router.patch("/", (req: Request, res: Response) => {
  const { title, start_date, end_date, branch_list, products_list, _id } =
    req.body;
  Sale.findByIdAndUpdate(
    _id,
    {
      title: title,
      start_date: start_date,
      end_date: end_date,
      branch_list: branch_list,
      products_list: products_list,
    },
    (error: Error, _: typeof Sale) => {
      if (error) res.status(500).send(error);
      res
        .status(200)
        .send(`Foi alterado com sucesso a promoção com ID: ${_id}`);
    }
  );
});

// This route will delete the sales with find by ID
router.delete("/", (req: Request, res: Response) => {
  const { _id } = req.body;
  Sale.findByIdAndDelete(_id, (error: Error, _: typeof Sale) => {
    if (error) res.status(500).send(error);
    res.status(200).send(`Foi deletado com sucesso a promoção com ID: ${_id}`);
  });
});

export default router;

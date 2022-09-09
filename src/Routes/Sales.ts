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

// This route will return  registered sales by ID
router.get("/:id", (req: Request, res: Response) => {
  Sale.findById(req.params.id, (error: Error, sale: typeof Sale) => {
    if (error) res.status(500).send(error);
    res.status(200).send(sale);
  });
});

// This route will create a new Sale in MongoDB
router.post("/create", (req: Request, res: Response) => {
  const { title, start_date, end_date, branch_list, layout } = req.body;
  const newSale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    start_date: start_date,
    end_date: end_date,
    products_list: [],
    branch_list: branch_list,
    layout: layout,
  });
  newSale
    .save()
    .then((sale) => {
      res.status(200).send(sale);
    })
    .catch((error: Error) => res.status(500).send(error));
});

// This route will find and update the Sale info's
router.patch("/edit", (req: Request, res: Response) => {
  const {
    title,
    start_date,
    end_date,
    branch_list,
    products_list,
    layout,
    _id,
  } = req.body;
  Sale.findByIdAndUpdate(
    _id,
    {
      title: title,
      start_date: start_date,
      end_date: end_date,
      branch_list: branch_list,
      products_list: products_list,
      layout: layout,
    },
    (error: Error, _: typeof Sale) => {
      if (error) res.status(500).send(error);
      res
        .status(200)
        .send(`Foi alterado com sucesso a promoção com ID: ${_id}`);
    }
  );
});

// This route will find and update the Sale branchList info's
router.patch("/edit/branch", (req: Request, res: Response) => {
  const { _id, branchID } = req.body;

  Sale.findById(_id, (error: Error, sale: any) => {
    if (error) res.status(500).send(error);

    if (sale.branch_list.includes(branchID)) {
      let temp = sale.branch_list;
      let temp2: number[] = [];
      temp.map((branch: any) => {
        branch !== branchID ? temp2.push(branch) : null;
      });
      sale.branch_list = temp2;
    } else {
      sale.branch_list.push(branchID);
    }
    sale
      .save()
      .then((sale: any) => res.status(200).send(sale))
      .catch((error: Error) => res.status(500).send(error));
  });
});

// This route will find and update the Sale productList info's
router.patch("/edit/products", (req: Request, res: Response) => {
  const { _id, products_list } = req.body;
  console.log(_id, products_list);

  Sale.findById(_id, (error: Error, sale: any) => {
    if (error) res.status(500).send(error);
    let temp = sale.products_list;
    products_list.map((product: any) => {
      if (!temp.includes(product)) temp.push(product);
    });
    sale
      .save()
      .then((sale: any) => res.status(200).send(sale))
      .catch((error: Error) => res.status(500).send(error));
  });
});

// This route will delete of products_list the product passed in the body
router.delete("/edit/products", (req: Request, res: Response) => {
  const { _id, productDelete } = req.body;

  Sale.findById(_id, (error: Error, sale: any) => {
    if (error) res.status(500).send(error);
    let temp = sale.products_list;
    let temp2: any = [];
    temp.map((product: any) =>
      product !== productDelete ? temp2.push(product) : null
    );
    sale.products_list = temp2;
    sale
      .save()
      .then((sale: any) => res.status(200).send(sale))
      .catch((error: Error) => res.status(500).send(error));
  });
});

// This route will delete the sales with find by ID
router.delete("/delete", (req: Request, res: Response) => {
  const { _id } = req.body;
  Sale.findByIdAndDelete(_id, (error: Error, _: typeof Sale) => {
    if (error) res.status(500).send(error);
    res.status(200).send(`Foi deletado com sucesso a promoção com ID: ${_id}`);
  });
});

export default router;

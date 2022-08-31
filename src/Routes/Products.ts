import express, { Request, response, Response } from "express";
import mongoose from "mongoose";
const router = express.Router();

import { Product } from "../models/Products";

// This route will return all registered products
router.get("/", (_, res: Response) => {
  Product.find({}, (error: Error, products: typeof Product) => {
    if (error) res.status(500).send(error);
    res.status(200).send(products);
  });
});

// This route will create a new Product
router.post("/", (req: Request, res: Response) => {
  const { product_title, product_subtitle, ref_int, posters_layouts } =
    req.body;
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_title: product_title,
    product_subtitle: product_subtitle,
    ref_int: ref_int,
    posters_layouts: posters_layouts,
  });

  newProduct
    .save()
    .then((product) => res.status(200).send(product))
    .catch((error: Error) => res.status(500).send(error));
});

// This route will find and update the Products info's
router.patch("/", (req: Request, res: Response) => {
  const { product_title, product_subtitle, ref_int, posters_layouts, _id } =
    req.body;
  Product.findByIdAndUpdate(
    _id,
    {
      product_title: product_title,
      product_subtitle: product_subtitle,
      ref_int: ref_int,
      poster_layouts: posters_layouts,
    },
    (error: Error, _: typeof Product) => {
      if (error) res.status(500).send(error);
      res.status(200).send(`Foi alterado com sucesso o produto com ID: ${_id}`);
    }
  );
});

// This route will delete the product with find by id
router.delete("/", (req: Request, res: Response) => {
  Product.findByIdAndRemove(req.body._id, (error: Error, _: typeof Product) => {
    if (error) res.status(500).send(error);
    res.status(200).send(`Foi excluído o produto com o ID: ${req.body._id}`);
  });
});

export default router;

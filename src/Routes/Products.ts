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

// This route will return the product with ID params
router.get("/:id", (req: Request, res: Response) => {
  Product.findById(req.params.id, (error: Error, product: typeof Product) => {
    if (error) res.status(500).send(error);
    res.status(200).send(product);
  });
});

// This route will create a new Product
router.post("/create", (req: Request, res: Response) => {
  const { product_title, product_subtitle, ref_int, posters_layouts } =
    req.body;
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_title: product_title.replaceAll("/", "-"),
    product_subtitle: product_subtitle.replaceAll("/", "-"),
    ref_int: ref_int,
    posters_layouts: posters_layouts,
  });

  newProduct
    .save()
    .then((product) => res.status(200).send(product))
    .catch((error: Error) => res.status(500).send(error));
});

// This route will find and update the Products info's
router.patch("/edit", (req: Request, res: Response) => {
  const { product_title, product_subtitle, ref_int, _id } = req.body;
  Product.findByIdAndUpdate(
    _id,
    {
      product_title: product_title,
      product_subtitle: product_subtitle,
      ref_int: ref_int,
    },
    (error: Error, _: typeof Product) => {
      if (error) res.status(500).send(error);
      res.status(200).send(`Foi alterado com sucesso o produto com ID: ${_id}`);
    }
  );
});

router.patch("/edit/layout", (req: Request, res: Response) => {
  const { id, posterLayout } = req.body;
  Product.findById(id, (error: Error, product: typeof Product) => {
    if (error) res.status(500).send(error);
    // @ts-ignore
    let check = product.posters_layouts.findIndex(
      (poster: { id: string }) => poster.id === posterLayout.id
    );
    // @ts-ignore
    if (check !== -1) product.posters_layouts[check] = posterLayout;
    // @ts-ignore
    else product.posters_layouts.push(posterLayout);
    // @ts-ignore
    product
      // @ts-ignore
      .save()
      // @ts-ignore
      .then((product = res.status(200).send(product)))
      // @ts-ignore
      .catch((error: Error) => res.status(500).send(error));
  });
});

// This route will delete the product with find by id
router.delete("/delete", (req: Request, res: Response) => {
  Product.findByIdAndRemove(req.body._id, (error: Error, _: typeof Product) => {
    if (error) res.status(500).send(error);
    res.status(200).send(`Foi excluído o produto com o ID: ${req.body._id}`);
  });
});

export default router;

import csvtojson from "csvtojson";
import Product from "../models/product.js";

export const products = {
  createProduct: async (req, res) => {
    try {
      const createProductData = req.body;
      const product = await Product.create(createProductData);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error,
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      let { skip, take, search } = req.query;
      skip = parseInt(skip);
      take = parseInt(take);

      const query = {};
      if (search) {
        const searchNumber = parseInt(search);
        if (!isNaN(searchNumber)) {
          query.$or = [
            { title: { $regex: new RegExp(search, "i") } },
            { barcode: { $regex: new RegExp(search, "i") } },
            { scanCode: { $regex: new RegExp(search, "i") } },
            { supplierRef: { $regex: new RegExp(search, "i") } },
            { brand: { $regex: new RegExp(search, "i") } },
            { supplier: { $regex: new RegExp(search, "i") } },
            { ean: { $regex: new RegExp(search, "i") } },
            { sku: searchNumber },
            { 'stores.location': { $regex: new RegExp(search, "i") } }
          ];
        } else {
          query.$or = [
            { title: { $regex: new RegExp(search, "i") } },
            { barcode: { $regex: new RegExp(search, "i") } },
            { scanCode: { $regex: new RegExp(search, "i") } },
            { supplierRef: { $regex: new RegExp(search, "i") } },
            { brand: { $regex: new RegExp(search, "i") } },
            { supplier: { $regex: new RegExp(search, "i") } },
            { ean: { $regex: new RegExp(search, "i") } },
            { 'stores.location': { $regex: new RegExp(search, "i") } }
          ];
        }
      }
      const allProducts = await Product.find({ 'stores.0': { $exists: true }});
      const products = await Product.find(query).skip(skip).limit(take);

      const stockedProduct = allProducts.filter(product => {
        const totalQty = product.stores.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
        return totalQty > 0;
      });
      
      const totalCount = await Product.countDocuments(query);
      res.status(200).send({
        success: true,
        data: products, 
        count: totalCount,
        allProducts:stockedProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  editProduct: async (req, res) => {
    try {
      const editProductData = req.body;
      await Product.updateOne(
        { _id: editProductData._id },
        {
          $set: editProductData,
        }
      );
      res.status(200).json({ success: true, message: "Product edited" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error,
      });
    }
  },

  setStores: async (req, res) => {
    try {
      const editProductData = req.body;
      await Product.updateOne(
        { _id: req.params.id },
        {
          $set: {
            stores: editProductData.stores,
            status: editProductData.status,
          },
        }
      );
      res.status(200).json({ success: true, message: "Product edited" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true, message: "Product Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error,
      });
    }
  },

  csvFileUpload: async (req, res) => {
    try {
      console.log("verifying");
      const converter = new csvtojson.Converter();
      const csvData = await converter.fromFile(req.file.path);
      await Product.insertMany(csvData);
      res.status(200).json({ message: "CSV uploaded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading CSV" });
    }
  },
};

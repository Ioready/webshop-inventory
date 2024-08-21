import csvtojson from "csvtojson";
import Product from "../models/product.js";
import Category from "../models/category.js";

export const products = {
  // markWebshopProduct :async (req, res) => {
  //   try {
  //     const { productIds, isWebshopProduct } = req.body;

  //     const result = await Product.updateMany(
  //       { _id: { $in: productIds } },
  //       { $set: { isWebshopProduct } }
  //     );
  //     res.status(200).json({ message: 'Products marked as Webshop product', result });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Server error', error });
  //   }
  // },
  markWebshopProduct :async (req, res) => {
    try {
      const { productIds, isWebshopProduct, bestProduct, topProduct,popularProduct, ean } = req.body;

      let filter = {};

      if (productIds) {
        filter = { _id: { $in: productIds } };
      } else if (ean) {
        filter = { ean };
      }

      const updateFields = {};

      if (typeof isWebshopProduct !== 'undefined') {
        updateFields.isWebshopProduct = isWebshopProduct;
      }
      if (typeof bestProduct !== 'undefined') {
        updateFields.bestProduct = bestProduct;
      }
      if (typeof topProduct !== 'undefined') {
        updateFields.topProduct = topProduct;
      }
      if (typeof popularProduct !== 'undefined') {
        updateFields.popularProduct = popularProduct;
      }
      const result = await Product.updateMany(
        filter,
        { $set: updateFields }
      );

      res.status(200).json({ message: 'Products updated successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },


  addCategory: async (req, res) => {
    try {
      const { categories, subCategories, subSubCategories } = req.body;
      const categoryId = '66b1036ef752edb1c5e86e93';
      const updateObject = {};
  
      if (categories) {
        const categoryItems = categories.map(cat => ({
          name: cat.categorie,
          image: cat.image,
          topCategory: cat.topCategory || false,
        }));
        updateObject['$push'] = {
          categories: { $each: categoryItems },
        };
      }
  
      if (subCategories) {
        updateObject['$push'] = {
          ...updateObject['$push'],
          subCategories: { $each: subCategories },
        };
      }
  
      if (subSubCategories) {
        updateObject['$push'] = {
          ...updateObject['$push'],
          subSubCategories: { $each: subSubCategories },
        };
      }
  
      // Perform the update
      const result = await Category.findByIdAndUpdate(
        categoryId,
        updateObject,
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'Categories added successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
  

  getCategory: async (req, res) => {
    try {
        const categories = await Category.find({}, 'categories subCategories subSubCategories');

        // Extract unique categories
        // const uniqueCategories = Array.from(new Set(categories.map(item => item.categories)));

        res.status(200).json({
            message: 'Categories fetched successfully',
            categories: categories
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        });
    }
},

 createProduct : async (req, res) => {
    try {
      const createProductData = req.body;
      let minSellingPrice = 0;
      if (createProductData.purchasePrice) {
        const purchasePrice = createProductData.purchasePrice;
        if (createProductData.platform === "bol.com") {
          const x = 1.42353 + 8.38459;
          let y = purchasePrice * x;
  
          if (y < 10) {
            minSellingPrice = (y + 1.27).toFixed(2);
          } else if (y >= 10 && y < 20) {
            minSellingPrice = (y + 1.57).toFixed(2);
          } else if (y >= 20) {
            minSellingPrice = (y + 2).toFixed(2);
          } else {
            minSellingPrice = 0;
          }
        } else {
          minSellingPrice = (((purchasePrice * 1.42353) + 8.38459) - 5.53).toFixed(2);
        }
      }
      const calculateTotalQuantity = (data) => {
        let totalQuantity = 0;
        if (data) {
          for (const item of data) {
            totalQuantity += parseInt(item.qty) - parseInt(item.laps);
          }
        }
        return totalQuantity;
      };
      // Calculate totalStock based on stores data
      const totalStock = calculateTotalQuantity(createProductData.stores);
  
      const productDetail = { ...createProductData, minSellingPrice, totalStock };
  
      const product = await Product.create(productDetail);
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Server error",
        error,
      });
    }
  },
  
  getProducts: async (req, res) => {
    try {
      let { skip, take, search,filterKey,filterValue,isWebshopProduct,bestProduct,topProduct,popularProduct } = req.query;
      skip = parseInt(skip);
      take = parseInt(take);
      const myFieldDataExists = await Product.exists({ myField: { $exists: true, $ne: null } });

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
      if (filterKey && !filterValue) {
        query[filterKey] = { $exists: false };
      }

      if (filterKey && filterKey === "categories" && filterValue) {
        query[filterKey] = { $in: filterValue }; // Find products with categories in the filterValue array
      }

      if (isWebshopProduct === 'true' || isWebshopProduct === 'false') {
        query.isWebshopProduct = (isWebshopProduct === 'true');
      }

      if (bestProduct === 'true' || bestProduct === 'false') {
        query.bestProduct = (bestProduct === 'true');
      }

      if (topProduct === 'true' || topProduct === 'false') {
        query.topProduct = (topProduct === 'true');
      }

      if (popularProduct === 'true' || popularProduct === 'false') {
        query.popularProduct = (popularProduct === 'true');
      }


      const products = await Product.find(query).skip(skip).limit(take);
      const platformCount = await Product.aggregate([
        {
          $match: {
            platform: { $in: ["amazon", "bol.com"] }
          }
        },
        {
          $group: {
            _id: "$platform",
            count: { $sum: 1 }
          }
        }
      ])
      const totalCount = await Product.countDocuments(query);
      res.status(200).send({
        success: true,
        data: products, 
        count: totalCount,
        platformCount
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

  getAllProduct:async(req,res)=>{
    try {
      const allProducts = await Product.find({ 'stores.0': { $exists: true }});
      const stockedProduct = allProducts.filter(product => {
        const totalQty = product.stores.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
        return totalQty > 0;
      });
      res.status(200).send({
        success: true,
        data: stockedProduct,
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

  setCsvData: async (req, res) => {

    const editProductData = req.body; // Assuming this is an array of objects

    // Create bulk operations array with preprocessing in the map function
    const bulkOps = editProductData.map((product) => {
      // Preprocess the images field
      if (product.images && typeof product.images === 'string') {
        product.images = product.images.split(';');
      }

      return {
        updateOne: {
          filter: { ean: product.ean }, // Match the product by its ID
          update: { $set: product }    // Update the product with the new data
        }
      };
    });


    try {
      // Execute bulk operations
      const result = await Product.bulkWrite(bulkOps);

      // Check the result for success and failures
      if (result.nModified === editProductData.length) {
        res.status(200).send({ message: 'All products updated successfully' });
      } else {
        res.status(207).send({
          message: 'Some products were not updated',
          result
        });
      }
    } catch (error) {
      console.error('Bulk update failed:', error);
      res.status(500).send({ message: 'Bulk update failed', error });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      
      const idsArray = req.body.body._id;
      console.log("id",req.body.body,idsArray)
            await Product.deleteMany({ _id: { $in: idsArray } });      
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

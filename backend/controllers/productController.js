import csvtojson from "csvtojson";
import Product from "../models/product.js";
import Category from "../models/category.js";

export const products = {
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
        const { categories, subCategories, subSubCategories, selectedCategory, selectedSubCategory } = req.body;

        console.log('selectedSubCategory', categories, subCategories, subSubCategories, selectedCategory, selectedSubCategory);

        const updateObject = {};

        // Check if categories is an array
        if (Array.isArray(categories)) {
            const categoryItems = categories.map(cat => ({
                name: cat.name,
                image: cat.image,
                topCategory: cat.topCategory || false,
            }));
            updateObject['$push'] = {
                categories: { $each: categoryItems },
            };
        } else {
            console.error('Expected categories to be an array but got:', categories);
        }

        // Adding new subCategories to the selected category
        if (Array.isArray(subCategories) && selectedCategory!==undefined) {
         updateObject['$push'] = {
          [`categories.${selectedCategory}.subCategories`]: { $each: subCategories },
};
        }

        // Adding new subSubCategories to the selected subCategory
        if (Array.isArray(subSubCategories) && selectedCategory!==undefined && selectedSubCategory!==undefined) {
            updateObject['$push'] = {
                [`categories.${selectedCategory}.subCategories.${selectedSubCategory}.subSubCategories`]: { $each: subSubCategories },
            };
        }

        const result = await Category.updateOne(
            {},
            updateObject,
            {
                arrayFilters: [
                    { 'categories.name': selectedCategory }, // Filter for categories
                    { 'categories.subCategories.name': selectedSubCategory } // Filter for subCategories
                ],
                new: true,
                upsert: true
            }
        );

        res.status(200).json({ message: 'Categories added successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        console.error('Error in addCategory function:', error);
    }
},


editCategory : async (req, res) => {
  try {
      const {updatedFields } = req.body;
      const{id} =req.params;
console.log('updatedFields',updatedFields);
      // Prepare the update object dynamically based on the provided fields
      const updateObject = {};

      if (updatedFields.name !== undefined) {
          updateObject[`categories.${updatedFields.selectedCategory}.name`] = updatedFields.name;
          updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.name`] = updatedFields.name;
          updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.subSubCategories.${updatedFields.selectedSubSubCategory}.name`] = updatedFields.name;
      }
      if (updatedFields.image !== undefined) {
          updateObject[`categories.${updatedFields.selectedCategory}.image`] = updatedFields.image;
      }
      if (updatedFields.topCategory !== undefined) {
          updateObject[`categories.${updatedFields.selectedCategory}.topCategory`] = updatedFields.topCategory;
      }

      const result = await Category.findOneAndUpdate(
        {
          _id: id, // Look for the document by ID
        },
        {
          $set: updateObject,
        },
        {
          new: true,
        }
      );

      if (!result) {
          return res.status(404).json({ message: 'Category or subcategory not found' });
      }

      res.status(200).json({ message: 'Category updated successfully', result });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
      console.error('Error in editCategory function:', error);
  }
},



deleteCategory: async (req, res) => {
  try {
    const { selectedCategory, selectedSubCategory, selectedSubSubCategory } = req.body;
    const { id } = req.params;

    // Prepare the update object dynamically to remove the category or subcategories
    const updateObject = {};

    // If only the main category needs to be deleted
    if (selectedCategory !== undefined && selectedSubCategory === undefined && selectedSubSubCategory === undefined) {
      // Remove the entire category
      updateObject[`categories.${selectedCategory}`] = 1; // Marks the category for removal
    }

    // If only a subcategory needs to be deleted
    if (selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory === undefined) {
      // Remove the subcategory from the category
      updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}`] = 1; // Marks the subcategory for removal
    }

    // If a sub-subcategory needs to be deleted
    if (selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory !== undefined) {
      // Remove the sub-subcategory from the subcategory
      updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.subSubCategories.${selectedSubSubCategory}`] = 1; // Marks the sub-subcategory for removal
    }

    const result = await Category.findOneAndUpdate(
      { _id: id }, // Look for the document by ID
      {
        $unset: updateObject, // Use the $unset operator to remove the category or subcategory
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Category or subcategory not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    console.error('Error in deleteCategory function:', error);
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
      let { 
        skip, 
        take, 
        search, 
        filterKey, 
        filterValue, 
        isWebshopProduct, 
        bestProduct, 
        topProduct, 
        popularProduct,
        colors,
        price,
        categories,
        subCategories,
        subSubCategories
      } = req.query;
  
     
      // Convert skip and take to integers
      skip = parseInt(skip);
      take = parseInt(take);
  
      // Initialize the query object
      const query = {};
      console.log('Final Query:', req.query);
      // Handle search functionality
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
  
      // Handle filterKey and filterValue
      if (filterKey && !filterValue) {
        query[filterKey] = { $exists: false };
      }
  
      if (filterKey === "categories" && filterValue) {
        query[filterKey] = { $in: filterValue };
      }
  
      // Filter by Webshop product, Best product, Top product, and Popular product
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
  
      // Handle color and size filters
      if (colors) {
        // query.colors = { $regex: new RegExp(colors, "i") };
        query.colors =colors;
      }

      if (price) {
        const [minPrice, maxPrice] = price.split(','); // Assuming `size` is a string like "0,100"
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      }
  
      // Handle category, subCategory, and subSubCategory filtering
      if (categories || subCategories || subSubCategories) {
        query.$and = [];
        if (categories) {
          query.$and.push({ categories: { $in: categories.split(",") } });
        }
        if (subCategories) {
          query.$and.push({ subCategories: { $in: subCategories.split(",") } });
        }
        if (subSubCategories) {
          query.$and.push({ subSubCategories: { $in: subSubCategories.split(",") } });
        }
      }
  
      // Fetch the products based on the query
      const products = await Product.find(query).skip(skip).limit(take);
  
      // Get product counts grouped by platform (e.g., Amazon, bol.com)
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
      ]);
  
      // Get total count of products based on the query
      const totalCount = await Product.countDocuments(query);
  
      // Send the response
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
  getProductById: async (req, res) => {
    const { productIds } = req.query;
    try {
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
},

};

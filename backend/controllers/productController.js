import csvtojson from "csvtojson";
import Product from "../models/product.js";
import Category from "../models/category.js";
// import * as fs from 'fs';
// import * as fastcsv from 'fast-csv';
// import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
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

// --------------------OLD CODE----------------------------------------------
// editCategory : async (req, res) => {
//   try {
//       const {updatedFields } = req.body;

// console.log('updatedFields',updatedFields)
//       // Prepare the update object dynamically based on the provided fields
//       const updateObject = {};

//       if (updatedFields.name !== undefined) {
//           updateObject[`categories.${updatedFields.selectedCategory}.name`] = updatedFields.name;
//           updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.name`] = updatedFields.name;
//           updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.subSubCategories.${updatedFields.selectedSubSubCategory}.name`] = updatedFields.name;
//       }
//       if (updatedFields.image !== undefined) {
//           updateObject[`categories.${updatedFields.selectedCategory}.image`] = updatedFields.image;
//       }
//       if (updatedFields.topCategory !== undefined) {
//           updateObject[`categories.${updatedFields.selectedCategory}.topCategory`] = updatedFields.topCategory;
//       }

//       const result = await Category.findOneAndUpdate(
//         {
//           _id: updatedFields.id, // Look for the document by ID
//         },
//         {
//           $set: updateObject,
//         },
//         {
//           new: true,
//         }
//       );

//       if (!result) {
//           return res.status(404).json({ message: 'Category or subcategory not found' });
//       }

//       res.status(200).json({ message: 'Category updated successfully', result });
//   } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//       console.error('Error in editCategory function:', error);
//   }
// },
// -------------------------------OLD CODE-----------------------------------
editCategory: async (req, res) => {
  try {
    const { updatedFields } = req.body;

    console.log('updatedFields', updatedFields);

    // Prepare the update object dynamically based on the provided fields
    const updateObject = {};

    // If subSubCategory is selected, update only the subSubCategory name
    if (updatedFields.selectedSubSubCategory !== undefined) {
      updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.subSubCategories.${updatedFields.selectedSubSubCategory}.name`] = updatedFields.name;
    }
    // If subCategory is selected, update only the subCategory name
    else if (updatedFields.selectedSubCategory !== undefined) {
      updateObject[`categories.${updatedFields.selectedCategory}.subCategories.${updatedFields.selectedSubCategory}.name`] = updatedFields.name;
    }
    // Otherwise, update only the main category name
    else {
      updateObject[`categories.${updatedFields.selectedCategory}.name`] = updatedFields.name;
    }

    // Check if image is being updated (only for main category)
    if (updatedFields.image !== undefined) {
      updateObject[`categories.${updatedFields.selectedCategory}.image`] = updatedFields.image;
    }

    // Check if topCategory is being updated (only for main category)
    if (updatedFields.topCategory !== undefined) {
      updateObject[`categories.${updatedFields.selectedCategory}.topCategory`] = updatedFields.topCategory;
    }

    // Log the updateObject to see what's being sent to MongoDB
    console.log('Update object:', updateObject);

    // Perform the update in the database
    const result = await Category.findOneAndUpdate(
      { _id: updatedFields.id },  // Document lookup by ID
      { $set: updateObject },      // Applying the updates
      { new: true }                // Return the updated document
    );

    // If no result is found, return a 404 error
    if (!result) {
      return res.status(404).json({ message: 'Category or subcategory not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Category updated successfully', result });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: 'Server error', error });
    console.error('Error in editCategory function:', error);
  }
},



// deleteCategory: async (req, res) => {
//   try {
//     const { selectedCategory, selectedSubCategory, selectedSubSubCategory, id,removeImageOnly } = req.body;

//     // Prepare the update object dynamically to remove the category or subcategories
//     const updateObject = {};

//     // If only the image of the main category needs to be deleted
//     if (removeImageOnly && selectedCategory !== undefined && selectedSubCategory === undefined && selectedSubSubCategory === undefined) {
//       updateObject[`categories.${selectedCategory}.image`] = 1; // Marks the image for removal
//     }

//     // If only the image of a subcategory needs to be deleted
//     if (removeImageOnly && selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory === undefined) {
//       updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.image`] = 1; // Marks the image for removal
//     }

//     // If only the image of a sub-subcategory needs to be deleted
//     if (removeImageOnly && selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory !== undefined) {
//       updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.subSubCategories.${selectedSubSubCategory}.image`] = 1; // Marks the image for removal
//     }

//     // If the entire category, subcategory, or sub-subcategory needs to be deleted
//     if (!removeImageOnly) {
//       // If only the main category needs to be deleted
//       if (selectedCategory !== undefined && selectedSubCategory === undefined && selectedSubSubCategory === undefined) {
//         updateObject[`categories.${selectedCategory}`] = 1; // Marks the category for removal
//         updateObject[`categories.${selectedCategory}.image`] = 1; // Marks the image for removal
//       }

//       // If only a subcategory needs to be deleted
//       if (selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory === undefined) {
//         updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}`] = 1; // Marks the subcategory for removal
//         updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.image`] = 1; // Marks the image for removal
//       }

//       // If a sub-subcategory needs to be deleted
//       if (selectedCategory !== undefined && selectedSubCategory !== undefined && selectedSubSubCategory !== undefined) {
//         updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.subSubCategories.${selectedSubSubCategory}`] = 1; // Marks the sub-subcategory for removal
//         updateObject[`categories.${selectedCategory}.subCategories.${selectedSubCategory}.subSubCategories.${selectedSubSubCategory}.image`] = 1; // Marks the image for removal
//       }
//     }

//     const result = await Category.findOneAndUpdate(
//       { _id: id }, // Look for the document by ID
//       {
//         $unset: updateObject, // Use the $unset operator to remove the image or category
//       },
//       { new: true }
//     );

//     if (!result) {
//       return res.status(404).json({ message: 'Category or subcategory not found' });
//     }

//     res.status(200).json({ message: 'Category updated successfully', result });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//     console.error('Error in deleteCategory function:', error);
//   }
// },

deleteCategory: async (req, res) => {
  try {
    const { id, categoryId, removeImageOnly } = req.body;

    if (!id || !categoryId) {
      return res.status(400).json({ message: "Category document ID and category ID are required" });
    }

    // Remove only the image
    if (removeImageOnly) {
      const updateResult = await Category.updateOne(
        { _id: id, "categories._id": categoryId },
        { $set: { "categories.$.image": "" } }
      );

      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "Category or image not found" });
      }

      return res.status(200).json({ message: "Image removed successfully" });
    }

    // Find the document first to identify where the categoryId exists (category, subcategory, or sub-subcategory)
    const categoryDocument = await Category.findById(id);
    if (!categoryDocument) {
      return res.status(404).json({ message: "Category document not found" });
    }

    let updated = false;

    // First, try to remove the category
    const categoryUpdateResult = await Category.updateOne(
      { _id: id },
      { $pull: { categories: { _id: categoryId } } }
    );

    if (categoryUpdateResult.modifiedCount > 0) {
      updated = true;
    } else {
      // If not a main category, check and remove from subcategories
      const subcategoryUpdateResult = await Category.updateOne(
        { _id: id, "categories.subCategories._id": categoryId },
        { $pull: { "categories.$[].subCategories": { _id: categoryId } } }
      );

      if (subcategoryUpdateResult.modifiedCount > 0) {
        updated = true;
      } else {
        // If not a subcategory, check and remove from sub-subcategories
        const subSubcategoryUpdateResult = await Category.updateOne(
          { _id: id, "categories.subCategories.subSubCategories._id": categoryId },
          { $pull: { "categories.$[].subCategories.$[].subSubCategories": { _id: categoryId } } }
        );

        if (subSubcategoryUpdateResult.modifiedCount > 0) {
          updated = true;
        }
      }
    }

    if (!updated) {
      return res.status(404).json({ message: "Category, subcategory, or sub-subcategory not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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

  // getProductColors: async (req, res) => {
  //   const { query } = req.query; // Get the search query from the request
  //   try {
  //     const products = await Product.find({}, 'colors');
  
  //     let allColors = [];
  //     products.forEach((product) => {
  //       if (typeof product.colors === 'string') {
  //         allColors = allColors.concat(product.colors.split(',').map(color => color.trim()));
  //       } else if (Array.isArray(product.colors)) {
  //         allColors = allColors.concat(product.colors);
  //       }
  //     });
  
  //     const uniqueColors = [...new Set(allColors)];
      
  //     // Filter colors that match the query
  //     const filteredColors = uniqueColors.filter(color => 
  //       color.toLowerCase().startsWith(query.toLowerCase())
  //     );
  
  //     res.json(filteredColors); // Return filtered colors
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Server Error');
  //   }
  // },   
  
  getProductColors: async (req, res) => {
    const { query } = req.query; // Get the search query from the request
    try {
      const products = await Product.find({}, 'colors');
    
      let allColors = [];
      products.forEach((product) => {
        if (typeof product.colors === 'string') {
          allColors = allColors.concat(product.colors.split(',').map(color => color.trim()));
        } else if (Array.isArray(product.colors)) {
          allColors = allColors.concat(product.colors);
        }
      });
      
      // Normalize all color names to lowercase
      const uniqueColors = [...new Set(allColors.map(color => color.toLowerCase()))];
  
      // Filter colors that match the query (case-insensitive)
      // const filteredColors = uniqueColors.filter(color => 
      //   color.startsWith(query.toLowerCase())
      // );
      const filteredColors = uniqueColors.filter(color => {
        if (query) {
          return color.startsWith(query.toLowerCase());
        } else {
          return true; // Return all colors if no query is provided
        }
      });
  
      res.json(filteredColors); // Return filtered colors
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },
  
  // getProducts: async (req, res) => {
  //   try {
  //     let { 
  //       skip, 
  //       take, 
  //       search, 
  //       filterKey, 
  //       filterValue, 
  //       isWebshopProduct, 
  //       bestProduct, 
  //       topProduct, 
  //       popularProduct,
  //       colors,
  //       price,
  //       categories,
  //       subCategories,
  //       subSubCategories
  //     } = req.query;
  
     
  //     // Convert skip and take to integers
  //     skip = parseInt(skip);
  //     take = parseInt(take);
  
  //     // Initialize the query object
  //     const query = {};
  //     console.log('Final Query:', req.query);
  //     // Handle search functionality
  //     if (search) {
  //       const searchNumber = parseInt(search);
  //       if (!isNaN(searchNumber)) {
  //         query.$or = [
  //           { title: { $regex: new RegExp(search, "i") } },
  //           { barcode: { $regex: new RegExp(search, "i") } },
  //           { scanCode: { $regex: new RegExp(search, "i") } },
  //           { supplierRef: { $regex: new RegExp(search, "i") } },
  //           { brand: { $regex: new RegExp(search, "i") } },
  //           { supplier: { $regex: new RegExp(search, "i") } },
  //           { ean: { $regex: new RegExp(search, "i") } },
  //           { sku: searchNumber },
  //           { 'stores.location': { $regex: new RegExp(search, "i") } }
  //         ];
  //       } else {
  //         query.$or = [
  //           { title: { $regex: new RegExp(search, "i") } },
  //           { barcode: { $regex: new RegExp(search, "i") } },
  //           { scanCode: { $regex: new RegExp(search, "i") } },
  //           { supplierRef: { $regex: new RegExp(search, "i") } },
  //           { brand: { $regex: new RegExp(search, "i") } },
  //           { supplier: { $regex: new RegExp(search, "i") } },
  //           { ean: { $regex: new RegExp(search, "i") } },
  //           { 'stores.location': { $regex: new RegExp(search, "i") } }
  //         ];
  //       }
  //     }
  
  //     // Handle filterKey and filterValue
  //     if (filterKey && !filterValue) {
  //       query[filterKey] = { $exists: false };
  //     }
  
  //     if (filterKey === "categories" && filterValue) {
  //       query[filterKey] = { $in: filterValue };
  //     }
  
  //     // Filter by Webshop product, Best product, Top product, and Popular product
  //     if (isWebshopProduct === 'true' || isWebshopProduct === 'false') {
  //       query.isWebshopProduct = (isWebshopProduct === 'true');
  //     }
  //     if (bestProduct === 'true' || bestProduct === 'false') {
  //       query.bestProduct = (bestProduct === 'true');
  //     }
  //     if (topProduct === 'true' || topProduct === 'false') {
  //       query.topProduct = (topProduct === 'true');
  //     }
  //     if (popularProduct === 'true' || popularProduct === 'false') {
  //       query.popularProduct = (popularProduct === 'true');
  //     }
  
  //     // Handle color and size filters
  //     if (colors) {
  //       // query.colors = { $regex: new RegExp(colors, "i") };
  //       query.colors =colors;
  //     }

  //     if (price) {
  //       const [minPrice, maxPrice] = price.split(','); // Assuming `size` is a string like "0,100"
  //       query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  //     }
  
  //     // Handle category, subCategory, and subSubCategory filtering
  //     if (categories || subCategories || subSubCategories) {
  //       query.$and = [];
  //       if (categories) {
  //         query.$and.push({ categories: { $in: categories.split(",") } });
  //       }
  //       if (subCategories) {
  //         query.$and.push({ subCategories: { $in: subCategories.split(",") } });
  //       }
  //       if (subSubCategories) {
  //         query.$and.push({ subSubCategories: { $in: subSubCategories.split(",") } });
  //       }
  //     }
  
  //     // Fetch the products based on the query
  //     const products = await Product.find(query).skip(skip).limit(take);
  
  //     // Get product counts grouped by platform (e.g., Amazon, bol.com)
  //     const platformCount = await Product.aggregate([
  //       {
  //         $match: {
  //           platform: { $in: ["amazon", "bol.com"] }
  //         }
  //       },
  //       {
  //         $group: {
  //           _id: "$platform",
  //           count: { $sum: 1 }
  //         }
  //       }
  //     ]);
  
  //     // Get total count of products based on the query
  //     const totalCount = await Product.countDocuments(query);
  
  //     // Send the response
  //     res.status(200).send({
  //       success: true,
  //       data: products,
  //       count: totalCount,
  //       platformCount
  //     });
  
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({
  //       success: false,
  //       message: "Server error",
  //       error: error.message,
  //     });
  //   }
  // },

  getProducts: async (req, res) => {
    try {
      let {
        skip = 0,
        take = 10,
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
        subSubCategories,
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
        const searchRegex = { $regex: new RegExp(search, "i") };
        query.$or = [
          { title: searchRegex },
          { barcode: searchRegex },
          { scanCode: searchRegex },
          { supplierRef: searchRegex },
          { brand: searchRegex },
          { supplier: searchRegex },
          { ean: searchRegex },
          { 'stores.location': searchRegex },
        ];
  
        if (!isNaN(searchNumber)) {
          query.$or.push({ sku: searchNumber });
        }
      }
  
      // Handle filtering by key and value
      if (filterKey) {
        if (filterValue) {
          query[filterKey] = { $in: filterValue };
        } else {
          query[filterKey] = { $exists: false };
        }
      }
  
      // Webshop product, best product, top product, and popular product filters
      if (isWebshopProduct !== undefined) {
        query.isWebshopProduct = isWebshopProduct === 'true';
      }
      if (bestProduct !== undefined) {
        query.bestProduct = bestProduct === 'true';
      }
      if (topProduct !== undefined) {
        query.topProduct = topProduct === 'true';
      }
      if (popularProduct !== undefined) {
        query.popularProduct = popularProduct === 'true';
      }
  
      // Handle color filtering - case insensitive
      if (colors) {
        const colorArray = colors.split(",").map(color => new RegExp(color, "i")); // Create case-insensitive regex for each color
        query.colors = { $in: colorArray };
      }
  
      // Handle price range filter
      if (price) {
        const [minPrice, maxPrice] = price.split(',');
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      }
  
      // Handle category, subCategory, and subSubCategory filtering
      const categoryFilters = [];
      if (categories) {
        categoryFilters.push({ categories: { $in: categories.split(",") } });
      }
      if (subCategories) {
        categoryFilters.push({ subCategories: { $in: subCategories.split(",") } });
      }
      if (subSubCategories) {
        categoryFilters.push({ subSubCategories: { $in: subSubCategories.split(",") } });
      }
  
      if (categoryFilters.length > 0) {
        query.$and = categoryFilters;
      }
  
      // Fetch the products based on the query
      const products = await Product.find(query).skip(skip).limit(take);
  
      // Get product counts grouped by platform (e.g., Amazon, bol.com)
      const platformCount = await Product.aggregate([
        {
          $match: {
            platform: { $in: ["amazon", "bol.com"] },
          },
        },
        {
          $group: {
            _id: "$platform",
            count: { $sum: 1 },
          },
        },
      ]);
  
      // Get total count of products based on the query
      const totalCount = await Product.countDocuments(query);
  
      // Send the response
      return res.status(200).json({
        success: true,
        data: products,
        count: totalCount,
        platformCount,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
  
  

  // getAllProduct: async (req, res) => {
  //   try {
  //     const allProducts = await Product.find({ 'stores.0': { $exists: true } });
  //     const stockedProduct = allProducts.filter(product => {
  //       const totalQty = product.stores.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
  //       return totalQty > 0;
  //     });
  
  //     // Format the product data for CSV
  //     const csvData = stockedProduct.map(item => {
  //       const storeInfo = item.stores.map(store => {
  //         return `Location: ${store.location}, Quantity: ${store.qty}, Laps: ${store.laps}`;
  //       }).join('\n');
  //       return {
  //         Title: item.title || "",
  //         EanBarcode: item.ean || "",
  //         Price: item.price || "", 
  //         TotalStock: item.stores.reduce((total, store) => total + parseInt(store.qty), 0) || "",
  //         SellingPrice: item.minSellingPrice || "",
  //         SupplierRef: item.supplierRef || "",
  //         Platform: item.platform || "",
  //         StoreInfo: storeInfo,
  //         Image: item.images || "",
  //         Sku: item.sku || "",
  //         Language: item.language || "",
  //         Categories: item.categories || "",
  //         SubCategories: item.subCategories || "",
  //         SubSubCategories: item.subSubCategories || "",
  //         Tags: item.tags || "",
  //         Weight: item.weight || "",
  //         TaxValue: item.taxValue || "",
  //         Brand: item.brand || "",
  //         Supplier: item.supplier || "",
  //         ScanCode: item.scanCode || "",
  //         PurchasePrice: item.purchasePrice || "",
  //         Colors: item.colors || "",
  //         Size: item.size || "",
  //       };
  //     });
  // // console.log('csvData',csvData)
  //     // Set CSV headers
  //     res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
  //     res.setHeader('Content-Type', 'text/csv');
  
  //     // Create a writable stream and write the CSV data
  //   //  await fastcsv
  //   //     .write(csvData, { headers: true })
  //   //     .pipe(res); // Stream the CSV directly to the response
  //   const csvFile = path.resolve(__dirname, 'products.csv');
  //   const csvStream = fastcsv.format({ headers: true });
    
  //   csvStream.write(csvData);
  //   csvStream.pipe(fs.createWriteStream(csvFile, { encoding: 'utf8' } ))
  //   csvStream.end();
  //   return `Finished writing data to: ${csvFile}`;
  //   // fast_csv.end()

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({
  //       success: false,
  //       message: "Server error",
  //       error: error.message,
  //     });
  //   }
  // },

  getAllProduct: async (req, res) => {
    try {
      // Extract the query from the request
      const { isWebshopProduct } = req.query;
  
      // Build the query object dynamically based on the presence of isWebshopProduct
      const query = { 'stores.0': { $exists: true } };
      
      // If isWebshopProduct is provided, add it to the query
      if (isWebshopProduct) {
        query.isWebshopProduct = isWebshopProduct === 'true'; // Convert string to boolean
      }
  
      // Fetch products based on the query
      const allProducts = await Product.find(query);
  
      // Filter out products with total quantity > 0
      const stockedProduct = allProducts.filter(product => {
        const totalQty = product.stores.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
        return totalQty > 0;
      });
  
      // Send the response
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
//   getProductById: async (req, res) => {
//     const { productIds } = req.query;
//     try {
//         const products = await Product.find({ _id: { $in: productIds } });

//         if (products.length === 0) {
//             return res.status(404).json({ message: "No products found" });
//         }

//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products" });
//     }
// },

getProductById: async (req, res) => {
  const { productIds } = req.query;

  try {
      const idsArray = productIds.split(','); // Assuming productIds is a comma-separated string
      const products = await Product.find({ _id: { $in: idsArray } });

      if (products.length === 0) {
          return res.status(404).json({ message: "No products found" });
      }

      res.status(200).json(products);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
  }
}


};

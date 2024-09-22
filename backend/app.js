import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import bodyParser from 'body-parser';
import userRout from "./routes/user.js";
import connectDB from "./config/db.js";
import Product from "./models/product.js";
import {data} from "./categorys.js";
import Category from "./models/category.js";
import cartRout from "./routes/cart.js";
import enquiryRoutes from "./routes/enquiry.js";
import paymentRoutes from "./routes/payment.js";
import settingsRoutes from "./routes/emailSettingRoute.js";
const app = express()
dotenv.config() 

// const callback = async () => {
//     try { 
//       // Find products where the supplier is in the list and the stores array exists and is not empty
//       const productsWithStores = await Product.aggregate([
//         {
//           $match: {
//             supplier: { $in: suppliers },
//             stores: { $exists: true, $ne: [] }
//           }
//         },
//         {
//           $addFields: {
//             totalStock: {
//               $sum: {
//                 $map: {
//                   input: "$stores",
//                   as: "item",
//                   in: {
//                     $subtract: [
//                       {
//                         $convert: {
//                           input: "$$item.qty",
//                           to: "int",
//                           onError: 0, // Default value if conversion fails
//                           onNull: 0   // Default value if input is null
//                         }
//                       },
//                       {
//                         $convert: {
//                           input: "$$item.laps",
//                           to: "int",
//                           onError: 0, // Default value if conversion fails
//                           onNull: 0   // Default value if input is null
//                         }
//                       }
//                     ]
//                   }
//                 }
//               }
//             }
//           }
//         },
//         {
//           $match: {
//             totalStock: { $eq: 0 }
//           }
//         },
//         {
//           $project: { _id: 1 } // Only project the _id field
//         }
//       ]);
  
//       // Find products where the supplier is in the list and the stores array does not exist
//       const productsWithoutStores = await Product.find({
//         supplier: { $in: suppliers },
//         stores: { $exists: false }
//       }).select('_id'); // Only select the _id field
  
//       // Combine the two sets of product IDs
//       const productIdsToDelete = [
//         ...productsWithStores.map(product => product._id),
//         ...productsWithoutStores.map(product => product._id)
//       ];
  
//       if (productIdsToDelete.length > 0) {
//         const deleteResult = await Product.deleteMany({ _id: { $in: productIdsToDelete } });
//         console.log(`Deleted ${deleteResult.deletedCount} products`);
//       } else {
//         console.log('No products to delete');
//       }
//     } catch (error) {
//       console.error('Error deleting products:', error);
//     }
//   };
// const calculateTotalQuantity = (data) => {
//     let totalQuantity = 0;
//     if (data) {
//       for (const item of data) {
//         const qty = parseInt(item.qty) || 0;
//         const laps = parseInt(item.laps) || 0;
//         totalQuantity += qty - laps;
//       }
//     }
//     return totalQuantity;
//   };


//  async function updateTotalStock() {
//   try {
//     // Fetch all products
//     const products = await Product.find();

//     // Iterate over each product and calculate totalStock
//     for (const product of products) {
//       product.totalStock = calculateTotalQuantity(product.stores); // Adjust based on your fields
      
//       // Log the product before saving
//       console.log('Updating product:', product._id, 'with totalStock:', product.totalStock);
      
//       // Ensure purchasePrice is a number before saving
//       product.purchasePrice = product.purchasePrice || 0;
      
//       try {
//         await product.save();
//       } catch (saveError) {
//         console.error('Error saving product:', product._id, saveError);
//       }
//     }

//     console.log('Total stock updated successfully for all products');
//   } catch (error) {
//     console.error('Error updating total stock:', error);
//   }
// }
  
//   const connectDB = async (callback) => {
//     try {
//       await mongoose.connect(process.env.DATABASE_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("DB connected");
//       callback();
//     } catch (error) {
//       console.log("DB connection error", error);
//     }
//   };

// Call the function
// updateTotalStock();


// connectDB(updateTotalStock);

// const callback = async () => {
//     try {
//       // Iterate over each correction entry
//       for (const correction of data) {
//         const { "current ean": currentEan, "correct ean": correctEan, "correct scancode": correctScancode } = correction;
  
//         // Update the document where ean matches current ean
//         await Product.updateMany(
//           { ean: currentEan },
//           {
//             $set: {
//               ean: correctEan,
//               scanCode: correctScancode
//             }
//           }
//         );
//       }
  
//       console.log("Products updated successfully");
  
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

// const callback= async () => {
//     try{
//     await Product.updateMany(
//         {}, // No filter, so it updates all documents
//     { $set: { popularProduct: false } }
//      )
//     }
//     catch (error) {
//       console.error("Error:", error);
//     }
// }
// connectDB(callback);




// const callback = async () => {
//     try {
//         for (const entry of data) {
//             const { categories, subCategories, subSubCategories } = entry;

//             // Check if the category already exists
//             const category = await Category.findOne({
//                 'categories.name': categories
//             });

//             if (category) {
//                 // Category exists, check if the subCategory already exists
//                 const existingSubCategory = category.categories.find(cat => cat.name === categories)
//                     .subCategories.find(subCat => subCat.name === subCategories);

//                 if (existingSubCategory) {
//                     // SubCategory exists, check if the subSubCategory exists
//                     if (subSubCategories && !existingSubCategory.subSubCategories.some(subSub => subSub.name === subSubCategories)) {
//                         // Add the subSubCategory if it doesn't already exist
//                         await Category.updateOne(
//                             {
//                                 _id: category._id,
//                                 'categories.name': categories,
//                                 'categories.subCategories.name': subCategories
//                             },
//                             {
//                                 $addToSet: {
//                                     'categories.$[categoryElem].subCategories.$[subCatElem].subSubCategories': { name: subSubCategories }
//                                 }
//                             },
//                             {
//                                 arrayFilters: [
//                                     { 'categoryElem.name': categories },
//                                     { 'subCatElem.name': subCategories }
//                                 ]
//                             }
//                         );
//                     }
//                 } else {
//                     // SubCategory doesn't exist, add it along with the subSubCategory
//                     await Category.updateOne(
//                         {
//                             _id: category._id,
//                             'categories.name': categories
//                         },
//                         {
//                             $addToSet: {
//                                 'categories.$.subCategories': {
//                                     name: subCategories,
//                                     subSubCategories: subSubCategories ? [{ name: subSubCategories }] : []
//                                 }
//                             }
//                         }
//                     );
//                 }
//             } else {
//                 // Category doesn't exist, create it with subCategories and subSubCategories
//                 await Category.updateOne(
//                     {},
//                     {
//                         $push: {
//                             categories: {
//                                 name: categories,
//                                 image: '', // or provide a default value
//                                 topCategory: false,
//                                 subCategories: subCategories ? [{
//                                     name: subCategories,
//                                     subSubCategories: subSubCategories ? [{ name: subSubCategories }] : []
//                                 }] : []
//                             }
//                         }
//                     },
//                     { upsert: true, new: true }
//                 );
//             }
//         }

//         console.log('Database updated successfully');
//     } catch (error) {
//         console.error('Error updating database:', error);
//     }
// };

connectDB();

const port = process.env.PORT

app.use(express.json({limit : "10mb"}))
app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json (if needed)
app.use(bodyParser.json());

// app.use(morgan("dev"))
app.use('/',userRout);
app.use("/cart",cartRout);
app.use("/enquiry",enquiryRoutes);
app.use("/payment",paymentRoutes);
app.use("/setting",settingsRoutes);


app.listen(port,'0.0.0.0', ()=>{
    console.log(`server connected ${port}`);
}) 
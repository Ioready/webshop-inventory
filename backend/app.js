import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import userRout from "./routes/user.js";
import connectDB from "./config/db.js";
// import {data} from "./8pyff-qme8y.js";
// import Product from "./models/product.js";

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


connectDB();
const port = process.env.PORT 

app.use(express.json({limit : "10mb"}))
app.use(cors())
// app.use(morgan("dev"))
app.use('/',userRout);

app.listen(port,'0.0.0.0', ()=>{
    console.log(`server connected ${port}`);
})
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  categories: {
    type: [String],
  },
  subCategories: {
    type: [String],
  },
  subSubCategories: {
    type: [String],
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
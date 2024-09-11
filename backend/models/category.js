import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categories: [{
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    topCategory: {
      type: Boolean,
      default: false,
    },
    subCategories: [{
      name: {
        type: String,
        required: true,
      },
      subSubCategories: [{
        name: {
          type: String,
          required: true,
        }
      }]
    }]
  }]
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

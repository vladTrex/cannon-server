import Product from '../models/Product';

export default {
  PremiumProduct: {
    __resolveType: (parent) =>
      parent.category === "group" ? "Group" : "Business",
  },
  Product: {
    __resolveType(obj) {
      if (obj.category === "personal") {
        return "Personal";
      }

      if (obj.category === "business") {
        return "Business";
      }

      if (obj.category === "group") {
        return "Group";
      }

      return null;
    },
  },
  AllowedCategories: {
    BUSINESS: "business",
    PERSONAL: "personal",
    GROUP: "group",
  },
  Query: {
    products: async () => {
      return await Product.find({});
    },
    allPremiumProducts: async () => {
      const products = await Product.find({});

      return products.filter((product) => product.category !== "personal");
    },
    product: async (_, args) => {
      const { id } = args;
      return await Product.findOne({ _id: id });
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      const { input } = args;
      const newProduct = new Product(input);

      return await newProduct.save();
    },
    updateProduct: async (_, args) => {
      const { productId, input } = args;
      const res = await Product.findOneAndUpdate({ _id: productId }, input, {
        new: true,
        upsert: true,
        rawResult: true,
      });
      return res.value;
    },
    removeProduct: async (_, args) => {
      const { productId } = args;

      await Product.findOneAndDelete({ _id: productId });

      return { success: true };
    },
  }
};

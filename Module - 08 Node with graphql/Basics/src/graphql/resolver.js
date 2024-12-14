import { products } from "../data/products.js";

const resolvers = {
  Query: {
    // Getting products
    products: () => products,

    // Get single product
    product: (_, { id }) => products.find((item) => item.id === id),
  },

  Mutation: {
    createProduct: (_, { title, category, price, inStock }) => {
      const newlyCreatedProduct = {
        id: String(products.length + 1),
        title,
        category,
        price,
        inStock,
      };

      products.push(newlyCreatedProduct);
      return newlyCreatedProduct;
    },

    deleteProduct: (_, { id }) => {
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) return false;

      products.splice(index, 1);

      return true;
    },
  },
};

export default resolvers;

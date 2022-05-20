const { ApolloServer, gql } = require("apollo-server");
const productController = require("./controller/productController");

const typeDefs = gql`
  type product {
    id: Int
    title: String
    T_number: Int
    color: String
    price: Int
    size: String
    amount: Int
    category: String
    imgURL: String
    descripiton: String
  }

  type productList {
    products: [product]
    nextPage: Int
  }

  type Query {
    productList(paging: Int, pageSize: Int, category: String): productList
    product(T_number: Int): product
  }

  type createProduct {
    product: product
    insertID: Int
  }

	type updateProduct {
		product: product
		insertID: Int
	}

  input productInfo {
    id: Int
    title: String
    T_number: Int
    color: String
    price: Int
    size: String
    amount: Int
    category: String
    imgURL: String
    descripiton: String
  }

  type Mutation {
    createProduct(input: productInfo): createProduct
		updateProduct(input: productInfo, id: Int): updateProduct
  }
`;

const resolvers = {
  Query: {
    productList(parent, args) {
      return productController.productList(
        args.paging,
        args.pageSize,
        args.category
      );
    },
    product(parent, args) {
      return productController.product(args.T_number);
    },
  },
  Mutation: {
    createProduct(parent, args) {
      const productInfo = {
        title: args.input.title,
        T_number: args.input.T_number,
        color: args.input.color,
        size: args.input.size,
        price: args.input.price,
        amount: args.input.amount,
        category: args.input.category,
        descripiton: args.input.descripiton,
        imgURL: args.input.imgURL,
      };
      const insertID = productController.createProduct(productInfo);
      return { product: productInfo, insertID: insertID };
    },
		updateProduct(parent, args) {
      const productInfo = {
        title: args.input.title,
        T_number: args.input.T_number,
        color: args.input.color,
        size: args.input.size,
        price: args.input.price,
        amount: args.input.amount,
        category: args.input.category,
        descripiton: args.input.descripiton,
        imgURL: args.input.imgURL,
      };
      const insertID = productController.updateProduct(productInfo, args.id);
      return { product: productInfo, insertID: insertID };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(
    `🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀  Server ready at ${url} 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`
  );
});

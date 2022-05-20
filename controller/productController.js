const productModel = require("../model/productModel");

async function productList(paging, pageSize, category) {
  const productList = await productModel.productList(
    paging || 0,
    pageSize || 6,
    category
  );
  return productList;
}

async function product(T_number) {
  const product = await productModel.product(T_number);
  console.log(product);
  return product;
}


async function createProduct (productInfo){
    const insertID = await productModel.createProduct(productInfo)
    return insertID
}

async function updateProduct (productInfo, id){
    const insertID = await productModel.updateProduct(productInfo, id)
    return insertID
}


module.exports = {
  productList,
  product,
  createProduct,
  updateProduct
};

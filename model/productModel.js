let { pool: pool } = require("../util/db");

async function productList(paging, pageSize, category) {
  try {
    const [products] = await pool.query(
      "SELECT * FROM product WHERE category = ? LIMIT ?, ?",
      [category, pageSize * paging, pageSize]
    );

    if (products.length === 0) console.log("productList is empty");

    const [nextPage] = await pool.query(
      "SELECT * FROM product WHERE category = ? LIMIT ?, ?",
      [category, pageSize * (paging + 1), pageSize]
    );

    if (nextPage.length === 0) return { products: products };
    else {
      return { products: products, nextPage: paging + 1 };
    }
  } catch (error) {
    console.log(error);
  }
}

async function product(T_number) {
  try {
    const [product] = await pool.query(
      "SELECT * FROM product WHERE T_number = ?",
      [T_number]
    );
    return product[0];
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(productInfo) {
  try {
    const [result] = await pool.query(
      "INSERT INTO product SET title = ?, T_number = ?, color = ?, price = ?, size = ?, amount = ?, category = ?, descripiton = ? , imgURL = ?",
      [
        productInfo.title,
        productInfo.T_number,
        productInfo.color,
        productInfo.size,
        productInfo.price,
        productInfo.amount,
        productInfo.category,
        productInfo.descripiton,
        productInfo.imgURL,
      ]
    );
    return result.insertId;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function updateProduct(productInfo, id) {
  try {
    if (productInfo.T_number !== undefined)
      result = await pool.query(
        "UPDATE product SET T_number = ? WHERE id = ?",
        [productInfo.T_number, id]
      );
    if (productInfo.color !== undefined)
      result = await pool.query("UPDATE product SET color = ? WHERE id = ?", [
        productInfo.color,
        id,
      ]);
    if (productInfo.size !== undefined)
      result = await pool.query("UPDATE product SET size = ? WHERE id = ?", [
        productInfo.size,
        id,
      ]);
    if (productInfo.price !== undefined)
      result = await pool.query("UPDATE product SET price = ? WHERE id = ?", [
        productInfo.price,
        id,
      ]);
    if (productInfo.amount !== undefined)
      result = await pool.query("UPDATE product SET amount = ? WHERE id = ?", [
        productInfo.amount,
        id,
      ]);
    if (productInfo.category !== undefined)
      result = await pool.query(
        "UPDATE product SET category = ? WHERE id = ?",
        [productInfo.category, id]
      );
    if (productInfo.descripiton !== undefined)
      result = await pool.query(
        "UPDATE product SET descripiton = ? WHERE id = ?",
        [productInfo.descripiton, id]
      );
    if (productInfo.imgURL !== undefined)
      result = await pool.query("UPDATE product SET imgURL = ? WHERE id = ?", [
        productInfo.imgURL,
        id,
      ]);
    if (productInfo.title !== undefined) {
      result = await pool.query("UPDATE product SET title = ? WHERE id = ?", [
        productInfo.title,
        id,
      ]);
    }
    console.log(result[0].insertId);

    return result[0].insertId;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  productList,
  product,
  createProduct,
  updateProduct,
};

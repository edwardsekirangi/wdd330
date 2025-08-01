import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product");
console.log("Product ID:", productID);

const product = new ProductDetails(productID, dataSource);
product.init();
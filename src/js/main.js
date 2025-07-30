import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
//New instance of ProductData and we passing in a category of tents
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

//New instance of ProductList
const tentList = new ProductList("tents", dataSource, listElement);
tentList.init(); //Call an initialization method to fetch and render the list

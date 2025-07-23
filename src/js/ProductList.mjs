import { renderListWithTemplate } from "./utils.mjs";

//Template literal function
export function productTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <h2>${product.Name}</h2>
          <img src="${product.Image}" alt="${product.Name}" />
          <p class="product-description">${product.Description}</p>
          <p class="product-price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
}


export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    async init() {
        //We are awaiting a promise
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
}
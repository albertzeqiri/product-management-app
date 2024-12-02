document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("product-form");
  const productName = document.getElementById("product-name");
  const productCategory = document.getElementById("product-category");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");
  const productList = document.getElementById("product-list");
  const search = document.getElementById("search");

  productForm.addEventListener("submit", addProduct);
  productList.addEventListener("click", removeProduct);
  search.addEventListener("input", filterProducts);

  function addProduct(e) {
    e.preventDefault();

    const name = productName.value;
    const category = productCategory.value;
    const price = productPrice.value;
    const image = productImage.value;

    const product = { name, category, price, image };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    renderProducts(products);

    productForm.reset();
  }

  function removeProduct(e) {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(products);
    }
  }

  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ${product.price}</p>
                <button class="delete" data-index="${index}">Delete product</button>
            `;
      productList.appendChild(productDiv);
    });
  }

  function filterProducts(e) {
    const text = e.target.value.toLowerCase();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text)
      );
    });
    renderProducts(filtered);
  }

  renderProducts(JSON.parse(localStorage.getItem("products")) || []);
});

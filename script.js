const products = [];

const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const addProductButton = document.getElementById('addProduct');
const productList = document.getElementById('productList');

addProductButton.addEventListener('click', () => {
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    const image = productImageInput.files[0];

    if (name && !isNaN(price) && image) {
        const registrationTime = new Date().toLocaleTimeString();
        addProduct(name, price, registrationTime, image);
        productNameInput.value = '';
        productPriceInput.value = '';
        productImageInput.value = null; // Clear the file input
        displayProducts();
    }
});

function addProduct(name, price, time, image) {
    const product = { name, price, time, image };
    products.push(product);
}

function displayProducts() {
    productList.innerHTML = '';

    products.forEach((product) => {
        const listItem = document.createElement('li');
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(product.image);
        imageElement.alt = product.name + " image";
        imageElement.classList.add('product-image');
        
        listItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Registered at ${product.time}</p>
        `;

        listItem.appendChild(imageElement);

        productList.appendChild(listItem);
    });
}
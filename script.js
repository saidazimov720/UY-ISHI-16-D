const productList = document.getElementById('productList');
const loadProductsButton = document.getElementById('loadProducts');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addProductButton = document.getElementById('addProduct');
const deleteProductSelect = document.getElementById('deleteProduct');
const deleteSelectedProductButton = document.getElementById('deleteSelectedProduct');
const totalSumDisplay = document.getElementById('totalSum');

const products = [];

loadProductsButton.addEventListener('click', () => {
    displayProducts();
    updateTotalSum();
});

addProductButton.addEventListener('click', () => {
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    if (name && !isNaN(price)) {
        const registrationTime = new Date().toLocaleTimeString(); // Get the current time
        addProduct(name, price, registrationTime);
        productNameInput.value = '';
        productPriceInput.value = '';
        displayProducts();
        updateTotalSum();
    }
});

deleteSelectedProductButton.addEventListener('click', () => {
    const selectedIndex = deleteProductSelect.selectedIndex;
    if (selectedIndex !== -1) {
        deleteProduct(selectedIndex);
        displayProducts();
        updateTotalSum();
    }
});

function addProduct(name, price, time) {
    const product = { name, price, time };
    products.push(product);
}

function deleteProduct(index) {
    products.splice(index, 1);
}

function displayProducts() {
    productList.innerHTML = '';
    deleteProductSelect.innerHTML = '';
    
    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price} - Registered at ${product.time}`;
        productList.appendChild(listItem);
        
        const option = document.createElement('option');
        option.value = index;
        option.textContent = product.name;
        deleteProductSelect.appendChild(option);
    });
}

function updateTotalSum() {
    const sum = products.reduce((total, product) => total + product.price, 0);
    totalSumDisplay.textContent = `$${sum}`;
}

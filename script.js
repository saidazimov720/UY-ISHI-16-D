class Product {
            constructor(name, price, time, image) {
                this.name = name;
                this.price = price;
                this.time = time;
                this.image = image;
                this.counter = 0;
            }

            increase() {
                this.counter++;
            }

            decrease() {
                if (this.counter > 0) {
                    this.counter--;
                }
            }
        }

        class Lot extends Product {
            constructor(name, price, time, image) {
                super(name, price, time, image);
            }
        }

        class ProductManager {
            constructor() {
                this.products = [];
                this.totalSum = 0;
                this.productNameInput = document.getElementById('productName');
                this.productPriceInput = document.getElementById('productPrice');
                this.productImageInput = document.getElementById('productImage');
                this.addProductButton = document.getElementById('addProduct');
                this.productList = document.getElementById('productList');
                this.totalSumElement = document.getElementById('totalSum');
                this.loadProductsButton = document.getElementById('loadProducts');

                this.loadProductsButton.addEventListener('click', () => {
                    this.loadProducts();
                });

                this.addProductButton.addEventListener('click', () => {
                    this.addProduct();
                });

                // Load products from local storage on page load.
                this.loadProducts();
            }

            addProduct() {
                const name = this.productNameInput.value;
                const price = parseFloat(this.productPriceInput.value);
                const image = this.productImageInput.files.length > 0 ? this.productImageInput.files[0] : null;

                if (name && !isNaN(price) && image) {
                    const registrationTime = new Date().toLocaleTimeString();
                    const product = new Lot(name, price, registrationTime, image);
                    this.products.push(product);
                    this.productNameInput.value = '';
                    this.productPriceInput.value = '';
                    this.productImageInput.value = null;
                    this.displayProducts();
                    this.saveProducts();
                }
            }

            loadProducts() {
                const savedProducts = localStorage.getItem('products');
                if (savedProducts) {
                    this.products = JSON.parse(savedProducts);
                    this.displayProducts();
                }
            }

            saveProducts() {
                localStorage.setItem('products', JSON.stringify(this.products));
            }

            displayProducts() {
                this.productList.innerHTML = '';

                this.products.forEach((product, index) => {
                    const buyButton = document.createElement('button');
                    buyButton.classList.add('buy-button');
                    buyButton.setAttribute('data-index', index);
                    buyButton.textContent = 'Buy';
                    buyButton.style.padding = '1px'; 
                    buyButton.style.fontSize = '14px'; 

                    const decreaseButton = document.createElement('button');
                    decreaseButton.classList.add('decrease-button');
                    decreaseButton.setAttribute('data-index', index);
                    decreaseButton.textContent = '-';
                    decreaseButton.style.padding = '1px'; 
                    decreaseButton.style.fontSize = '14px'; 

                    const increaseButton = document.createElement('button');
                    increaseButton.classList.add('increase-button');
                    increaseButton.setAttribute('data-index', index);
                    increaseButton.textContent = '+';
                    increaseButton.style.padding = '1px'; 
                    increaseButton.style.fontSize = '14px'; 

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-button');
                    deleteButton.setAttribute('data-index', index);
                    deleteButton.textContent = 'Delete';
                    deleteButton.style.padding = '1px'; 
                    deleteButton.style.fontSize = '14px'; 

                    const listItem = document.createElement('li');
                    const imageElement = document.createElement('img');
                    imageElement.src = URL.createObjectURL(product.image);
                    imageElement.alt = product.name + " image";
                    imageElement.classList.add('product-image');

                    listItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Registered at ${product.time}</p>
                    <p>Counter: <span class="product-counter" data-index="${index}">${product.counter}</span></p>`;            
                    listItem.appendChild(imageElement);
                    listItem.appendChild(buyButton);
                    listItem.appendChild(decreaseButton);
                    listItem.appendChild(increaseButton);
                    listItem.appendChild(deleteButton);
                    this.productList.appendChild(listItem);
                });

                const buyButtons = document.querySelectorAll('.buy-button');
                buyButtons.forEach(button => {
                    button.addEventListener('click', this.handleBuyButtonClick.bind(this));
                });

                const decreaseButtons = document.querySelectorAll('.decrease-button');
                decreaseButtons.forEach(button => {
                    button.addEventListener('click', this.handleDecreaseButtonClick.bind(this));
                });

                const increaseButtons = document.querySelectorAll('.increase-button');
                increaseButtons.forEach(button => {
                    button.addEventListener('click', this.handleIncreaseButtonClick.bind(this));
                });

                const deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', this.handleDeleteButtonClick.bind(this));
                });
            }

            handleBuyButtonClick(event) {
                const index = event.target.getAttribute('data-index');
                const product = this.products[index];
                product.increase(); 
                this.totalSum += product.price;
                this.totalSumElement.textContent = `$${this.totalSum.toFixed(2)}`;
                const counterElement = document.querySelector(`[data-index="${index}"] .product-counter`);
                counterElement.textContent = product.counter;
                this.saveProducts();
            }

            handleDecreaseButtonClick(event) {
                const index = event.target.getAttribute('data-index');
                const product = this.products[index];
                product.decrease(); 
                const counterElement = document.querySelector(`[data-index="${index}"] .product-counter`);
                counterElement.textContent = product.counter;
                this.saveProducts();
            }

            handleIncreaseButtonClick(event) {
                const index = event.target.getAttribute('data-index');
                const product = this.products[index];
                product.increase(); 
                const counterElement = document.querySelector(`[data-index="${index}"] .product-counter`);
                counterElement.textContent = product.counter;
                this.saveProducts();
            }

            handleDeleteButtonClick(event) {
                const index = event.target.getAttribute('data-index');
                this.products.splice(index, 1);
                this.displayProducts();
                this.saveProducts();
            }
        }

        const productManager = new ProductManager();
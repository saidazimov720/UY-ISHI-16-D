const products = [];
        let totalSum = 0;
    
        const productNameInput = document.getElementById('productName');
        const productPriceInput = document.getElementById('productPrice');
        const productImageInput = document.getElementById('productImage');
        const addProductButton = document.getElementById('addProduct');
        const productList = document.getElementById('productList');
        const totalSumElement = document.getElementById('totalSum');
    
        class Lot {
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
    
        addProductButton.addEventListener('click', () => {
            const name = productNameInput.value;
            const price = parseFloat(productPriceInput.value);
            const image = productImageInput.files[0];
    
            if (name && !isNaN(price) && image) {
                const registrationTime = new Date().toLocaleTimeString();
                const product = new Lot(name, price, registrationTime, image);
                products.push(product);
                productNameInput.value = '';
                productPriceInput.value = '';
                productImageInput.value = null; 
                displayProducts();
            }
        });
    
        function displayProducts() {
            productList.innerHTML = '';
        
            products.forEach((product, index) => {    
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
                    <p>Counter: <span class="product-counter">${product.counter}</span></p>`;
                listItem.appendChild(imageElement);
                listItem.appendChild(buyButton);
                listItem.appendChild(decreaseButton);
                listItem.appendChild(increaseButton);
                listItem.appendChild(deleteButton);
                productList.appendChild(listItem);
            });
        
            const buyButtons = document.querySelectorAll('.buy-button');
            buyButtons.forEach(button => {
                button.addEventListener('click', handleBuyButtonClick);
            });

            const decreaseButtons = document.querySelectorAll('.decrease-button');
            decreaseButtons.forEach(button => {
                button.addEventListener('click', handleDecreaseButtonClick);
            });

            const increaseButtons = document.querySelectorAll('.increase-button');
            increaseButtons.forEach(button => {
                button.addEventListener('click', handleIncreaseButtonClick);
            });
        
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDeleteButtonClick);
            });
        }
    
        function handleBuyButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            const product = products[index];
            product.increase(); // Increment the counter
            totalSum += product.price;
            totalSumElement.textContent = `$${totalSum.toFixed(2)}`;
            // Update the displayed counter
            document.querySelector(`[data-index="${index}"] .product-counter`).textContent = product.counter;
        }

        function handleDecreaseButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            const product = products[index];
            product.decrease(); 
            document.querySelector(`[data-index="${index}"] .product-counter`).textContent = product.counter;
        }

        function handleIncreaseButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            const product = products[index];
            product.increase(); 
            document.querySelector(`[data-index="${index}"] .product-counter`).textContent = product.counter;
        }
    
        function handleDeleteButtonClick(event) {
            const index = event.target.getAttribute('data-index');
            products.splice(index, 1);
            displayProducts();
        }
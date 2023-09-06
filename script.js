    const products = [];
    let totalSum = 0;

    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productImageInput = document.getElementById('productImage');
    const addProductButton = document.getElementById('addProduct');
    const productList = document.getElementById('productList');
    const totalSumElement = document.getElementById('totalSum');

    addProductButton.addEventListener('click', () => {
        const name = productNameInput.value;
        const price = parseFloat(productPriceInput.value);
        const image = productImageInput.files[0];

        if (name && !isNaN(price) && image) {
            const registrationTime = new Date().toLocaleTimeString();
            addProduct(name, price, registrationTime, image);
            productNameInput.value = '';
            productPriceInput.value = '';
            productImageInput.value = null; 
            displayProducts();
        }
    });

    function addProduct(name, price, time, image) {
        const product = { name, price, time, image };
        products.push(product);
    }

    function displayProducts() {
        productList.innerHTML = '';
    
        products.forEach((product, index) => {    
            const buyButton = document.createElement('button');
            buyButton.classList.add('buy-button');
            buyButton.setAttribute('data-index', index);
            buyButton.textContent = 'Buy';
            buyButton.style.padding = '1px'; 
            buyButton.style.fontSize = '14px'; 
    
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
                <p>Registered at ${product.time}</p>`;
            listItem.appendChild(imageElement);
            listItem.appendChild(buyButton);
            listItem.appendChild(deleteButton);
            productList.appendChild(listItem);
        });
    
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuyButtonClick);
        });
    
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteButtonClick);
        });
    }

    function handleBuyButtonClick(event) {
        const index = event.target.getAttribute('data-index');
        const product = products[index];
        totalSum += product.price;
        totalSumElement.textContent = `$${totalSum.toFixed(2)}`;
    }

    function handleDeleteButtonClick(event) {
        const index = event.target.getAttribute('data-index');
        products.splice(index, 1);
        displayProducts();
    }
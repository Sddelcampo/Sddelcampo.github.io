"use strict";

document.addEventListener('DOMContentLoaded', function () {

    /** Check if the script runs on it's specified page that it needs to run
     * Credits:
     * ID 1: https://crueltysquad.fandom.com/wiki/Gorbino%27s_Quest
     * ID 2: https://www.oldschoolgamermagazine.com/why-theyre-rare-uniracers/
     * ID 3: https://www.ugcleague.com/team_page.cfm?clan_id=32625
     */
    if (window.location.pathname.includes('admin-products.html')) {
        const products = [
            {
                id: 1,
                name: 'Gorbinos Quest',
                description: 'Gorbinos Quest Videogame',
                category: 'Action',
                image: 'images/gorbinos_quest.webp',
                price: 5.00
            },
            {
                id: 2,
                name: 'Uniracers',
                description: 'Uniracers Videogame',
                category: 'Racing, Adventure',
                image: 'images/uniracers.webp',
                price: 10.00
            },
            {
                id: 3,
                name: 'Gorbinos Quest 2: Life Jam',
                description: 'Gorbinos Quest Videogame',
                category: 'Action, Horror',
                image: 'images/gorbinos_quest_2.png',
                price: 12.99
            }
        ];

        const productTableBody = document.querySelector('#product-table tbody');
        const searchInput = document.getElementById('search');
        const addProductButton = document.getElementById('add-product');
        const addProductForm = document.getElementById('add-product-form');
        const submitNewProductButton = document.getElementById('submit-new-product');
        const cancelNewProductButton = document.getElementById('cancel-new-product');

        /**
        * Updates the total price for a specific cart item and calculates the subtotal.
        * @param {products} product - The products object which has id, name description, category,
        * image, and price.
        */
        function createProductRow(product) {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = product.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = product.description;

            const categoryCell = document.createElement('td');
            categoryCell.textContent = product.category;

            const imageCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '50px';
            img.style.height = 'auto';
            imageCell.appendChild(img);

            const priceCell = document.createElement('td');
            priceCell.textContent = '$' + product.price.toFixed(2);

            const actionCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.setAttribute('data-id', product.id);
            actionCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.setAttribute('data-id', product.id);
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(categoryCell);
            row.appendChild(imageCell);
            row.appendChild(priceCell);
            row.appendChild(actionCell);

            return row;
        }

        /**
        * Function to display all products made
        * @param {products} productsToDisplay - List of products to add into the table
        */
        function displayProducts(productsToDisplay) {
            if (productTableBody) {
                productTableBody.innerHTML = '';
                productsToDisplay.forEach(product => {
                    const row = createProductRow(product);
                    productTableBody.appendChild(row);
                });
            } else {
                console.error('Product table body not found!');
            }
        }

        // Searches input based on name and category
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                displayProducts(filteredProducts);
            });
        }

        // Will add a new product iff all required items have been added
        if (addProductButton) {
            addProductButton.addEventListener('click', function () {
                if (addProductForm) {
                    addProductForm.style.display = 'block';
                }
            });
        }

        // If submit is hit then the data will be processed and the previous input will be cleared
        if (submitNewProductButton) {
            submitNewProductButton.addEventListener('click', function (event) {
                event.preventDefault();
                const newProduct = {
                    id: products.length + 1,
                    name: document.getElementById('new-product-name').value,
                    description: document.getElementById('new-product-description').value,
                    category: document.getElementById('new-product-category').value,
                    image: document.getElementById('new-product-image').value,
                    price: parseFloat(document.getElementById('new-product-price').value)
                };
                products.push(newProduct);
                displayProducts(products);
                if (addProductForm) {
                    addProductForm.style.display = 'none';
                }

                document.getElementById('new-product-name').value = '';
                document.getElementById('new-product-description').value = '';
                document.getElementById('new-product-category').value = '';
                document.getElementById('new-product-image').value = '';
                document.getElementById('new-product-price').value = '';
            });
        }

        /* If cancel is clicked the items for adding a new product will be hidden until Add New 
        Product is clicked again. */
        if (cancelNewProductButton) {
            cancelNewProductButton.addEventListener('click', function () {
                if (addProductForm) {
                    addProductForm.style.display = 'none';
                }
            });
        }

        /* Adds edit and delete button to redirect to either go to product-edit.html or delete
        the row entirely respectively */
        if (productTableBody) {
            productTableBody.addEventListener('click', function (event) {
                if (event.target.classList.contains('edit-button')) {
                    const productId = event.target.getAttribute('data-id');
                    const product = products.find(p => p.id == productId);
                    if (product) {;
                        window.location.href = 'product-edit.html';
                    }
                }

                if (event.target.classList.contains('delete-button')) {
                    const productId = event.target.getAttribute('data-id');
                    const productIndex = products.findIndex(p => p.id == productId);
                    if (productIndex > -1) {
                        products.splice(productIndex, 1);
                        displayProducts(products);
                    }
                }
            });
        }

        // Displays procuts
        displayProducts(products);
    }
});

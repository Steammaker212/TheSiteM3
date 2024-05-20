const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    menu.style.transition = 'left 0.3s ease-out';
    menu.style.left = menu.style.left === '-290px'? '0' : '-290px';
  };
  

  function redirectToLogin() {
    window.location.href = 'login.html';
  }
  
  function redirectToCart() {
    window.location.href = 'addtocart.html';
  }
  
// Fetch the product data from product.json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        // Get the container where products will be displayed
        const container = document.getElementById('products');

        // Loop through the product data
        data.forEach(product => {
            // Create a div element for each product
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Set the product image
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.name; // Set alt attribute for accessibility
            productDiv.appendChild(image);

            // Set the product name
            const name = document.createElement('h3');
            name.textContent = product.name;
            productDiv.appendChild(name);

            // Set the product description
            const description = document.createElement('p');
            description.textContent = product.description;
            productDiv.appendChild(description);

            // Display the product price
            const price = document.createElement('p');
            price.textContent = 'Price: $' + product.price;
            productDiv.appendChild(price);

            // Create the buy now button
            const buyNowBtn = document.createElement('button');
            buyNowBtn.textContent = 'Buy Now';
            buyNowBtn.addEventListener('click', () => {
                window.location.href = product.link;
            });
            productDiv.appendChild(buyNowBtn);

            // Create the add to cart button
            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.addEventListener('click', () => {
                addToCart(product);
            });
            productDiv.appendChild(addToCartBtn);

            // Append the product div to the container
            container.appendChild(productDiv);
        });

        // Function to add product to cart
        function addToCart(product) {
            // Retrieve cart items from localStorage
            let cartItems = [];
            if (localStorage.getItem('3d_cart')) {
                cartItems = JSON.parse(localStorage.getItem('3d_cart'));
            }

            // Check if the product is already in the cart
            const existingItem = cartItems.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    name: product.name,
                    price: product.price,
                    image: product.image, // Store the image URL
                    description: product.description,
                    quantity: 1
                });
            }

            // Update cart data in localStorage
            localStorage.setItem('3d_cart', JSON.stringify(cartItems));
            alert('Product added to cart!');
        }
    })
    .catch(error => console.error('Error fetching product data:', error));

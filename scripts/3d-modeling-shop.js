// JavaScript function to toggle menu visibility
function toggleMenu() {
    var menu = document.querySelector('.menu');
    var menuDisplay = window.getComputedStyle(menu).getPropertyValue('left');
    if (menuDisplay === '0px') {
        menu.style.left = '-290px';
    } else {
        menu.style.left = '0px';
    }
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Function to redirect to the cart page
function redirectToCart() {
    window.location.href = 'addtocart.html';
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('3dproducts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('products');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const image = document.createElement('img');
                image.src = product.image;
                image.alt = product.name;
                productDiv.appendChild(image);

                const name = document.createElement('h3');
                name.textContent = product.name;
                productDiv.appendChild(name);

                const description = document.createElement('p');
                description.textContent = product.description;
                productDiv.appendChild(description);

                const price = document.createElement('p');
                price.textContent = 'Price: $' + product.price;
                productDiv.appendChild(price);

                const buyNowBtn = document.createElement('button');
                buyNowBtn.textContent = 'Buy Now';
                buyNowBtn.addEventListener('click', () => {
                    window.location.href = product.link;
                });
                productDiv.appendChild(buyNowBtn);

                const addToCartBtn = document.createElement('button');
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.addEventListener('click', () => {
                    addToCart(product);
                });
                productDiv.appendChild(addToCartBtn);

                container.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching product data:', error));
});

function addToCart(product) {
    let cartItems = [];
    if (localStorage.getItem('3d_cart')) {
        cartItems = JSON.parse(localStorage.getItem('3d_cart'));
    }

    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1
        });
    }

    updateStorage(cartItems);
    alert('Product added to cart!');
}

function updateStorage(cartItems) {
    localStorage.setItem('3d_cart', JSON.stringify(cartItems));
}

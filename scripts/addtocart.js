document.querySelector('.back-button').addEventListener('click', function (event) {
    event.preventDefault();
    window.history.back();
});

document.querySelector('.buy-all-button').addEventListener('click', function () {
    if (cartItems.length > 0) {
        alert('Proceeding to buy all items in the cart.');
        // Add logic to handle purchasing all items
    } else {
        alert('Your cart is empty.');
    }
});

let cartItems = [];

if (sessionStorage.getItem('cart')) {
    cartItems = JSON.parse(sessionStorage.getItem('cart'));
}
if (localStorage.getItem('online_cart')) {
    cartItems = cartItems.concat(JSON.parse(localStorage.getItem('online_cart')));
}
if (localStorage.getItem('3d_cart')) {
    cartItems = cartItems.concat(JSON.parse(localStorage.getItem('3d_cart')));
}

const cartItemsContainer = document.getElementById('cart-items');
const totalItemsElement = document.getElementById('total-items'); // New element reference

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cartItems.length > 0) {
        let totalItems = 0; // Initialize total items counter
        cartItems.forEach(item => {
            totalItems += item.quantity; // Add item quantity to total items counter
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');

            const itemImage = document.createElement('img');
            itemImage.classList.add('item-image');
            itemImage.src = item.image;
            itemImage.alt = item.name;

            const itemName = document.createElement('span');
            itemName.classList.add('item-name');
            itemName.textContent = item.name;

            const itemDescription = document.createElement('span');
            itemDescription.classList.add('item-description');
            itemDescription.textContent = item.description;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = '$' + item.price;

            const quantityInput = document.createElement('input');
            quantityInput.classList.add('quantity-input');
            quantityInput.type = 'number';
            quantityInput.min = 1;
            quantityInput.value = item.quantity;
            quantityInput.addEventListener('change', () => {
                updateQuantity(item, quantityInput.value);
            });

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(item);
            });

            const buyNowButton = document.createElement('button');
            buyNowButton.classList.add('buy-now-button');
            buyNowButton.textContent = 'Buy Now';
            buyNowButton.addEventListener('click', () => {
                alert(`Proceeding to buy ${item.name}.`);
                // Add logic to handle purchasing a single item
            });

            itemDetails.appendChild(itemImage);
            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemDescription);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(quantityInput);
            itemDetails.appendChild(buyNowButton);

            cartItem.appendChild(itemDetails);
            cartItem.appendChild(removeButton);
            cartItemsContainer.appendChild(cartItem);
        });
        totalItemsElement.textContent = `Total Items: ${totalItems}`; // Update total items display
    } else {
        totalItemsElement.textContent = 'Total Items: 0'; // Update total items display when cart is empty
        const emptyCartMessage = document.createElement('li');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartItemsContainer.appendChild(emptyCartMessage);
    }

    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = 'Total: $' + totalPrice.toFixed(2);
}

function removeFromCart(itemToRemove) {
    cartItems = cartItems.filter(item => item.name !== itemToRemove.name);
    updateStorage();
    renderCartItems();
}

function updateQuantity(itemToUpdate, newQuantity) {
    const index = cartItems.findIndex(item => item.name === itemToUpdate.name);
    if (index !== -1) {
        cartItems[index].quantity = parseInt(newQuantity);
        updateStorage();
        renderCartItems();
    }
}

function updateStorage() {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('online_cart', JSON.stringify(cartItems.filter(item => !item.storage)));
    localStorage.setItem('3d_cart', JSON.stringify(cartItems.filter(item => item.storage)));
}

renderCartItems();

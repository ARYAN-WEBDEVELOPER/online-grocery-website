function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function validateContactForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Name validation
    if (name.length < 3) {
        alert("Name must be at least 3 characters");
        return false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    // Message validation
    if (message.length < 10) {
        alert("Message must be at least 10 characters");
        return false;
    }

    // Success
    alert("Message sent successfully!");
    return true;
}


// ========== CART SYSTEM ==========

// Get cart
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price, image) {
    let cart = getCart();

    let item = cart.find(p => p.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Added to cart!");
}

// Load cart page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.querySelector(".cart-items");
    let totalEl = document.getElementById("cart-total");

    if (!cartDiv) return;

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartDiv.innerHTML += `
            <div class="cart-item">

                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>

                <div class="cart-quantity">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <div class="cart-total">
                    ₹${item.price * item.quantity}
                </div>

                <div class="cart-remove">
                    <button onclick="removeItem(${index})">✖</button>
                </div>

            </div>
        `;
    });

    totalEl.innerText = "₹" + total;
}


// Change quantity
function changeQty(index, change) {
    let cart = getCart();
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    loadCart();
}

// Remove item
function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// Auto-load cart
document.addEventListener("DOMContentLoaded", loadCart);


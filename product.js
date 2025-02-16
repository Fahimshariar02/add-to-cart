
// document.addEventListener("DOMContentLoaded", function () {
//     fetch("https://fakestoreapi.com/products")
//         .then(response => response.json())
//         .then(products => displayProducts(products));

//     function displayProducts(products) {
//         let productList = document.getElementById("product-list");
//         productList.innerHTML = "";

//         products.forEach(product => {
//             let createCard = `
//                 <div class="col-sm-6 col-md-4 col-lg-3 col-12 my-4">
//                     <div class="card" style="width: 18rem;">
//                         <img src="${product.image}" class="card-img-top" alt="${product.title}">
//                         <div class="card-body d-flex flex-column">
//                             <h5 class="card-title">${product.title}</h5>
//                             <p class="card-text">${product.description}</p>
//                             <p class="card-text mb-2"><strong>$${product.price}</strong></p>
//                             <button class="btn btn-outline-primary w-100 add-to-cart" 
//                                     data-id="${product.id}" 
//                                     data-title="${product.title}" 
//                                     data-price="${product.price}" 
//                                     data-image="${product.image}">
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>`;
            
//             productList.innerHTML += createCard;
//         });

//         document.querySelectorAll(".add-to-cart").forEach(button => {
//             button.addEventListener("click", addToCart);
//         });
//     }
// });

// let amount = 0;
// let totalItems = 0;
// let appliedPromo = "";
// const promoCodes = { "ostad10": 0.10, "ostad5": 0.05 };
    
// function addToCart(event) {
//     let productId = event.target.dataset.id;
//     let productName = event.target.dataset.title;
//     let productPrice = parseFloat(event.target.dataset.price);
//     let productImage = event.target.dataset.image;

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let productExists = cart.find(item => item.id == productId);

//     if (productExists) {
//         productExists.quantity += 1;
//     } else {
//         cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartUI();
//     showCart();
// }

// function updateCartUI() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let cartItems = document.getElementById("cart-items");
//     let total = 0;
//     totalItems = 0;
//     cartItems.innerHTML = "";

//     cart.forEach(item => {
//         total += item.price * item.quantity;
//         totalItems += item.quantity;

//         let cartItem = `
//             <div class="d-flex justify-content-between align-items-center gap-3">
//                 <img src="${item.image}" class="img-fluid" style="width: 50px; height: 50px;" alt="${item.name}">
//                 <span>${item.name} - $${item.price}</span>
//                 <div class="d-flex flex-column">
//                     <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
//                     <span class="mx-2">${item.quantity}</span>
//                     <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
//                 </div>
//                 <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
//             </div>
//             <hr>`;
//         cartItems.innerHTML += cartItem;
//     });

//     amount = total.toFixed(2);
//     applyPromoCode();
// }

// function applyPromoCode() {
//     let promoInput = document.getElementById("promo-code").value;
//     let discount = promoCodes[promoInput] ? promoCodes[promoInput] * amount : 0;
//     let finalAmount = amount - discount;

//     document.getElementById("cart-total").innerText = `$${finalAmount.toFixed(2)}`;
//     document.getElementById("discount-amount").innerText = discount > 0 ? `-$${discount.toFixed(2)}` : "-$0.00";
//     document.getElementById("promo-message").innerText = promoCodes[promoInput] ? "Promo code applied!" : "Invalid promo code!";
// }

// function checkOut() {
//     if (totalItems > 0) {
//         alert(`You've purchased ${totalItems} items for a cost of: $${document.getElementById("cart-total").innerText}. Thank You!`);
//         clearCart();
//     } else {
//         alert("No product selected to purchase! Please select products.");   
//     }
// }

// function clearCart() {
//     localStorage.removeItem("cart");
//     document.getElementById("promo-code").value = "";
//     appliedPromo = "";
//     updateCartUI();
// }
 document.addEventListener("DOMContentLoaded", function () {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => displayProducts(products));

    function displayProducts(products) {
        let productList = document.getElementById("product-list");
        productList.innerHTML = "";

         products.forEach(product => {
            let createCard = `
                <div class="col-sm-6 col-md-4 col-lg-3 col-12 my-4">
                    <div class="card style="width: 18rem;">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">

                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>

                            <div class="mt-auto">
                                <p class="card-text">${product.description}</p>
                            </div>

                            <div class="mt-3">
                                <p class="card-text mb-2"><strong>$${product.price}</strong></p>
                                <button class="btn btn-outline-primary w-100 add-to-cart" 
                                         data-id="${product.id}" 
                                         data-title="${product.title}" 
                                         data-price="${product.price}" 
                                         data-image="${product.image}">
                                     Add to Cart
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                `;
            
            productList.innerHTML += createCard;
        });


        let cardItems = document.querySelectorAll(".add-to-cart");
        cardItems.forEach(button => {
            button.addEventListener("click", addToCart);
        });
    }
});

let amount = 0;
let totalItems = 0;
    
function addToCart(event) {
    let productId = event.target.dataset.id;
    let productName = event.target.dataset.title;
    let productPrice = parseFloat(event.target.dataset.price);
    let productImage = event.target.dataset.image;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productExists = cart.find(item => item.id == productId);

    if (productExists) {
        productExists.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    showCart();
}

function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    totalItems = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        let cartItem = `
            <div class="d-flex justify-content-between align-items-center gap-3">
                <img src="${item.image}" class="img-fluid" style="width: 50px; height: 50px;" alt="${item.name}">
                <span>${item.name} - $${item.price}</span>
                <div class="d-flex flex-column">
                    <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
            <hr>`;
        cartItems.innerHTML += cartItem;
    });


    let discount = 0;
    const promoCode = document.getElementById("promo-code").value;

    
     if (promoCode == "ostad10") {
        discount = 0.1 * total; 
     
    }
    else if(promoCode =="ostad5"){
        discount = 0.05 * total;
    }

    subtotal = total - discount;

    // total = subtotal - discount;

    // // Display subtotal, discount, and total
    document.getElementById("cart-subtotal").innerText = `$${total.toFixed(2)}`;
    document.getElementById("cart-discount").innerText = `$${discount.toFixed(2)}`;
    document.getElementById("cart-total").innerText = `$${subtotal.toFixed(2)}`;
    amount = total.toFixed(2);
}



function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.id == id);

    if (product) {
        product.quantity += change;
       
        if (product.quantity < 1) product.quantity = 1;

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCartUI();
}

function showCart() {
    document.getElementById("cart-sidebar").classList.add("show");
}

function isCartEmpty() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length === 0;
    // console.log(cart);
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("show");;
}

function checkOut(amount,totalItems) {
    if(!isCartEmpty()){
        alert(`You've purchased ${totalItems} items for a cost of: $${amount}. Thank You!`);
        clearCart();

    } else{
        alert("No product selected to purchase! Please select products.");   
    }
}
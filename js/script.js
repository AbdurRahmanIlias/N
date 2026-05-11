// // =========================
// // PRODUCT SEARCH FUNCTION
// // =========================
// const searchInput = document.getElementById('searchInput');

// if (searchInput) {
//     searchInput.addEventListener('keyup', function () {
//         let filter = searchInput.value.toLowerCase();
//         let products = document.querySelectorAll('.product-item');

//         products.forEach(function(product) {
//             let text = product.innerText.toLowerCase();

//             if (text.includes(filter)) {
//                 product.style.display = '';
//             } else {
//                 product.style.display = 'none';
//             }
//         });
//     });
// }


// // =========================
// // ADD TO CART SYSTEM
// // =========================

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// const cartButtons = document.querySelectorAll('.add-cart');

// cartButtons.forEach((button) => {
//     button.addEventListener('click', () => {

//         const productCard = button.closest('.card') || button.closest('.row');

//         let productName = productCard.querySelector('h5, h2').innerText;
//         let productPrice = productCard.querySelector('p').innerText;
//         let productImage = productCard.querySelector('img').src;

//         const product = {
//             name: productName,
//             price: productPrice,
//             image: productImage,
//             quantity: 1
//         };

//         const existingProduct = cart.find(item => item.name === product.name);

//         if (existingProduct) {
//             existingProduct.quantity += 1;
//         } else {
//             cart.push(product);
//         }

//         localStorage.setItem('cart', JSON.stringify(cart));

//         alert(productName + ' added to cart!');
//     });
// });

// // =========================
// // UPDATE CART COUNT BADGE
// // =========================

// const cartCount = document.getElementById('cart-count');

// if (cartCount) {

//     let totalItems = 0;

//     cart.forEach(item => {
//         totalItems += item.quantity;
//     });

//     cartCount.innerText = totalItems;
// };

// // =========================
// // DISPLAY CART ITEMS
// // =========================

// const cartTable = document.getElementById('cart-items');
// const cartTotal = document.getElementById('cart-total');

// if (cartTable) {

//     cartTable.innerHTML = '';

//     let total = 0;

//     cart.forEach((item, index) => {

//         let price = parseFloat(item.price.replace('$', ''));
//         let itemTotal = price * item.quantity;
//         total += itemTotal;

//         cartTable.innerHTML += `
//             <tr>
//                 <td>
//                     <img src="${item.image}" width="70" class="rounded me-2">
//                     ${item.name}
//                 </td>
//                 <td>$${price}</td>
//                 <td>
//                     <input type="number" min="1" value="${item.quantity}" 
//                     onchange="updateQuantity(${index}, this.value)"
//                     class="form-control w-50 mx-auto">
//                 </td>
//                 <td>$${itemTotal}</td>
//                 <td>
//                     <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
//                         Remove
//                     </button>
//                 </td>
//             </tr>
//         `;
//     });

//     cartTotal.innerText = '$' + total;
// };

// // =========================
// // UPDATE QUANTITY
// // =========================

// function updateQuantity(index, quantity) {

//     cart[index].quantity = parseInt(quantity);

//     localStorage.setItem('cart', JSON.stringify(cart));

//     location.reload();
// }

// // =========================
// // REMOVE ITEM
// // =========================

// function removeItem(index) {

//     cart.splice(index, 1);

//     localStorage.setItem('cart', JSON.stringify(cart));

//     location.reload();
// }

// // =========================
// // ADD CART
// // =========================

// window.onload = () => {
//     if (cartCount) {
//         let totalItems = 0;
//         cart.forEach(item => {
//             totalItems += item.quantity;
//         });
//         cartCount.innerText = totalItems;
//     }
// };

// =========================
// PRODUCT SEARCH FUNCTION
// =========================
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('keyup', function () {
        let filter = searchInput.value.toLowerCase();
        let products = document.querySelectorAll('.product-item');

        products.forEach(function(product) {
            let text = product.innerText.toLowerCase();

            if (text.includes(filter)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
}


// =========================
// ADD TO CART SYSTEM
// =========================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartButtons = document.querySelectorAll('.add-cart');

cartButtons.forEach((button) => {
    button.addEventListener('click', () => {

        const productCard = button.closest('.card') || button.closest('.row');

        let productName = productCard.querySelector('h5, h2').innerText;
        let productPriceText = productCard.querySelector('h3, h6, p').innerText;
        let productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, '')); // শুধু সংখ্যা নাও
        let productImage = productCard.querySelector('img').src;

        const product = {
            name: productName,
            price: productPrice,   // এখন number হিসেবে রাখা হলো
            image: productImage,
            quantity: 1
        };

        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Cart Count আপডেট করো
        showCartCount();

        alert(productName + ' added to cart!');
    });
});


// =========================
// UPDATE CART COUNT BADGE
// =========================

const cartCount = document.getElementById('cart-count');

function showCartCount() {
    if (cartCount) {
        let totalItems = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
        });

        // শুধু তখনই দেখাবে যখন প্রোডাক্ট আছে
        if (totalItems > 0) {
            cartCount.innerText = totalItems;
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    }
}


// =========================
// DISPLAY CART ITEMS
// =========================

const cartTable = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

if (cartTable) {

    cartTable.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartTable.innerHTML += `
            <tr>
                <td>
                    <img src="${item.image}" width="70" class="rounded me-2">
                    ${item.name}
                </td>
                <td>$${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                    onchange="updateQuantity(${index}, this.value)"
                    class="form-control w-50 mx-auto">
                </td>
                <td>$${itemTotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    cartTotal.innerText = '$' + total;
};


// =========================
// UPDATE QUANTITY
// =========================

function updateQuantity(index, quantity) {

    cart[index].quantity = parseInt(quantity);

    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload();
}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload();
}


// =========================
// ON PAGE LOAD
// =========================

window.onload = () => {
    showCartCount();
};

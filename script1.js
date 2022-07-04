const cartContainer = document.querySelector('.cart-container');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');

let footer = document.getElementById("footer")
let product_button = document.getElementById("product_button");
let home_button = document.getElementById("home_button");
let main_section = document.getElementsByTagName("main")[0];
let product_section = document.getElementById("products");
let saleSection = document.getElementById("sales");
let saleButton = document.getElementById("sale");

const productList = document.querySelector('.product-list');
const productListSales = document.querySelector('.product-list-sales');
let cartItemID = 1;

eventListeners();


function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        sale();
        window.localStorage.clear();
    });

}

product_section.style.display = "none";
saleSection.style.display = "none";
product_button.addEventListener('click', function () {
    product_section.style.display = "block"
    main_section.style.display = "none"
    footer.style.display = "none";
    saleSection.style.display = "none";
})
home_button.addEventListener('click', function () {
    product_section.style.display = "none"
    main_section.style.display = "block"
    footer.style.display = "none"
    saleSection.style.display = "none"
})
saleButton.addEventListener("click", function () {
    footer.style.display = "none"
    product_section.style.display = "none"
    main_section.style.display = "none"
    saleSection.style.display = "block"
})



function loadJSON() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                if (product.sale !== product.price) {

                    html += `<div class = "product-item">
                        <div class = "product-img">
                            <img src = "${product.imgSrc}" alt = "product image" >

                            <button type = "button" class = "add-to-cart-btn">
                                <i class = "fas fa-shopping-cart"></i>Add To Cart
                            </button>
                        </div>
                        <div class = "product-content">
                            <h3 class = "product-name">${product.name}</h3>
                            <span class = "product-category">${product.category}</span><br>
                            <p class = "product-price-old">${product.price}</p><br>
                            <p class = "product-price">${product.sale}</p>
                        </div>
                    </div>`
                } else {
                    html += `<div class = "product-item">
                        <div class = "product-img">
                            <img src = "${product.imgSrc}" alt = "product image">

                            <button type = "button" class = "add-to-cart-btn">
                                <i class = "fas fa-shopping-cart"></i>Add To Cart
                            </button>
                        </div>
                        <div class = "product-content">
                            <h3 class = "product-name">${product.name}</h3>
                        
                            <span class = "product-category">${product.category}</span>
                            <br>
                            <p class = "product-price">${product.price}</p>
                        </div>
                    </div>`
                }
            });
            productList.innerHTML = html;
        })
        .catch(error => {
            alert(`User live server or local server`);
            //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
        })
}

function sale() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                if (product.sale !== product.price) {

                    html += `<div class = "product-item">
                        <div class = "product-img-sale">
                            <img src = "${product.imgSrc}" alt = "product image" >

                            <button type = "button" class = "add-to-cart-btn">
                                <i class = "fas fa-shopping-cart"></i>Add To Cart
                            </button>
                        </div>
                        <div class = "product-content">
                            <h3 class = "product-name">${product.name}</h3>
                            <span class = "product-category">${product.category}</span><br>
                            <p class = "product-price-old">${product.price}</p><br>
                            <p class = "product-price">${product.sale}</p>
                        </div>
                    </div>`

                }
            });
            productListSales.innerHTML = html;
        })
        .catch(error => {
            alert(`User live server or local server`);
            //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
        })
}
// show/hide cart container
document.getElementById('cart-btn').addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart-container');
});

// add to cart
productList.addEventListener('click', purchaseProduct);
// add to cart from sales
productListSales.addEventListener('click', purchaseProduct);

//purhase products
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
        updateCartInfo();
    }

}
function updateCartInfo() {
    let cartInfo = darko();
    innerHTML =
        cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}
cartList.addEventListener('click', deleteProduct);
// get product info after add to cart button click
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}
// add the selected product to the cart list
function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// save the product in the local storage//////////////////////////////////////////////////////
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}

// update cart info
function updateCartInfo() {
    let cartInfo = calculatePrice();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// calculate total price of the cart and other info
function calculatePrice() {
    let products = getProductFromStorage();
    console.log(products);
    let total = products.reduce((acc, el) => acc + Number(el.price), 0)
    return { total };
}


function deleteProduct(e) {
    let cartItem;
    if (e.target.tagName === "BUTTON") {
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if (e.target.tagName === "I") {
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}

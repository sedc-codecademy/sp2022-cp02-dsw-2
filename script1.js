
const productList = document.querySelector('.product-list');
let cartItemID = 1;

eventListeners();


function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
    
}

let footer=document.getElementById("footer")
let product_button=document.getElementById("product_button");
let home_button=document.getElementById("home_button");
let main_section=document.getElementsByTagName("main")[0];
let product_section=document.getElementById("products");

product_section.style.display="none";

product_button.addEventListener('click', function(){
    product_section.style.display="block"
    main_section.style.display="none"
    footer.style.display="none"
})
home_button.addEventListener('click', function(){
    product_section.style.display="none"
    main_section.style.display="block"
})



function loadJSON(){
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.img}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>
                    <div class = "product-content">
                        <h3 class = "product-name">${product.name}</h3>
                        <span class = "product-category">${product.category}</span>
                        <p class = "product-price">${product.price}</p>
                    </div>
                </div>
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

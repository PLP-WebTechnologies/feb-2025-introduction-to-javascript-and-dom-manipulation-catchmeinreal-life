const products = [
    { name: "Adidas Shoes", price: 2500, id: 1, quantity: 1,},
    { name: "Sting Energy Drink", price: 120, id: 2, quantity: 1,},
    { name: "Umbrella", price: 500, id: 3, quantity: 1, },
    { name: "Cat Food", price: 900, id: 4, quantity: 1, },
    { name: "T Shirt", price: 300, id: 5, quantity: 1, },
    { name: "Book", price: 100, id: 6, quantity: 1,},
  ];

const productsHtml = products.map(
(product) => `
    <div class="product-card">
        <h2 class="product-name">${product.name}</h2>
        <strong>$${product.price}</strong>
        <button class="product-btn" id=${product.id}>Add to Cart</button>
    </div>`
);
  
document.querySelector('.result').innerHTML = productsHtml.join('');


const cart = [];

//function to add product to cart
function updateCart() {
    const cartHTML = cart.map(
        (item) => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <div class="cart-detail">
                <div class="mid">
                    <button onclick="{decrItem(${item.id})}">-</button>
                    <p>${item.quantity}</p>
                    <button onclick="{incrItem(${item.id})}">+</button>
                </div>
                <p>$${item.price}</p>
                <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id} >Remove</button>
            </div>
        </div>`
    );

    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = cartHTML.join('');
}

updateCart();

//adding items to cart
let num = document.querySelectorAll('.product-btn').length;

for (let i = 0; i < num; i ++){
    document.querySelectorAll('.product-btn')[i].addEventListener('click', function (e) {
        addToCart(products, parseInt(e.target.id));
    });
}

//function to add item to cart
function addToCart(products, id){
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);
    if (cartProduct != undefined && product.id == cartProduct.id) {
      incrItem(id);
    } else {
      cart.unshift({ ...product });
    }
    updateCart();
    getTotal(cart);
  };
  

//getting the cart items
function getTotal(cart) {
    let { totalItem, cartTotal } = cart.reduce(
      (total, cartItem) => {
        total.cartTotal += cartItem.price * cartItem.quantity;
        total.totalItem += cartItem.quantity;
        return total;
      },
      { totalItem: 0, cartTotal: 0 }
    );
    const totalItemsHTML = document.querySelector(".noOfItems");
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.querySelector(".total");
    totalAmountHTML.innerHTML = `$${cartTotal}`;
  }
getTotal(cart);

//function to increase item quantity
function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] && cart[i].id == id) {
        cart[i].quantity += 1;
      }
    }
    updateCart();
    getTotal(cart);
  }

//function to decrease item quantity
function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      }
    }
    updateCart();
    getTotal(cart);
  }

//function to delete item from cart
function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity = 1;
        cart.splice(i, 1);
      }
    }
    updateCart();
    getTotal(cart);
  }
  
  
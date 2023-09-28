import {cart, addInCart, calculateCartQuantity} from '../data/cart.js'          
import {products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';


//Basic Idea to the add Javascript
/* 
  1. Save the data
  2. Generate the HTML
  3. Show it on the webpage using DOM

*/

//Save the Data

//The data comes from data/products.js

//Generate HTML

let productHTML='';
updateCartQuantity();

products.forEach((product) =>{
    productHTML+=`
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container" >
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      
      <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;

  //  Adding the data Attribute in the button (Line 63)  - in kebab case that starts from 'data-'
});
//Show it on the web page using DOM
document.querySelector('.js-products-grid').innerHTML= productHTML;


//Update the navbar cart Quantity on button click
function updateCartQuantity(){
  
  let cartQuantity=calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML= cartQuantity;
}

const clearAddedMessageIds={};

function addedInCart(productId){
   //Added message to be added when the Add to cart is being clicked
   document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-message');

   //assign any previousId stored in the clearAddedMessageIds object
   const previousTimeOutId= clearAddedMessageIds[productId];

   //if there is any previous id so clear the timeout
   if(previousTimeOutId){
     clearTimeout(previousTimeOutId);
   }

   //set current timeoutId and then push it in the object
   const timeOutId= setTimeout(()=>{
     document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-message');
   },2000);

   //Push it in the objects that is holding Ids
   clearAddedMessageIds[productId]=timeOutId;
}


//Adding Elements to the cart

document.querySelectorAll('.add-to-cart-button')
.forEach((button) =>{
  button.addEventListener('click', ()=>{
    //Accessing the data attribute from the button clicked
    //So that the same element is added in the cart after particular add to cart button click

    const productId = button.dataset.productId;     
    //here the kebab-case product-id turns into camelCase-> productId (dataset.productName)
    
    //Add in cart
    addInCart(productId);

    updateCartQuantity();

    //Show the Added in message for 2 seconds
    addedInCart(productId);

  });

});





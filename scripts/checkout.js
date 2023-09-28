import {cart, deleteQuantity ,calculateCartQuantity, saveToLocalStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency}  from './utils/money.js';

let cartItemsHTML='';

cart.forEach((cartItem) => {
  let matchingItem;
  products.forEach((product) =>{
    if(cartItem.productId === product.id ){
      matchingItem=product;
    }
  });

  cartItemsHTML+= `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link-${cartItem.productId}" data-product-id="${cartItem.productId}">
              Update
            </span>

            <input type="number" min="0" max="1000" class="quantity-input quantity-input-${cartItem.productId}" value="${cartItem.quantity}" data-product-id="${cartItem.productId}">
            
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${cartItem.productId}">
             Save
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML=cartItemsHTML;



//Adding Event Listener to the delete button

document.querySelectorAll('.delete-quantity-link')
  .forEach((button)=>{
    button.addEventListener('click', ()=>{
      //The data attribute added to the button in order to identify which button is being called.
      
      const productId= button.dataset.productId;
      deleteItemContainer(productId);
      updateCartQuantity();
        
    });
  });


//Checkout heading with updated cartQuantity

function updateCartQuantity(){

  let cartQuantity=calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML=`${cartQuantity} items`;

}

updateCartQuantity();


//Delete the Item container
function deleteItemContainer(productId){
  deleteQuantity(productId);

  //.remove() deletes the selected html ELement 
  let itemElement= document.querySelector(`.js-cart-item-container-${productId}`);
  itemElement.remove();
}


//Update button in the cart-item

document.querySelectorAll('.update-quantity-link')
  .forEach((button) =>{
    button.addEventListener('click' , ()=>{
      const productId=button.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });

//When the save link is clicked
function saveButtonClicked(productId){

  //Add the updated quantity on click
  const updatedQuantity= Number(document.querySelector(`.quantity-input-${productId}`).value);
  if(!updatedQuantity){
    deleteItemContainer(productId);
  }
  else{
    let matchingItem;
    cart.forEach((item) => {
      if(productId===item.productId){
        matchingItem=item;
      }
    });

    if(matchingItem){
      matchingItem.quantity=updatedQuantity;
    }
    
  }
  //Save cart to the local storage
  saveToLocalStorage();

  updateCartQuantity();

  //Remove the save button when clicked by removing the class
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

  //Show the updated Quantity beside the quantity in item container
  document.querySelector(`.js-quantity-label-${productId}`).innerText= `${updatedQuantity}`;
  
}


//Toggle the save Button
document.querySelectorAll('.js-save-link')
  .forEach((button) =>{
    button.addEventListener('click' , ()=>{
      const productId= button.dataset.productId;
      saveButtonClicked(productId);
    });
  });


  //On keyDown 'Enter' , save the quantity!

  document.querySelectorAll('.quantity-input')
    .forEach((button) =>{
        button.addEventListener('keydown', (event) =>{
          const productId= button.dataset.productId;
          if(event.key==='Enter'){
            saveButtonClicked(productId);
          }
        });
    });


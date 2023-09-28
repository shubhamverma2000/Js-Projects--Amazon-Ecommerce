export let cart= JSON.parse(localStorage.getItem('cart')) || [
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:3
  }
];


//Check if the product is already present if it is- add quantity by 1 or else push the product in the cart.
export function addInCart(productId){

    let matchingItem;
    cart.forEach((item) => {
      if(productId===item.productId){
        matchingItem=item;
      }
    });
    //Getting the quantity
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value); 

    if(matchingItem){
      matchingItem.quantity+=quantity;
    }else{
      cart.push({
        productId,     //Shorthand Property for productId :productId
        quantity
      });
    }
  saveToLocalStorage();
  }


//Function to save the cart into local storage
export function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
//To delete an item
/*
  1.Make a new array
  2.If it matches with the productid do not add it
  3. Update original cart with the new cart.
  
*/ 
export function deleteQuantity(productId){
  let cart2=[];
  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      cart2.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity
      });
    }
  });

  cart=cart2;
  saveToLocalStorage();
}


//Return updated cart quantity
export function calculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((item) =>{
    cartQuantity+= item.quantity;
  });
  return cartQuantity;
}

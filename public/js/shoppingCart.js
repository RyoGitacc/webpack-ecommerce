import { createcartItemNode } from "./createNodeFromText";
import { removeChildren } from "./filter";
const checkoutBtn = document.querySelector(".checkout-btn");


export const cartBody=document.querySelector(".cart-body");
export const totalNumNode= document.querySelector('.total-num');
export const totalPaymentNode= document.querySelector(".total-payment");

let numOfItem=0;
let totalPrice=0;

//update num of items and total price in a cart
export function updateCart(){
    numOfItem=0;
    totalPrice=0;
    removeChildren(cartBody)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(c=>{
        numOfItem +=c.quantity;
        totalPrice +=c.price * c.quantity;
        cartBody.appendChild(createcartItemNode(c))
    })
    totalNumNode.innerText=numOfItem;
    totalPaymentNode.innerText=totalPrice;
}

// //remove node from DOM 
function removeCartItem(cartItems,cartItem,id){
    const targetItem = cartItems.find(c=>c.id==id);
    if(targetItem){
        numOfItem -= targetItem.quantity;  totalPrice -= targetItem.quantity * targetItem.price;
        updateQuantityAndPrice(cartItem,0,0);
        const updatedCartItems = cartItems.filter(c=>c.id != id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); cartItem.remove();
    }
}

// update cart item's quantity, total price, cart total items , and cart total price
function updateQuantityAndPrice(cartItem,quantity,price){
    const totalPriceNode= cartItem.querySelector(".cart-item-total");
    const itemQuantityNode = cartItem.querySelector(".cart-item-quantity");

    itemQuantityNode.innerText=quantity; totalPriceNode.innerText=quantity * price;
    totalNumNode.innerText=numOfItem; totalPaymentNode.innerText=totalPrice;
}

//fucntion to triger when quantity button and remove button are clicked
export function clickQuantityButton(e){
    const cartItem = e.target.closest('.cart-item'); 
    const itemId = cartItem.getAttribute('id');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if(e.target.matches(".plus-btn") || e.target.matches(".minus-btn")){
       for(const c of cartItems){
             if(c.id == itemId){
                if(e.target.className === "plus-btn"){
                     c.quantity +=1; numOfItem++; totalPrice += c.price;
                }else if(e.target.className === "minus-btn"){
                     c.quantity -=1; numOfItem--; totalPrice -= c.price;
                }
                
                if(c.quantity === 0){
                    removeCartItem(cartItems,cartItem,itemId); return;
                }
                updateQuantityAndPrice(cartItem,c.quantity,c.price)
             }
       }
       localStorage.setItem('cartItems',JSON.stringify(cartItems));
    } else if(e.target.matches(".cart-remove-btn")){
        removeCartItem(cartItems,cartItem,itemId)
    }
}


// checkoutBtn.addEventListener('click',()=>alert( `Payment due is $${totalPrice}`))


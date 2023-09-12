import '../css/home.scss'
import '../css/navbar.scss'
import '../css/carousel.scss'
import '../css/select.scss'
import '../css/slider.scss'
import '../css/shoppingCart.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { moveNavBottomMobile, triggerClickEvent} from './navbar.js'
import {openSelect,closeSelect,selectOption,selectedCategory,selectedType, resetSelect} from './select.js'
import { handleSlider, min,max,resetSlider} from './slider';
import { clickQuantityButton, updateCart } from './shoppingCart'
import { loadMoreCards, loadFirstCards, filterItems, sortItems, 
         changeTextInFilterBtn,searchItem} from './filter'



//import icons
import cart from '../assets/icons/cart.svg';
import downArrow from '../assets/icons/down-arrow.svg';
import heart from '../assets/icons/heart.svg';
import login from '../assets/icons/login.svg';
import search from '../assets/icons/search.svg';
import search2 from '../assets/icons/search2.svg';

//import images


const genderContainer=document.querySelector('.gender-container');
const mobileGenderContainer=document.querySelector('.mobile-gender-container')
const sort = document.querySelector(".sort");
const searchbar= document.querySelector('.searchbar');
const list2 = document.querySelector('.list2');
const shadow = document.querySelector('.shadow');
const productContainer=document.querySelector(".product-container");
const cartBody = document.querySelector('.cart-body');
const filterBtn=document.querySelector('.filter-btn');

let gender="";


//set icons to navigation bar
const iconsForNavbar=[search,login,heart,cart]
const navIcons = document.querySelectorAll('.nav-icon');
iconsForNavbar.forEach((i,index)=>{
    navIcons[index].src=i;
})

//set search icon to search bar
const searchbarIcon = document.querySelector('.searchbar-icon');
searchbarIcon.src=search2;


//set svg arrow down to select.ejs
const downArrowSVGs=document.querySelectorAll('.down-arrow');
downArrowSVGs.forEach(d=>{
    d.src=downArrow;
})

//handle shodow for sneaker styles on and off
function handleShadow(){
    const rect = list2.getBoundingClientRect();
    if(rect.top > -200 && rect.top < 100){
      shadow.style.opacity=1;
      shadow.style.visibility="visible"
    }
    else if( rect.top < -200 || rect.top > 100){
      shadow.style.opacity=0;
      shadow.style.visibility="hidden"
    }
}

//handle select and submit button by event delegation
const filterList = document.querySelector('.filter-list');
function triggerFilterEvent(e){
   if(e.target.classList.contains("selected-value-container")){
    if(e.target.classList.contains('open')){
        closeSelect(e.target)
      }
      else{
        openSelect(e.target)
      }
   }
   else if(e.target.classList.contains('option')){
        selectOption(e.target)
   }
   else if(e.target.classList.contains('submit-btn')){
       filterItems(gender,selectedCategory,selectedType,max,min)
   }  
}


// slider
const sliders = document.querySelectorAll('.slider-input');
sliders.forEach(s=>{
    s.addEventListener('input', handleSlider)
})


//fucntion to check if scrolling reaches bottom
function checkScrollToBottom(){
     // window.scrollY is not supported in IE
     const currentScroll = window.scrollY || window.pageYOffset;
     // get position of the bottom of the window in pixel
     const offsetY = currentScroll + window.innerHeight;
     // console.log(offsetY, "offset")
     if(offsetY >= document.body.offsetHeight - 150 ){
       loadMoreCards()
     }
}

// add item to cart when add to cart butoon is clicked
function addToCart(e){
    if(e.target.matches(".add-cart-btn")){
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const clickedItem=JSON.parse(e.target.getAttribute('data'));
        if(cartItems.length > 0){
            if(cartItems.find(c=>c.id === clickedItem.id) === undefined){
                cartItems.push(clickedItem);
            }
            else{
                cartItems.forEach(c => {
                    if(c.id === clickedItem.id){
                        c.quantity += 1;
                    }
                });
            }
        }
        else{
            cartItems.push(clickedItem)
        }

        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        
        updateCart();
        alert(`${clickedItem.name} is added to shopping cart!`)
    }
}

function filterByGender(e){
    if(e.target.tagName === 'LABEL'){
       gender=e.target.innerText;   
       resetSelect();
       resetSlider();
       sort.value="all"
       filterItems(gender,selectedCategory,selectedType,max,min);    
    }

}

// trigger filter events
filterList.addEventListener('click',(e)=>triggerFilterEvent(e));

// trigger sorting events
sort.addEventListener('change', async ()=>{
   await sortItems(sort.value)
});

//navigation bar event handler
const navBottom=document.querySelector('.navigation-bottom');
navBottom.addEventListener('click',e=>triggerClickEvent(e));

// trigger searching items
searchbar.addEventListener('submit', ()=>{
    resetSelect();
    resetSlider();
    sort.value="all"
    searchItem
})

//handle click gender button event on navigation bar
genderContainer.addEventListener('click',(e)=>filterByGender(e));
mobileGenderContainer.addEventListener('click',(e)=>filterByGender(e));

//add item to shopping cart
productContainer.addEventListener('click',addToCart);

cartBody.addEventListener('click', clickQuantityButton);

//trigger this event when filter btn is clicked and chenge text inside the btn;
filterBtn.addEventListener('click',()=>changeTextInFilterBtn(filterBtn));

// handle events when window is scrolled
window.addEventListener('scroll',()=>{
    moveNavBottomMobile();
    checkScrollToBottom();
    handleShadow();
})


//hide body until css and js files are loaded
//initialize cards when loaded
document.addEventListener('DOMContentLoaded',()=>{
    // display DOM
    document.body.style.display="block";
   
    // creates cards and append them to procuct container
    loadFirstCards();
    //initialize cart accroding to cart items in local storage
    updateCart();
    
})


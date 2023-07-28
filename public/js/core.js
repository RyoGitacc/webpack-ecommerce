import '../css/home.scss'
import '../css/navbar.scss'
import '../css/carousel.scss'
import '../css/select.scss'
import '../css/slider.scss'
import { moveNavBottomMobile, triggerClickEvent} from './navbar.js'
import {openSelect,closeSelect,selectOption,selectedCategory,selectedType} from './select.js'
import { handleSlider, min,max} from './slider'
import { loadMoreCards, loadFirstCards,selectGender, filterItems,hasMoreItems, isLoading, sortItems, searchItem} from './filter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse,Carousel,Spinner } from "bootstrap";
import * as bootstrap from 'bootstrap'

//import icons
import cart from '../assets/icons/cart.svg';
import downArrow from '../assets/icons/down-arrow.svg';
import upArrow from '../assets/icons/up-arrow.svg';
import heart from '../assets/icons/heart.svg';
import login from '../assets/icons/login.svg';
import search from '../assets/icons/search.svg';
import search2 from '../assets/icons/search2.svg';

//import images
import summersale from '../assets/image/summersale.webp'
import accessories from '../assets/image/accessories.webp'
import forceMajeure from '../assets/image/force-majeure.webp'
import guyInShirt from '../assets/image/guy-in-shirt.webp'
import newArrivals from '../assets/image/newarrivals.webp'
import poloShirt from '../assets/image/polo-shirt.webp'
import sleeveless from '../assets/image/sleevelesstop.webp'
import sneakerStyle from '../assets/image/sneaker-style.webp'
import sportbra from '../assets/image/sportbra.webp'




// const URL = "https://fashion-site2023-b1bf572760a8.herokuapp.com/"
const URL= "http://localhost:8080/"
const productContainer=document.querySelector(".product-container");
const genderContainer=document.querySelector('.gender-container');
const sort = document.querySelector(".sort");
const searchbar= document.querySelector('.searchbar');
const list2 = document.querySelector('.list2');
const shadow = document.querySelector('.shadow')

//set icons to navigation bar
const iconsForNavbar=[search,login,heart,cart]
const navIcons = document.querySelectorAll('.nav-icon');
console.log(navIcons)
iconsForNavbar.forEach((i,index)=>{
    navIcons[index].src=i;
})

//set search icon to search bar
const searchbarIcon = document.querySelector('.searchbar-icon');
searchbarIcon.src=search2;

//set images to carousel
const imgsForCarousel = [guyInShirt,sleeveless,sportbra,poloShirt];
const carouselImgs = document.querySelectorAll('.carousel-img')
imgsForCarousel.forEach((c,index)=>{
    carouselImgs[index].src=c;
})

//set svg arrow down to select.ejs
const downArrowSVGs=document.querySelectorAll('.down-arrow');
downArrowSVGs.forEach(d=>{
    d.src=downArrow;
})

//handle shodow for sneaker styles on and off
function handleShadow(){
    const rect = list2.getBoundingClientRect();
    console.log(rect.top)
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
        filterItems(selectedCategory,selectedType,max,min)
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
     if(offsetY >= document.body.offsetHeight - 50  && hasMoreItems && !isLoading){
       loadMoreCards()
       console.log('bottom')
     }
}

// trigger filter events
filterList.addEventListener('click',(e)=>triggerFilterEvent(e));
// trigger sorting events
sort.addEventListener('change',()=>sortItems(sort.value));

//navigation bar event handler
const navBottom=document.querySelector('.navigation-bottom');
navBottom.addEventListener('click',e=>triggerClickEvent(e));

// trigger searching items
searchbar.addEventListener('submit', searchItem)

//handle click gender button event on navigation bar
genderContainer.addEventListener('click',(e)=>selectGender(e));

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
    loadFirstCards()
})


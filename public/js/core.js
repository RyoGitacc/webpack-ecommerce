import '../css/home.scss'
import '../css/navbar.scss'
import '../css/carousel.scss'
import '../css/select.scss'
import '../css/slider.scss'
import { moveNavBottomMobile, triggerClickEvent} from './navbar.js'
import {openSelect,closeSelect,selectOption,selectedCategory,selectedType} from './select.js'
import { handleSlider, min,max} from './slider'
import { createCard } from './createNodeFromText'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse,Carousel } from "bootstrap";
import * as bootstrap from 'bootstrap'

//import icons
import cart from '../assets/icons/cart.svg';
import downArrow from '../assets/icons/down-arrow.svg';
import upArrow from '../assets/icons/up-arrow.svg';
import halfStar from '../assets/icons/half-star.svg';
import heartPlus from '../assets/icons/heart-plus.svg';
import heart from '../assets/icons/heart.svg';
import login from '../assets/icons/login.svg';
import search from '../assets/icons/search.svg';
import search2 from '../assets/icons/search2.svg';
import star from '../assets/icons/star.svg';

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

//import product images
// import c from '../assets/productImage/summersale.webp'


// const URL = "https://fashion-site2023-b1bf572760a8.herokuapp.com/"
const URL= "http://localhost:8080/"

//set icons to navigation bar
const iconsForNavbar=[search,login,heart,cart]
const navIcons = document.querySelectorAll('.nav-icon');
console.log(navIcons)
iconsForNavbar.forEach((i,index)=>{
    navIcons[index].src=i;
})


//set images to carousel
const imgsForCarousel = [guyInShirt,sleeveless,sportbra,poloShirt];
const carouselImgs = document.querySelectorAll('.carousel-img')
imgsForCarousel.forEach((c,index)=>{
    carouselImgs[index].src=c;
})

//navigation bar event handler
const navBottom=document.querySelector('.navigation-bottom');

navBottom.addEventListener('click',e=>triggerClickEvent(e));
window.addEventListener('scroll',moveNavBottomMobile)

//set svg arrow down to select.ejs
const downArrowSVGs=document.querySelectorAll('.down-arrow');
downArrowSVGs.forEach(d=>{
    d.src=downArrow;
})

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
    console.log(selectedCategory,selectedType,min,max)
   }  
}
filterList.addEventListener('click',(e)=>triggerFilterEvent(e))

// slider
const sliders = document.querySelectorAll('.slider-input');
sliders.forEach(s=>{
    s.addEventListener('input', handleSlider)
})

//load initial cards to product container
const productContainer=document.querySelector(".product-container");
function fetchItems(URL){
  return new Promise((resolve,reject)=>{
       fetch(URL + 'data',{
        headers:{
        'Content-Type':'application/json'
        }
       }).then(response=>{
        if(response.status === 200) {
            resolve(response.json()); return;
        }
        else throw new Error('Request fail. Error code is ' + response.status)
       }).catch(err=>{
          reject(err); return;
       })
  })
}


//hide body until css and js files are loaded
document.addEventListener('DOMContentLoaded',()=>{
    document.body.style.display="block";
    // initialize cards
    fetchItems(URL).then(items=>{
        items.forEach(i=>{
            const cardNode = createCard(i);
            const heartPlusIcon = cardNode.querySelector('.heart-plus');
            heartPlusIcon.src=heartPlus;
            const stars=cardNode.querySelectorAll(".star")
            const halfStarImg=cardNode.querySelector('.half-star');
            stars.forEach(s=>{
                s.src=star
            })
            if(halfStarImg) halfStarImg.src=halfStar;
            productContainer.appendChild(cardNode)
        })
    }).catch(err=>{
        console.log(err)
    })
})
import * as bootstrap from 'bootstrap'
const myOffcanvas = document.getElementById('cart');
const bootstrapOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
const searchbarContainer= document.querySelector('.searchbar-container');
const searchInput = document.querySelector('.search-input')
const navBottomMobile = document.querySelector('.mobile-navigation-bottom');
let previosOffsetY=0

export function triggerClickEvent(e){
  if(e.target.classList[1] === 'cart-icon'){
    bootstrapOffcanvas.show();
  }
  else if(e.target.classList[1] === 'search-icon'){
    searchbarContainer.style.display="flex";
    searchInput.focus();
    
  }
  else if(e.target.classList[0] === 'search-close-container'){
    searchbarContainer.style.display="none";
    searchInput.value=""
  }
}

export function moveNavBottomMobile(){

    if((window.scrollY - previosOffsetY) > 0){
        navBottomMobile.classList.add("hide")
    }
    else{
        navBottomMobile.classList.remove("hide")
    }
    previosOffsetY = window.scrollY
}



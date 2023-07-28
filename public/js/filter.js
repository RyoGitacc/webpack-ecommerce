import { createCard,spinner} from "./createNodeFromText.js";
// import { createCard, removeChildren} from "./card.js";
// import { stringToNode } from "./shoppingCart.js";
const productContainer=document.querySelector(".product-container");
const sort = document.querySelector(".sort");


// const URL = "https://stormy-tundra-83234-974f64c39645.herokuapp.com/"
const URL = "http://localhost:8080/"



export let hasMoreItems=true;
export let isLoading=false;

// function to remove all children
function removeChildren(parent){
    while(parent.firstChild){
       parent.removeChild(parent.lastChild)
    }
}

// function to make HTTP get request to fetch items
export function fetchItems(URL){
    return new Promise((resolve,reject)=>{
         fetch(URL,{
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


// fucntin to first append cards to product container when page loaded
export function loadFirstCards(){
    fetchItems(URL + 'data').then(items=>{
        items.forEach(i=>{
            productContainer.appendChild(createCard(i))
        })
    }).catch(err=>{
        console.log(err)
    })
}

// function to load more items
export function loadMoreCards(){
    isLoading=true;
    fetchItems(URL + 'loadMore').then(items=>{
      productContainer.appendChild(spinner);
      if(items.length === 0){
         spinner.remove(); isLoading=false; hasMoreItems=false;
        }else{
          setTimeout(()=>{
           spinner.remove();
           items.forEach(i=>{
             productContainer.appendChild(createCard(i))
          })
          isLoading=false;
          },1500)
        }
    }).catch(err=>{
       console.log(err); spinner.remove()
    })
 }

function fetchPostRequest(url,data){
  return new Promise((resolve,reject)=>{
    fetch(url,{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(data)
  }).then(response=>{
    if(response.status !== 200) throw new Error("something went wrong" + response.status);
    else resolve(response.json()); return;
  }).catch(err=>{
    console.log(err); reject(err); return;
  })
})
}


function fetchFilterdItems(url,data,isSort){
  hasMoreItems=true;
  isLoading=true;
  removeChildren(productContainer);
  productContainer.appendChild(spinner)
  scrollTo(0, 0);
  // contentsTitle.scrollIntoView({behavior:'smooth', block:'start'});
  fetchPostRequest(url,data).then(items=>{
    setTimeout(()=>{
          spinner.remove(); isLoading=false;
          items.forEach(f=>{
              productContainer.appendChild(createCard(f))
          })
        },1000)
        if(!isSort) sort.value="all" 
  }).catch(err=>{
    spinner.remove(); isLoading=false;
    alert("something went wrong. Please try again" + err)
  })
}

//submit data to filter items by filter condition
export function filterItems(selectedCategory, selectedType,max,min){

  if(min > max){
    const temp = min;
    min = max;
    max = temp
  }

  const condition={
    category:selectedCategory,
    type:selectedType,
    min,
    max,
  }
  fetchFilterdItems(URL + 'filter',condition)
}


//filter items by gender
export function selectGender(e){
  if(e.target.tagName === 'LABEL'){
    console.log(e.target.innerText)
    // contentsTitle.scrollIntoView({behavior:'smooth', block:'start'});
    // resetSelect();
    // resetSlider();
    const gender = e.target.innerText;
    console.log(gender)
    fetchFilterdItems(URL + "gender", {gender})
  }
}

//sort items
export function sortItems(value){
 if(value){
   const sortBy = value;
   fetchFilterdItems(URL + "sort", {sortBy}, true)
 }
}

//search items 
export function searchItem(e){
  e.preventDefault();
  const keyword=e.target.keyword.value;
  if(keyword) fetchFilterdItems(URL + "search",{keyword})
}




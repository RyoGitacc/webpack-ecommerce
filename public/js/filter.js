
import { createCard,spinner} from "./createNodeFromText.js";
const productContainer=document.querySelector(".product-container");
const mainContents=document.querySelector(".main-contents")

const sort = document.querySelector(".sort");

// const URL = "https://stormy-tundra-83234-974f64c39645.herokuapp.com/"
const URL = "http://localhost:8080/"



export let hasMoreItems=true;
export let isLoading=false;

let currentItems=[];
let loadCount=1;
const limit = 4;

export function changeTextInFilterBtn(filterBtn){
  if(filterBtn.classList.contains('open')){
      filterBtn.innerHTML = "+ add filter";
      filterBtn.classList.remove('open');
  }
  else{
      filterBtn.innerHTML= "- close filter";
      filterBtn.classList.add('open')
  }
}

// function to remove all children
export function removeChildren(parent){
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
    isLoading = true;
    fetchItems(URL + "data").then(items=>{
      currentItems=items;
      const firstCards = items.slice(0,limit);
      firstCards.forEach(i=>{
                productContainer.appendChild(createCard(i))
      })
    })
     // scroll position restoration triggers when refresh. this settimeout enables scroll top
     // after the restoration. 3ms is set to be compatible for many browsers
    setTimeout(()=>{
            window.scrollTo(0,-1);
          },300)
          setTimeout(()=>{
            isLoading=false;
          },500)
}

// function to load more items
export function loadMoreCards(){
  if(hasMoreItems && !isLoading){
    isLoading=true;
    productContainer.appendChild(spinner);
    const slicedItems = currentItems.slice((loadCount * limit), (loadCount * limit + limit));
      if(slicedItems.length === 0){
          spinner.remove(); isLoading=false; hasMoreItems=false;
      }else{
         setTimeout(()=>{
           spinner.remove();
           slicedItems.forEach(i=>{
               productContainer.appendChild(createCard(i))
           })
           isLoading=false;
           loadCount++;
         },1000)
     }
  }
}


function sendPostRequest(url,data){
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


function fetchFilterdItems(url,condition){
  hasMoreItems=true;
  isLoading=true;
  removeChildren(productContainer);
  productContainer.appendChild(spinner)
  mainContents.scrollIntoView({behavior:"smooth", block:"start"})

  
  sendPostRequest(url,condition).then(items=>{
    currentItems = items;
    const slicedItems = items.slice(0,limit);
    setTimeout(()=>{
          spinner.remove(); isLoading=false;
          slicedItems.forEach(f=>{
              productContainer.appendChild(createCard(f))
          })
        },1000)
        loadCount=1;
  }).catch(err=>{
    spinner.remove(); isLoading=false;
    alert("something went wrong. Please try again" + err)
  })
}

//submit data to filter items by filter condition
export function filterItems(gender,selectedCategory, selectedType,max,min){

  if(min > max){
    const temp = min;
    min = max;
    max = temp
  }

  const condition={
    gender:gender,
    category:selectedCategory,
    type:selectedType,
    min,
    max,
  }
  fetchFilterdItems(URL + 'filter',condition)
}




//sort items
export async function sortItems(value){
  if(value){
           isLoading=true;
           hasMoreItems=true;
           loadCount =1;

           const sortCondition = {
                   sortBy:value,
                   items:currentItems
           }

           removeChildren(productContainer);
           productContainer.appendChild(spinner)
           mainContents.scrollIntoView({behavior:"smooth", block:"start"})
  try{
    const response = await fetch(URL + "sort",
    {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
    body:JSON.stringify(sortCondition)})

    if(response.status !== 200)   throw new Error("something went wrong" + response.status)
    currentItems = await response.json();  
    const slicedItems = currentItems.slice(0,limit);

    setTimeout(()=>{
            spinner.remove(); isLoading=false;
            slicedItems.forEach(f=>{
                productContainer.appendChild(createCard(f))
            })
    },1000)
    
  }catch(err){
    isLoading=false; console.log(err);
  }
}
}



//search items 
export function searchItem(e){
  e.preventDefault();
  const keyword=e.target.keyword.value;
  if(keyword) fetchFilterdItems(URL + "search",{keyword})
}




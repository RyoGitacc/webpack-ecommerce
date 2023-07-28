
export let selectedCategory="";
export let selectedType="";

export function openSelect(target){
    const selectMenu = target.nextElementSibling;
    const numOfOptions = selectMenu.children.length;
    selectMenu.style.height=`${numOfOptions * 30}px`;
    selectMenu.style.borderBottom="1.5px solid #999994";
    target.classList.add("open");
    target.style.borderBottom="none"
}

export function closeSelect(target){
    const selectMenu = target.nextElementSibling;
    selectMenu.style.height="0px";
    setTimeout(()=>{
         selectMenu.style.borderBottom="none"
         target.style.borderBottom="1.5px solid #999994";
    },200)
    target.classList.remove("open");
  }

export function selectOption(option){
    const select=option.closest('.select');
    const selectedValueContainer = select.querySelector('.selected-value-container')
    const selectedValue = selectedValueContainer.children[0];
    selectedValue.innerText=option.innerText;
    if(select.classList.contains('Category')){
        selectedCategory = option.innerText === "All categories" ? "":option.innerText;
    }
    else if(select.classList.contains('Type')){
        selectedType = option.innerText === "Any type" ? "" : option.innerText;
    }
 
    closeSelect(selectedValueContainer);
  }






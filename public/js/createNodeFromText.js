

export function createCard(card){
    var cardText=`  
    <div class="card">
      <img alt="" class="heart-plus">
      <img src="../assets/productImage/${card.img}" alt="" class="card-img">
      <div class="card-body">
        <p class="card-name">${card.name}</p>
        $${card.price}
        <p class="review">
            <span class="stars-container"></span>
            <span class="review-num">
             (${card.reviews.length})
            </span>
        </p>
      </div>
      <div class="card-footer">
        <button class="add-cart-btn" data='${JSON.stringify(card)}' %>
            <span class="plus-icon">+</span> 
            ADD TO CART
        </button>
      </div>
    </div>`
    
    const template=document.createElement('div');
    template.innerHTML=cardText.trim();
    const cardNode = template.firstChild;
    
    //when no reviews for the item, remove reviews element
    if(card.reviews.length === 0){
        const cardReview = cardNode.querySelector(".review");
        cardReview.remove();
        return  cardNode;
      }
      
      // add stars 
      let sum= card.reviews.reduce((accum, cr)=>{
          return accum + cr.stars
      },0)
      
      const starsContainer = cardNode.querySelector(".stars-container")
      const avarage = sum / card.reviews.length;
      const quotient = Math.floor(avarage);
      const remainder = Math.floor((avarage % quotient) * 10) / 10;
      
      for(var i=0;i<quotient;i++){
          const star = document.createElement('img');
          star.classList="star"
          
          starsContainer.appendChild(star);
      }
  
      if(remainder > 0.2){
          const halfStar=document.createElement('img');
          halfStar.classList="half-star"
          starsContainer.appendChild(halfStar)
      }
  
      return cardNode;
  }
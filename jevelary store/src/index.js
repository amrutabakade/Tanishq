let shop= document.getElementById('shop');


let basket=JSON.parse(localStorage.getItem("data")) || [];    

let generateShop=()=>{
    return(
        shop.innerHTML=shopItemData.map(x=>{
            let {id,name,price,description,imgs}=x;
            let search = basket.find((x)=> x.id === id)||[];
            return(
                 ` <div class="shop" id="shop">
                <div class="item">
                    <img src=${imgs} width="220px" height= "230px">
                    <div class="details">
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <div class="price-quntity">
                            <h2>${price}$</h2>
                            <div class="buttons">
                                <i  onclick= "decrement(${id})" class="bi bi-dash" ></i>
                                <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                                </div>
                                <i   onclick= "increment(${id})" class="bi bi-plus"></i> 
                            </div>
                        </div>
                    </div>
                </div>`);
        }).join("")
    )
} 


generateShop();

let increment = (id)=>{
   let selectedItem = id; 
   let srch = basket.find((x)=> x.id === selectedItem.id);
   if(srch === undefined)
   {
            basket.push({
                id:selectedItem.id,
                // here selectitem.id is used to dispaly only id of item not the complete div.
                item:1,
            });
    }
    else{
        srch.item += 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id); 
}


let decrement = (id)=>{
    let selectedItem = id; 
   let srch = basket.find((x)=> x.id === selectedItem.id);
   if (srch=== undefined) return;
   if(srch.item === 0)
    return;
    else{
        srch.item -= 1;
    }
    // localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id); 
    basket = basket.filter((x)=> x.item !==0);
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id)=>{
   let search = basket.find((x)=>x.id===id);
//    above line returns an OBJECT from basket so that item and id will be accessesible
   document.getElementById(id).innerHTML= search.item;
   calculation()
}

let calculation = ()=>{
     let cartIcon =document.getElementById('cartAmount');
     cartIcon.innerHTML= basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
}

calculation();// recalculate
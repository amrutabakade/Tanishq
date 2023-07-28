let label = document.getElementById("label");
let shoppingCart = document. getElementById("shopping-cart");


let basket=JSON.parse(localStorage.getItem("data")) || [];   
console.log(basket);
let calculation = ()=>{
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML= basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
}

calculation();// recalculate

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
     generateCart();
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
     generateCart();
     localStorage.setItem("data", JSON.stringify(basket));
 }
 
 let update = (id)=>{
    let search = basket.find((x)=>x.id===id);
 //    above line returns an OBJECT from basket so that item and id will be accessesible
    document.getElementById(id).innerHTML= search.item;
    calculation();
    totalAmount();
 }
 

let generateCart = () =>
{
    if(basket.length !==0)
    {
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let search = shopItemData.find((y)=>x.id===y.id)|| [];
            return `
            <div class = "cart-item">
                <img class="img" width = "100" height="100" src = ${search.imgs}/>
                <div class="details">

                    <div class = "title-price-x">
                      <h4>
                        <p>${search.name}</p>
                        <p  class = "title-price" >$ ${search.price}</p>
                      </h4>
                      <i onclick= "remove(${x.id})" class="bi bi-x-square"></i>
                    </div> 

                    <div class="buttons">
                        <i  onclick= "decrement(${x.id})" class="bi bi-dash" ></i>
                        <div id=${x.id} class="quantity">
                        ${x.item}
                        </div>
                        <i   onclick= "increment(${x.id})" class="bi bi-plus"></i> 
                    </div>

                    <h4>$ ${x.item * search.price} </h4>
                </div>
            </div>

            `
        })
        .join(" "))
    }
    else{
        shoppingCart.innerHTML = ``; 
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href = "index.html">
        <button>back to home </button>
        </a>
        `
    }
}

let remove=(id)=>
{
    let selected=id;
    basket = basket.filter((x)=>x.id !== selected.id);
    localStorage.setItem("data", JSON.stringify(basket));//remove the object from local storage and set item count to 0
    calculation();
    generateCart();
    totalAmount();
}

let totalAmount =() =>{
    if(basket.length !==0)
    {
        let amount = basket.map((x)=>
        {
            let search = shopItemData.find((y)=>y.id===x.id)
            return x.item* search.price;
        }).reduce((x,y)=>x+y,0);
       
       label.innerHTML= `
       <h2>Total bill : $ ${amount}</h2>
       <button class = "checkOut">checkout</button>
       <button onclick="removeAll()" class = "clear">Clear All</button>
       `
    }
    else return;
}

let removeAll=()=>
{
    basket=[];
    generateCart();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
}

totalAmount();

calculation();
generateCart();

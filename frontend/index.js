async function formHandler(event) {
  event.preventDefault();
  const candyShopDeatail = {
    candyName: event.target.candyName.value,
    description: event.target.description.value,
    price: event.target.price.value,
    quantity: event.target.quantity.value,
  };
  const candyData = await axios.post("http://localhost:3000/candyShop", JSON.stringify(candyShopDeatail), {
    headers: {
      "Content-Type": "application/json",
    },
  })

  // console.log(responseData);
  showCandy(candyData.data.responseData);
}

async function updateQuantity(event){
  let btnNumber=null;
    const parent = event.target.parentNode;
    const id = parent.querySelector(".candyId").innerText;
    const btnText = event.target.innerText;
    if(btnText==='Buy1'){
      btnNumber=1;
    }else if(btnText==='Buy2'){
      btnNumber=2;
    }else{
      btnNumber=3;
    }
  
    const totalCandy = await axios.put(`http://localhost:3000/candyShop/${id}`,{btnNumber:btnNumber},{
      headers: {
        "Content-Type": "application/json",
      },
    })
    
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const allCandyData = await axios.get("http://localhost:3000/candyShop");
    const newObj = allCandyData.data.responseData;
    for (let i = 0; i < newObj.length; i++) {
      showCandy(newObj[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

async function showCandy(newCandy) {
  const candyArray = Object.entries(newCandy);
  const ul = document.createElement("ul");
  for (let i = 0; i < candyArray.length; i++) {
    const [key, value] = candyArray[i];
    const li = document.createElement("li");
    li.innerText = value;
    li.classList.add(key);
    ul.append(li);
  }

  const buy1 = document.createElement("button");
  buy1.innerText = "Buy1";
  buy1.setAttribute("onclick", "updateQuantity(event)");
  buy1.classList.add("buy1")

  const buy2 = document.createElement("button");
  buy2.innerText = "Buy2";
  buy2.setAttribute("onclick", "updateQuantity(event)");
  buy2.classList.add("buy2")


  const buy3 = document.createElement("button");
  buy3.innerText = "Buy3";
  buy3.setAttribute("onclick", "updateQuantity(event)");
  buy3.classList.add("buy3")


  ul.append(buy1);
  ul.append(buy2);
  ul.append(buy3);

  const form = document.querySelector("form");
  form.after(ul);

  const input = document.querySelectorAll("input");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}

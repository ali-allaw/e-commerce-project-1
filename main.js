// get elements 
let thumbnails = document.querySelectorAll(".body .box-2 img");
let bigImg = document.querySelectorAll(".body .box-1 img")
let thumbnails2 = document.querySelectorAll(".body .box-2-popup img");
let bigImg2 = document.querySelectorAll(".body .box-1-popup img")
let popup = document.querySelector(".body .popup")
let overlay = document.querySelector(".page .overlay");
let counter = 0;
let prev_next = document.querySelectorAll(".prev-next img")
let minusBtn = document.querySelector(".cart-foot form img.minus-i")
let plusBtn = document.querySelector(".cart-foot form img.plus-i")
let inputCount = document.querySelector(".cart-foot form input")
let main_price = document.querySelector(".main-price")
let numOfItems = 0;
let items_num_thumb = document.querySelector("p.items-num-thumb")
let addBtn = document.querySelector(".add-to")
let main_cart = document.querySelector(".cart-items-list")
let ul_cart_list = document.querySelector("ul.cart-items")
let designed_card = document.querySelector(".designed-card")

function dry(thumb, imgs) {
    thumb.forEach(image => {
        image.onclick = (e) => {
            thumb.forEach(e => {
                e.classList.remove("active-thumb");
            });
            e.currentTarget.classList.add("active-thumb");
            let targeted = e.currentTarget;
            imgs.forEach(img => {
                if (img.dataset.img == targeted.dataset.img) {
                    imgs.forEach(e => {
                        e.classList.add("d-none");
                    });
                    img.classList.remove("d-none");
                }
            });
        };
    });
}

// thumbnails onclick function
dry(thumbnails, bigImg)
dry(thumbnails2, bigImg2)

// popup function
bigImg.forEach(img => {
    img.onclick = () => {
        popup.classList.remove("d-none")
        overlay.classList.remove("d-none")
    };
});

// previous and next img function
prev_next.forEach(img => {
    img.onclick = () => {
        if (img.src == "http://127.0.0.1:5500/images/icon-previous.svg") { 
            if (counter == 0) {
                counter = 4
            }
            counter--
            thumbnails2.forEach(thumb => {
                thumb.classList.remove("active-thumb")
            })
            thumbnails2[counter].classList.add("active-thumb")
        } else {
            if (counter == 3) {
                counter = -1
            }
            counter++
            thumbnails2.forEach(thumb => {
                thumb.classList.remove("active-thumb")
            })
            thumbnails2[counter].classList.add("active-thumb")
        }
        let targeted = thumbnails[counter];
        bigImg2.forEach(img => {
            if (img.dataset.img == targeted.dataset.img) {
                bigImg2.forEach(e => {
                    e.classList.add("d-none");
                });
                img.classList.remove("d-none");
            }
        });
    }
});

// disable overlay
overlay.onclick = () => {
    popup.classList.add("d-none")
    overlay.classList.add("d-none")
};


// function to plus and minus btns
let matcher = /[0-9]/ig;
let main_price_num = main_price.innerHTML.match(matcher).join("");
let newPr;

plusBtn.onclick = () => {
    inputCount.value++
    newPr = inputCount.value * main_price_num
    main_price.innerHTML = `$${newPr}`
};
minusBtn.onclick = () => {
    if (inputCount.value > 0) {
        inputCount.value--
        newPr -=  12500
        main_price.innerHTML = `$${newPr}`
    }
};

// function show cart
designed_card.onclick = () => {
    main_cart.classList.toggle("d-none")
}

// function add to cart;
addBtn.onclick = () => {
    addToCart()
    createItemList()
}
function addToCart() {
    numOfItems++
    items_num_thumb.innerHTML = numOfItems;
}


// function to create an item in the list
let removeBtn;
function createItemList() {

    let li = document.createElement("li")

    let productImg = document.createElement("img")
    productImg.src = "/images/image-product-1-thumbnail.jpg"
    productImg.classList.add("cart-item-img")
    productImg.classList.add("w-25")

    let content = document.createElement("div")
    let contentP = document.createElement("p")
    let contentPText = document.createTextNode("Autnum Limited")
    contentP.appendChild(contentPText)

    let cart_item_price = document.createElement("div")
    cart_item_price.classList.add("cart-item-price")
    let cart_item_price_P1 = document.createElement("P")
    cart_item_price_P1.innerHTML = `$125.00 x ${inputCount.value}`;
    cart_item_price_P1.classList.add("cart-item-price-P1")
    let cart_item_price_P2 = document.createElement("p")
    cart_item_price_P2.innerHTML = `$${125.00 * inputCount.value}.00`
    cart_item_price_P2.classList.add("cart-item-price-P2")

    cart_item_price.appendChild(cart_item_price_P1)
    cart_item_price.appendChild(cart_item_price_P2)

    content.appendChild(contentP)
    content.appendChild(cart_item_price)

    removeBtn = document.createElement("img")
    removeBtn.src = "/images/icon-delete.svg"
    removeBtn.classList.add("remove-item-btn")

    li.appendChild(productImg)
    li.appendChild(content)
    li.appendChild(removeBtn)

    ul_cart_list.appendChild(li)
    removeBtnFunction(removeBtn)
}

// removeBtnFunction
function removeBtnFunction(e) {
    e.onclick = () => {
        e.parentElement.remove()
        numOfItems--
    items_num_thumb.innerHTML = numOfItems;

    }
}

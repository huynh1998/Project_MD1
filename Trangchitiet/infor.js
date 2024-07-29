const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");

const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const inputQuantity = document.getElementById("input-quantity");

const error = document.getElementById("error");
const addToCart = document.getElementById("add-to-cart");

const numberCart = document.getElementById("count-item-cart");

let product;

function renderUser() {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  const cart = userLogin.cart;
  if (userLogin) {
    userName.innerHTML = userLogin.name;
    logOut.style.display = "block";

    //Hien thi len gio hang
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
      count += cart[i].quantity;
    }
    numberCart.innerHTML = count;
  } else {
    logOut.style.display = "none";
  }
}
renderUser();

logOut.addEventListener("click", function () {
  console.log("oke");
  localStorage.removeItem("userlogin");
  window.location.href = "../Đăng ký - đăng nhập/TrangLogin/dangnhap.html";
  renderUser();
});

function renderDetailProduct() {
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const productId = JSON.parse(localStorage.getItem("productId"));

  product = dbProduct.find((el) => el.id === productId);

  productImage.src = product.image;
  productName.innerHTML = product.name;
  productPrice.innerHTML = product.price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

renderDetailProduct();

btnMinus.addEventListener("click", function () {
  if (+inputQuantity.value > 1) {
    inputQuantity.value = +inputQuantity.value - 1;
  }
});

btnPlus.addEventListener("click", function () {
  inputQuantity.value = +inputQuantity.value + 1;
});

addToCart.onclick = function () {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));

  if (!userLogin) {
    error.textContent = "Bạn chưa đăng nhập, xin vui lòng đăng nhập";
    return;
  } else {
    error.textContent = "";
  }

  if (+inputQuantity.value <= 0) {
    error.textContent = "Mời bạn nhập lại số lượng";
    return;
  } else {
    error.textContent = "";
  }

  const cart = userLogin.cart;
  const productId = JSON.parse(localStorage.getItem("productId"));

  const vitri = cart.findIndex((element) => element.productId === productId);

  if (vitri !== -1) {
    cart[vitri].quantity += +inputQuantity.value;
    userLogin.cart = cart;
    window.localStorage.setItem("userlogin", JSON.stringify(userLogin));
  } else {
    cart.push({
      productId: product.id,
      quantity: +inputQuantity.value,
    });

    userLogin.cart = cart;
    window.localStorage.setItem("userlogin", JSON.stringify(userLogin));
  }

  //Hien thi len gio hang
  let count = 0;

  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  numberCart.innerHTML = count;
};

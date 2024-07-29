const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");
const numberCart = document.getElementById("count-item-cart");
const listItemCart = document.getElementById("list-item-cart");

const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const inputQuantity = document.getElementById("input-quantity");

const totalPriceProduct = document.getElementById("total-price");
const totalPriceReality = document.getElementById("total-reality");
const Inputvoucher = document.getElementById("voucher");
const btnPayment = document.getElementById("btn-payment");

const orderBill = document.getElementById("order");

function renderCart() {
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
renderCart();

function renderPayment() {
  const dbProduct = JSON.parse(localStorage.getItem("products"));
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  const cart = userLogin.cart;
  let stringProductHTML = "";
  let totalPrice = 0;

  for (let idx in cart) {
    const product = dbProduct.find((el) => el.id == cart[idx].productId);
    totalPrice += product.price * cart[idx].quantity;
    stringProductHTML += `<tbody>
              <tr>
                <td>
                  <img
                    src="${product.image}"
                    alt=""
                    class="product-image"
                  />
                </td>
                <td>${product.name}</td>
                <td>${new Intl.NumberFormat("vi-VN", {
                  style: "decimal",
                }).format(product.price)}VNĐ</td>
                <td>
                  <div class="quantity-control">
                    <button onclick='minusQuanity(${
                      cart[idx].productId
                    })' class="quantity-btn">-</button>
                    <span id="input-quantity" style="margin: 0 8px;">${
                      cart[idx].quantity
                    }</span>
                    <button onclick = "plusQuanity(${
                      cart[idx].productId
                    })" class="quantity-btn">+</button>
                  </div>
                </td>
                <td>${new Intl.NumberFormat("vi-VN", {
                  style: "decimal",
                }).format(product.price * cart[idx].quantity)}VNĐ</td>
              </tr>`;
  }

  listItemCart.innerHTML = stringProductHTML;

  totalPriceProduct.innerHTML = totalPrice.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  totalPriceReality.innerHTML = totalPrice.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  //   const discount = parseFloat(+Inputvoucher.value) || 0;
  //   totalReality = totalPrice * (1 - discount / 100);
  //   console.log(totalReality);
  //   totalPriceReality.innerHTML = totalReality;
}
renderPayment();

// btnPayment.onclick = function () {
//   renderPayment();
// };

// Thêm số lượng sản phẩm

function plusQuanity(productId) {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  const cart = userLogin.cart;

  const vitri = cart.findIndex((el) => el.productId === productId);
  cart[vitri].quantity += 1;
  userLogin.cart = cart;
  localStorage.setItem("userlogin", JSON.stringify(userLogin));
  //Hien thi len gio hang
  let count = 0;

  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  numberCart.innerHTML = count;
  renderPayment();
}

// Xóa số lượng sản phẩm

function minusQuanity(productId) {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  const cart = userLogin.cart;

  const vitri = cart.findIndex((el) => el.productId === productId);

  if (cart[vitri].quantity === 1) {
    cart.splice(vitri, 1);
    userLogin.cart = cart;
    localStorage.setItem("userlogin", JSON.stringify(userLogin));
    renderPayment();
    return;
  }

  cart[vitri].quantity -= 1;

  userLogin.cart = cart;
  localStorage.setItem("userlogin", JSON.stringify(userLogin));
  //Hien thi len gio hang
  let count = 0;

  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  numberCart.innerHTML = count;
  renderPayment();
}

orderBill.onclick = function () {
  window.location.href = "../trangthanhtoan/thanhtoan.html";
};

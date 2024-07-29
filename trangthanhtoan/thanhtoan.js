const orderBill = document.getElementById("order");
const productCart = document.getElementById("product");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total-price");

const inputName = document.getElementById("name");
const inputAddress = document.getElementById("address");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputNote = document.getElementById("order-notes");

const basicEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let totalPrice = 0;
const errorName = document.getElementById("error-name");
const errorAddress = document.getElementById("error-address");
const errorPhone = document.getElementById("error-phone");
const errorEmail = document.getElementById("error-email");

function renderCart() {
  const dbProduct = JSON.parse(localStorage.getItem("products"));
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));

  const cart = userLogin.cart;

  totalPrice = 0;
  let stringProductHTML = "";

  for (let idx in cart) {
    const product = dbProduct.find((el) => el.id == cart[idx].productId);
    totalPrice += product.price * cart[idx].quantity;
    stringProductHTML += `

        <div style="display: flex; justify-content: space-between; width: 100%" >
              <p>${product.name}</p>

                <p>${new Intl.NumberFormat("vi-VN", {
                  style: "decimal",
                }).format(product.price * cart[idx].quantity)} VNĐ</p>
        </div>
    
    `;
  }
  productCart.innerHTML = stringProductHTML;
  subtotal.innerHTML =
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
    }).format(totalPrice) + " VNĐ";

  total.innerHTML =
    new Intl.NumberFormat("vi-VN", {
      style: "decimal",
    }).format(totalPrice) + " VNĐ";
}

renderCart();

orderBill.onclick = function () {
  const nameUser = inputName.value.trim();
  const emailUser = inputEmail.value.trim();
  const addressUser = inputAddress.value.trim();
  const phoneUser = inputPhone.value.trim();

  //_____________________________Điều kiện trống__________________________

  if (nameUser.length < 2) {
    errorName.textContent = "Mời bạn điền tên ";
    return;
  } else {
    errorName.textContent = "";
  }

  if (!addressUser) {
    errorAddress.textContent = "Mời bạn điền địa chỉ";
    return;
  } else {
    errorAddress.textContent = "";
  }

  if (!phoneUser) {
    errorPhone.textContent = "Mời bạn điền số điện thoại";
    return;
  } else {
    errorPhone.textContent = "";
  }

  if (!basicEmailPattern.test(emailUser)) {
    errorEmail.textContent = "Mời bạn điền email ";
    return;
  } else {
    errorEmail.textContent = "";
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));

  let newOrder = {
    id: orders.length === 0 ? 1 : orders[orders.length - 1].id + 1,
    userId: userLogin.id,
    name: nameUser,
    address: addressUser,
    phone: phoneUser,
    email: emailUser,
    note: inputNote.value,
    date: new Date(),
    status: 0,
    cart: userLogin.cart,
    total: totalPrice,
  };

  orders.push(newOrder);
  userLogin.cart = [];
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("userlogin", JSON.stringify(userLogin));
  window.location.href = "../Trang chủ/trangchu.html";
};

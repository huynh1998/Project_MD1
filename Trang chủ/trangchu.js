const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

const numberCart = document.getElementById("count-item-cart");

function renderUser() {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  const cart = userLogin.cart;
  if (userLogin) {
    userName.innerHTML = userLogin.name;
    logOut.style.display = "block";
    //Hiển thị count trên giỏ hàng khi ấn thêm giỏ hàng ở chi tiết sản phẩm
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
function logout() {
  console.log("12333");
}

logOut.addEventListener("click", function () {
  console.log("oke");
  localStorage.removeItem("userlogin");
  window.location.href = "./trangchu.html";
  renderUser();
});

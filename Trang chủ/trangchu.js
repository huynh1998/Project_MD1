const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

const numberCart = document.getElementById("count-item-cart");

function renderUser() {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));

  if (userLogin) {
    const cart = userLogin.cart;
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

logOut.addEventListener("click", function () {
  localStorage.removeItem("userlogin");
  window.location.href = "./trangchu.html";
  renderUser();
});

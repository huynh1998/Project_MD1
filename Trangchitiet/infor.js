const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

function renderUser() {
  const userLogin = JSON.parse(localStorage.getItem("userlogin"));
  if (userLogin) {
    userName.innerHTML = userLogin.name;
    logOut.style.display = "block";
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

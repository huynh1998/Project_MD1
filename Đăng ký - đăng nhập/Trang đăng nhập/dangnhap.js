const login = document.getElementById("login");
const inputNameLogin = document.getElementById("name-login");
const inputPasswordLogin = document.getElementById("password-login");

const errorNameLogin = document.getElementById("error-name");
const errorPasswordLogin = document.getElementById("error-password");

login.onclick = function () {
  const dbRegister = JSON.parse(localStorage.getItem("registers")) || [];
  const nameLogin = inputNameLogin.value.trim();
  const passwordLogin = inputPasswordLogin.value.trim();

  // Xét điều kiện khi khoong

  if (!nameLogin) {
    errorNameLogin.textContent = "Mời bạn nhập tên đăng nhập";
    return;
  } else {
    errorNameLogin.textContent = "";
  }

  if (!passwordLogin) {
    errorPasswordLogin.textContent = "Mời bạn nhập mật khẩu đăng nhập";
    return;
  } else {
    errorPasswordLogin.textContent = "";
  }

  //______________________Kiểm tra user có tồn tại trên dbRegister________________________________

  let user = dbRegister.find((element) => element.name === nameLogin);
  if (!user) {
    errorNameLogin.textContent = "Không tồn tại tài khoản này";
  } else {
    errorNameLogin.textContent = "";
  }

  //______________________Kiểm tra password có tồn tại trên dbRegister_____________________________

  if (user.password !== passwordLogin) {
    errorPasswordLogin.textContent = "Mật khẩu không đúng";
  } else {
    errorPasswordLogin.textContent = "";
  }

  inputNameLogin.value = "";
  inputPasswordLogin.value = "";

  if (user.role == 0) {
    localStorage.setItem("userlogin", JSON.stringify(user));
    window.location.href = "../../Trang chủ/index.html";
  } else {
    localStorage.setItem("adminlogin", JSON.stringify(user));
    window.location.href = "../Trang_user/user.html";
  }
};

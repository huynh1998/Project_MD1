const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirm = document.getElementById("confirm");
const register = document.getElementById("register");

const errorUser = document.getElementById("error-user");
const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");
const errorConfirm = document.getElementById("error-confirm");

const basicEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

register.onclick = function () {
  const dbRegister = JSON.parse(localStorage.getItem("registers")) || [];

  const nameUser = inputName.value.trim();
  const emailUser = inputEmail.value.trim();
  const passwordUser = inputPassword.value.trim();
  const confirmUser = inputConfirm.value.trim();

  //_____________________________Điều kiện trống__________________________

  if (nameUser.length < 2) {
    errorUser.textContent = "Mời bạn điền tên đăng ký";
    return;
  } else {
    errorUser.textContent = "";
  }

  if (!basicEmailPattern.test(emailUser)) {
    errorEmail.textContent = "Mời bạn điền email đăng ký";
    return;
  } else {
    errorEmail.textContent = "";
  }

  if (passwordUser.length < 6) {
    errorPassword.textContent = "Mời bạn điền mật khẩu đăng ký";
    return;
  } else {
    errorPassword.textContent = "";
  }

  if (confirmUser.length < 6) {
    errorConfirm.textContent = "Mời bạn xác nhận lại mật khẩu đăng ký";
  } else {
    errorConfirm.textContent = "";
  }

  // Điều kiện password = confirm

  if (passwordUser != confirmUser) {
    errorConfirm.textContent = "Mật khẩu không trùng nhau ";
    return;
  }

  //Điều kiện tên tài khoản đã có

  let vitri = dbRegister.findIndex(
    (element) => element.name.toLowerCase() === nameUser.toLowerCase()
  );

  if (vitri !== -1) {
    errorUser.textContent = " Đã tồn tại tài khoản này";
    return;
  }

  //Tạo ra 1 newUser

  let newUser = {
    id: dbRegister.length === 0 ? 1 : dbRegister[dbRegister.length - 1].id + 1,
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
    role: 0,
    status: true,
    cart: [],
  };

  dbRegister.push(newUser);
  localStorage.setItem("registers", JSON.stringify(dbRegister));
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
  inputConfirm.value = "";

  errorUser.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";
  errorConfirm.textContent = "";
};

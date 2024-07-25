const logout = document.getElementById("logout");

//____________________________đăng xuất_____________________________

logout.onclick = function () {
    localStorage.removeItem("")
  window.location.href = "http://127.0.0.1:5501/index.html";
};

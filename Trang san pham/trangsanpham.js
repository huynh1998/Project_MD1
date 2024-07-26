const productTree = document.getElementById("list-products");
const search = document.getElementById("search");
const inputProduct = document.getElementById("input-product");

const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

// Đẩy product trên admin  lên trang chủ sản phẩm

function renderProducts() {
  let dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];

  //   //Gán biến đó bằng biến lọc điều kiện (Search theo chữ cái)

  let stringCategoryHTML = "";
  for (idx in dbCategory) {
    let productOfCategory = dbProduct.filter(
      (el) => el.categoryId == dbCategory[idx].id
    );

    productOfCategory = productOfCategory.filter((el) =>
      el.name.toLowerCase().includes(inputProduct.value.trim().toLowerCase())
    );

    let stringProducHTMl = "";
    for (let jdx = 0; jdx < productOfCategory.length; jdx++) {
      stringProducHTMl += `
        <div class="product-tree">
            <div class="product-tree1">
              <div class="image">
                <a href="../Trangchitiet/infor.html">
                  <img src="${productOfCategory[jdx].image}" />
                </a>
              </div>
              <div class="text">
                <div class="price">
                  <p>${productOfCategory[jdx].name}</p>
                  <p>${new Intl.NumberFormat("vi-VN", {
                    style: "decimal",
                  }).format(productOfCategory[jdx].price)}VNĐ</p>
                </div>
                <div class="link">
                  <a href="">MUA NGAY</a>
                  <a href="">THÊM VÀO GIỎ HÀNG</a>
                </div>
              </div>
            </div>
        </div>
        `;
    }

    stringCategoryHTML += `
        <div class="list-product">
          <p>${dbCategory[idx].name}</p>

          <div style="display: flex; gap: 50px;">
            ${stringProducHTMl}
          </div>
        </div>
    `;
  }
  productTree.innerHTML = stringCategoryHTML;
}
renderProducts();

//__________________________________Search_____________________________________

const nameProduct = inputProduct.value.trim();
search.onclick = function () {
  renderProducts();
};

//___________________________________ĐĂNG NHẬP ___________________________________

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

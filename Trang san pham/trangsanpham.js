const productTree = document.getElementById("list-products");
const search = document.getElementById("search");
const inputProduct = document.getElementById("input-product");
const filterPrice = document.getElementById("filter-price");

const userName = document.getElementById("user-name");
const logOut = document.getElementById("log-out");

const addtoCart = document.getElementById("addtoCart");
const numberCart = document.getElementById("count-item-cart");

// Đẩy product trên admin  lên trang chủ sản phẩm

function renderProducts() {
  let dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];

  let stringCategoryHTML = "";
  for (idx in dbCategory) {
    let productOfCategory = dbProduct.filter(
      (el) => el.categoryId == dbCategory[idx].id
    );

    //Gán biến đó bằng biến lọc điều kiện (Search theo chữ cái)

    productOfCategory = productOfCategory.filter((el) =>
      el.name.toLowerCase().includes(inputProduct.value.trim().toLowerCase())
    );

    //Lọc theo gia PriceProduct

    switch (filterPrice.value) {
      case "0":
        break;

      case "1":
        productOfCategory = productOfCategory.filter(
          (element) => element.price < 200000
        );
        break;

      case "2":
        productOfCategory = productOfCategory.filter(
          (element) => element.price >= 200000 && element.price < 500000
        );
        break;

      case "3":
        productOfCategory = productOfCategory.filter(
          (element) => element.price >= 500000
        );
        break;
    }
    let stringProducHTMl = "";
    for (let jdx = 0; jdx < productOfCategory.length; jdx++) {
      stringProducHTMl += `
        <div class="product-tree" onclick="detailProduct(${
          productOfCategory[jdx].id
        })">
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
                  <button type='button'>MUA NGAY</button>
                  <button id="addtoCart" type='button'>THÊM VÀO GIỎ HÀNG</button>
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

logOut.addEventListener("click", function () {
  console.log("oke");
  localStorage.removeItem("userlogin");
  window.location.href = "../Đăng ký - đăng nhập/TrangLogin/dangnhap.html";
  renderUser();
});

//___________________________________Lọc giá sản phẩm_________________________________

filterPrice.onchange = function () {
  renderProducts();
};

//__________________________________Thêm vào giỏ hàng_________________________________

// addtoCart.onclick = function () {};

function detailProduct(productId) {
  window.localStorage.setItem("productId", JSON.stringify(productId));
  window.location.href = "../Trangchitiet/infor.html";
}

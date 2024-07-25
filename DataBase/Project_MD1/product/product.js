const productBtn = document.getElementById("create-newproduct");
const boxModel = document.getElementById("boxmodel");
const body = document.getElementById("body");
const boxmodel = document.getElementById("boxrgb");
const cancel = document.getElementById("cancel");
const listCategory = document.getElementById("list-category");
const listProduct = document.getElementById("list-product");

const formtitle = document.getElementById("form-title");
const formProduct = document.getElementById("form-product");
const inputNameProduct = document.getElementById("name-product");
const inputPrice = document.getElementById("price-product");
const inputInventory = document.getElementById("inventory-product");
const inputImageProduct = document.getElementById("image-product");

const textSearch = document.getElementById("text-search");
const search = document.getElementById("search");

const selectProduct = document.getElementById("select-category");
const filterPrice = document.getElementById("filter-price");

// const inputCategory = document.getElementById("list-category");

const error = document.getElementById("error");

//___________________________Phân trang________________________________

const pageProduct = document.getElementById("next-page");
const pageSize = 5; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

let imageBase64 = null;
let idUpdateGlobal = null;
let CategoryId = null;

const inputImage = document.getElementById("input-file");
productBtn.onclick = function () {
  boxModel.style.display = "block";

  formtitle.textContent = "Create New Product";
};
cancel.onclick = function () {
  boxModel.style.display = "none";
  inputNameProduct.value = "";
  inputPrice.value = "";
  inputInventory.value = "";
  listCategory.value = "";
  inputImageProduct.src = "";
};

//Lấy localStorage bên trang Categories về sang bên Product

function renderCategory() {
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

  let stringHTML = "";

  for (let idx in dbCategory) {
    stringHTML += `
     <option value="${dbCategory[idx].id}">${dbCategory[idx].name}</option>`;
  }
  listCategory.innerHTML = stringHTML;

  stringHTML = `<option value="0">Tất cả</option>` + stringHTML;
  selectProduct.innerHTML = stringHTML;
}
renderCategory();

function encodeImageFileAsURL(element) {
  const file = element.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    inputImageProduct.src = reader.result;
    imageBase64 = reader.result;
  };

  reader.readAsDataURL(file);
}

// Thêm sản phẩm

formProduct.addEventListener("submit", function (event) {
  event.preventDefault();

  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];

  const nameProduct = inputNameProduct.value.trim();
  const priceProduct = inputPrice.value;
  const inventoryProcduct = inputInventory.value;

  //Kiểm tra đã nhập thông tin vào name chưa

  if (!nameProduct) {
    error.textContent = "Mời bạn nhập tên sản phẩm";
    return;
  }

  //Kiểm tra điều kiện xem có trùng name với các sp có sẵn

  let vitri = dbProduct.findIndex(
    (element) => element.name.toLowerCase() === nameProduct.toLowerCase()
  );
  if (vitri != -1 && dbProduct[vitri].id != idUpdateGlobal) {
    error.textContent = "Đã có sản phẩm này";
    return;
  } else {
    error.textContent = "";
  }

  // Phần Update thông tin sản phẩm

  if (idUpdateGlobal) {
    let vitrisua = dbProduct.findIndex(
      (element) => element.id === idUpdateGlobal
    );

    dbProduct[vitrisua].name = nameProduct;
    dbProduct[vitrisua].price = priceProduct;
    dbProduct[vitrisua].inventory = inventoryProcduct;
    dbProduct[vitrisua].categoryId = listCategory.value;
    dbProduct[vitrisua].image = inputImageProduct.src;

    dbProduct[vitrisua].localStorage; // Đẩy lên local Storge
    localStorage.setItem("products", JSON.stringify(dbProduct));
    idUpdateGlobal = null;

    inputNameProduct.value = "";
    inputPrice.value = "";
    inputInventory.value = "";
    listCategory.value = "";
    inputImageProduct.src = "";

    formtitle.textContent = "Create New Product";
    boxModel.style.display = "none";
    renderProducts();

    return;
  }

  //_____________________Tạo sản phẩm mới newProduct____________________________

  let newProduct = {
    id: dbProduct.length === 0 ? 1 : dbProduct[dbProduct.length - 1].id + 1,
    name: nameProduct,
    image: imageBase64,
    price: +priceProduct,
    inventory: +inventoryProcduct,
    categoryId: +document.getElementById("list-category").value,
  };

  dbProduct.push(newProduct);
  localStorage.setItem("products", JSON.stringify(dbProduct));
  inputNameProduct.value = "";
  inputPrice.value = "";
  inputInventory.value = "";
  error.value = "";

  imageBase64 = null;
  document.getElementById("image-product").src = "";
  boxModel.style.display = "none";
  renderProducts();
});

//_________________Render Product __________________________

function renderProducts() {
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

  // Tìm vị trí id category trùng với selectProduct để lọc sản phẩm theo Category

  if (+selectProduct.value !== 0) {
    dbProduct = dbProduct.filter(
      (element) => element.categoryId == +selectProduct.value
    );
  }

  //Gán biến đó bằng biến lọc điều kiện (Search theo chữ cái)

  dbProduct = dbProduct.filter((el) =>
    el.name.toLowerCase().includes(textSearch.value.trim().toLowerCase())
  );

  //Lọc theo PriceProduct

  switch (filterPrice.value) {
    case "0":
      break;

    case "1":
      dbProduct = dbProduct.filter((element) => element.price < 200000);
      break;

    case "2":
      dbProduct = dbProduct.filter(
        (element) => element.price >= 200000 && element.price < 500000
      );
      break;

    case "3":
      dbProduct = dbProduct.filter((element) => element.price >= 500000);
      break;
  }

  renderPage(dbProduct);

  // Render có product ra Html
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > dbProduct.length) {
    end = dbProduct.length;
  }
  dbProduct = dbProduct.slice(start, end); //new db đã cắt

  let stringHTML = "";
  for (let idx in dbProduct) {
    stringHTML += `<tr>
                <td>${dbProduct[idx].id}</td>
                <td>
                  <img width="100px" src="${dbProduct[idx].image}" alt="img" />
                </td>
                <td>${dbProduct[idx].name}</td>
                <td>${dbProduct[idx].price}</td>
                <td>${dbProduct[idx].inventory}</td>
                <td>${
                  dbCategory.find((el) => el.id == dbProduct[idx].categoryId)
                    .name
                }</td>
                <td>
                  <button onclick="update(${dbProduct[idx].id})">Update</button>

                  <button onclick="deleteProduct(${
                    dbProduct[idx].id
                  })">Delete</button>
                </td>
              </tr>`;
  }
  listProduct.innerHTML = stringHTML;
}
renderProducts();

//_____________________Thực hiện xóa_______________________

function deleteProduct(idDelelte) {
  //Lấy db về
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  //Tìm vị trí xóa

  const vitrixoa = dbProduct.findIndex((element) => element.id === idDelelte);
  //Xóa vị trí xóa
  dbProduct.splice(vitrixoa, 1);
  //Lưu lại khi thực hiện xóa phần tử đó
  localStorage.setItem("products", JSON.stringify(dbProduct));
  //Render lại khi thực hiên lưu lại
  renderProducts();
}

//________________________Thực hiện Update_______________________

function update(idUpdate) {
  boxModel.style.display = "block";
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const vitriUpdate = dbProduct.findIndex((element) => element.id === idUpdate);

  inputNameProduct.value = dbProduct[vitriUpdate].name;
  inputPrice.value = dbProduct[vitriUpdate].price;
  inputInventory.value = dbProduct[vitriUpdate].inventory;
  listCategory.value = dbProduct[vitriUpdate].categoryId;
  inputImageProduct.src = dbProduct[vitriUpdate].image;

  formtitle.textContent = "Update Product";
  idUpdateGlobal = idUpdate;
}

//___________________________________search_______________________________________

search.onclick = function () {
  renderProducts();
};

//___________________________________Lọc Category__________________________________

selectProduct.onchange = function () {
  renderProducts();
};

//___________________________________Lọc giá sản phẩm_________________________________

filterPrice.onchange = function () {
  renderProducts();
};

//___________________________________Phân trang______________________________________

function renderPage(dbProductFilter) {
  totalPage = Math.ceil(dbProductFilter.length / pageSize);

  let pageHTML = "";

  if (totalPage === 0) {
    currentPage = 0;
    pageProduct.innerHTML = "";
    return;
  }

  pageHTML += `
  <div class="box1" onclick="changePage('previous')" >
    <i class="fa-solid fa-chevron-left"></i>
  </div>`;

  for (let i = 1; i <= totalPage; i++) {
    pageHTML += `
      <div class="box1 ${
        currentPage == i ? "red" : ""
      }" onclick="clickPage(${i})">
        ${i}
      </div>
    `;
  }

  pageHTML += `
  <div class="box1"  onclick="changePage('next')">      
    <i class="fa-solid fa-chevron-right"></i>        
  </div>`;

  pageProduct.innerHTML = pageHTML;
}

function clickPage(i) {
  currentPage = i;
  renderProducts();
}

function changePage(status) {
  switch (status) {
    case "previous":
      if (currentPage > 1) {
        currentPage--;
      }
      break;
    case "next":
      if (currentPage < totalPage) {
        currentPage++;
      }
      break;
  }
  renderProducts();
}

//Thêm category

const submit = document.getElementById("submit");
const input = document.getElementById("category-input-name");
const error = document.getElementById("error-category");
const cancel = document.getElementById("cancel");
const listCategory = document.getElementById("listCategory");
const formtitle = document.getElementById("form-title");
const textSearch = document.getElementById("text-search");
const search = document.getElementById("search");
// const sapxep = document.getElementById("quantity");
const selectSort = document.getElementById("select-sort");

let idUpdateGlobal = null; // Dat khong co gia tri gi

// Khi không có giá trị null thì lúc edit 1 phần tử lúc cập nhật xong
// thì m

submit.onclick = function () {
  //   console.log(input.value);
  // log ra giá trị của input khi nhập vào ô input
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryName = input.value.trim();
  //Nếu categoryName không có gì thì hiện nhập lại
  if (!categoryName) {
    error.textContent = "Mời bạn nhập lại";
    return;
  }

  const vitri = dbCategory.findIndex(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase()
  );

  // console.log(vitri, categoryName, dbCategory);

  if (vitri !== -1) {
    // Nếu đã có thì thông báo lỗi
    error.textContent = "Đã có sản phẩm này";
    return;
  }

  //Xet dieu kien  khi idUpdateGlobal =idedit thì xảy ra

  if (idUpdateGlobal) {
    //logic update

    //Tìm vị trí update = vị trí của phần tử trong dbCategory

    let vitrisua = dbCategory.findIndex(
      (element) => element.id === idUpdateGlobal
    );

    //Tìm ra name của phần tử dbCategory = inputnam.value
    dbCategory[vitrisua].name = categoryName;
    // Đẩy lên local Storge
    localStorage.setItem("categories", JSON.stringify(dbCategory));
    idUpdateGlobal = null;
    renderCategory();
    input.value = "";
    formtitle.textContent = "Thêm danh mục";

    return;
  }

  //Nếu idUpdateGlobal = null thì

  let id = 1;
  if (dbCategory.length > 0) {
    id = dbCategory[dbCategory.length - 1].id + 1;
  }
  let newCategory = {
    id: id,
    name: categoryName,
  };
  dbCategory.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(dbCategory));
  error.textContent = "";
  input.value = "";

  //Render lại khi thêm 1 category vào

  renderCategory();
};
//

cancel.onclick = function () {
  input.value = "";
  error.textContent = "";
};

function renderCategory() {
  let dbCategory = JSON.parse(localStorage.getItem("categories")) || [];

  //Gán biến đó bằng biến lọc điều kiện

  dbCategory = dbCategory.filter((el) =>
    el.name.toLowerCase().includes(textSearch.value.trim().toLowerCase())
  );

  //sap xep theo gia tri selectSort.value = bandau | tang dan | giam dan

  switch (selectSort.value) {
    case "bandau":
      break;
    case "tangdan":
      dbCategory.sort((a, b) => a.name.localeCompare(b.name));
      // sap xep tang dan
      break;
    case "giamdan":
      dbCategory.sort((a, b) => b.name.localeCompare(a.name));
      // sap xep giam dan
      break;
  }

  let stringHTML = "";
  for (let idx in dbCategory) {
    stringHTML += `
                  <tr>
                <td>${dbCategory[idx].id}</td>
                <td>${dbCategory[idx].name}</td>
                <td>
                  <button onclick ="update(${dbCategory[idx].id})"
                  >Edit</button>
                  <button
                  class="update" 
                  onclick="deleteCategory(${dbCategory[idx].id})"
                  >
                  Delete
                  </button>
                </td>
              </tr>`;
  }
  listCategory.innerHTML = stringHTML;
}
renderCategory();

//_____________________Thực hiện xóa_______________________

function deleteCategory(idDelelte) {
  //Lấy db về
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  //Tìm vị trí xóa

  const vitrixoa = dbCategory.findIndex(
    (category) => category.id === idDelelte
  );
  //Xóa vị trí xóa
  dbCategory.splice(vitrixoa, 1);
  //Lưu lại khi thực hiện xóa phần tử đó
  localStorage.setItem("categories", JSON.stringify(dbCategory));
  //Render lại khi thực hiên lưu lại
  renderCategory();
}

// _________________________________Edit- Sua_______________________________________

function update(idEdit) {
  //Lấy về js
  const dbCategory = JSON.parse(localStorage.getItem("categories")) || [];
  //Tìm vị trí update khi click vào
  let vitriupdate = dbCategory.findIndex((element) => element.id === idEdit);
  //value input gắn bằng name của phần tử trong dbCategory
  input.value = dbCategory[vitriupdate].name;
  formtitle.textContent = "Update";
  idUpdateGlobal = idEdit;
}

//___________________________________search_______________________________________

search.onclick = function () {
  renderCategory();
};

//_______________________________Sapxep ______________________________________________

selectSort.onchange = function () {
  renderCategory();
};

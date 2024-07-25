const listUser = document.getElementById("list-user");
const search = document.getElementById("search");
const textSearch = document.getElementById("text-search");
const arrange = document.getElementById("select-arrange");
const logout = document.getElementById("logout");

const pageUser = document.getElementById("next-page");
const pageSize = 5; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

function renderUser() {
  let dbRegister = JSON.parse(localStorage.getItem("registers")) || [];

  //Gán biến đó bằng biến lọc điều kiện
  dbRegister = dbRegister.filter((el) =>
    el.name.toLowerCase().includes(textSearch.value.trim().toLowerCase())
  );

  //_____________________________________Sắp xếp tăng dần ______________________________

  switch (arrange.value) {
    case "tatca":
      break;
    case "tangdan":
      dbRegister.sort((a, b) => a.name.localeCompare(b.name));
      // sap xep tang dan
      break;
    case "giamdan":
      dbRegister.sort((a, b) => b.name.localeCompare(a.name));
      // sap xep giam dan
      break;
  }

  //__________________________Đoạn logic phân trang ___________________________

  renderPage(dbRegister);

  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > dbRegister.length) {
    end = dbRegister.length;
  }
  dbRegister = dbRegister.slice(start, end); //new db đã cắt

  let stringHTML = "";
  for (let idx in dbRegister) {
    stringHTML += `<tr>
                <td>${dbRegister[idx].id}</td>
                <td>${dbRegister[idx].name}</td>
                <td>${dbRegister[idx].email}</td>
                <td>${dbRegister[idx].password}</td>
                <td>${dbRegister[idx].status ? "Active" : "Block"}</td>
                <td>${dbRegister[idx].role ? "Admin" : "User"}</td>
                <td>
                  <button style="display: ${
                    dbRegister[idx].role ? "none" : ""
                  };" onclick="changeStatus(${
      dbRegister[idx].id
    })" >Open/Block</button>
                </td>
              </tr>`;
    listUser.innerHTML = stringHTML;
  }
}
renderUser();

//____________________________________Search_____________________________________

search.onclick = function () {
  renderUser();
};

//_________________________________Sắp xếp thứ tự ______________________________________

arrange.onchange = function () {
  renderUser();
};

//__________________________________Phân trang__________________________________________

function renderPage(dbUserFilter) {
  totalPage = Math.ceil(dbUserFilter.length / pageSize);

  let pageHTML = "";

  if (totalPage === 0) {
    currentPage = 0;
    pageUser.innerHTML = "";
    return;
  }

  pageHTML += `
  <div class="box1" onclick="changePage('previous')" >
    <i class="fa-solid fa-chevron-left"></i>
  </div>`;

  for (let i = 1; i <= totalPage; i++) {
    pageHTML += `
      <div class="box1 ${
        currentPage == i ? "green" : ""
      }" onclick="clickPage(${i})">
        ${i}
      </div>
    `;
  }

  pageHTML += `
  <div class="box1"  onclick="changePage('next')">      
    <i class="fa-solid fa-chevron-right"></i>        
  </div>`;

  pageUser.innerHTML = pageHTML;
}

function clickPage(i) {
  currentPage = i;
  renderUser();
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
  renderUser();
}

function changeStatus(id) {
  let dbRegister = JSON.parse(localStorage.getItem("registers")) || [];
  const index = dbRegister.findIndex((el) => el.id == id);
  dbRegister[index].status = !dbRegister[index].status;
  localStorage.setItem("registers", JSON.stringify(dbRegister));
  renderUser();
}

logout.onclick = function () {
  localStorage.removeItem("userlogin");
  window.location.href = "../Trang đăng ký/dangky.html";
};

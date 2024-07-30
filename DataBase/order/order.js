const listOrder = document.getElementById("list-order");
const selectSort = document.getElementById("select-sort");
const textSearch = document.getElementById("text-search");
const search = document.getElementById("search");

const pageUser = document.getElementById("next-page");
const pageSize = 5; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

function renderOrder() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  //__________________________Đoạn logic phân trang ___________________________

  renderPage(orders);

  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > orders.length) {
    end = orders.length;
  }
  orders = orders.slice(start, end); //new db đã cắt

  //Gán biến đó bằng biến lọc điều kiện

  orders = orders.filter((el) =>
    el.name.toLowerCase().includes(textSearch.value.trim().toLowerCase())
  );

  //sap xep theo gia tri selectSort.value = bandau | tang dan | giam dan

  switch (selectSort.value) {
    case "bandau":
      break;
    case "tangdan":
      orders.sort((a, b) => a.name.localeCompare(b.name));
      // sap xep tang dan
      break;
    case "giamdan":
      orders.sort((a, b) => b.name.localeCompare(a.name));
      // sap xep giam dan
      break;
  }

  let stringHTML = "";
  for (let idx in orders) {
    stringHTML += `<tr>
                <td>${orders[idx].id}</td>
                <td>${orders[idx].name}</td>
                <td>${orders[idx].address}</td>
                <td>${orders[idx].phone}</td>
                <td>${orders[idx].email}</td>
                <td>${orders[idx].date}</td>
                <td>${
                  orders[idx].status == 0
                    ? "Mới đặt"
                    : orders[idx].status == 1
                    ? "Đồng ý"
                    : "Đã hủy"
                }</td>     
                <td>${orders[idx].total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}</td>
                <td>
                    <button style="display: ${
                      orders[idx].status == 0 ? "" : "none"
                    };" onclick="changeStatus(${
      orders[idx].id
    }, 1)" >Accept</button>
                    <button style="display: ${
                      orders[idx].status == 0 ? "" : "none"
                    };" onclick="changeStatus(${
      orders[idx].id
    }, 2)">Cancel</button>
                </td>
            </tr>`;
  }
  listOrder.innerHTML = stringHTML;
}

renderOrder();

function changeStatus(orderId, status) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const index = orders.findIndex((el) => el.id == orderId);

  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrder();
}

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
  renderOrder();
}

//___________________________________search_______________________________________

search.onclick = function () {
  renderOrder();
};

//_______________________________Sapxep ______________________________________________

selectSort.onchange = function () {
  renderOrder();
};

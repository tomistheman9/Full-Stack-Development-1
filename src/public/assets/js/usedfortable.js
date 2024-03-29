document.addEventListener("DOMContentLoaded", function () {
  let data;

  async function getData() {
    const response = await fetch("http://localhost:3015/agents");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    data = res.data;
    populateTable(data);
  }

  getData();

  function populateTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.map((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.first_name} ${item.last_name}</td>
        <td>${item.email}</td>
        <td>${item.region}</td>
        <td style="background-color: ${getRatingColor(item.rating)}">${item.rating}</td>
        <td>$${item.fee}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function getRatingColor(rating) {
    if (rating === 100) {
      return "green";
    } else if (rating >= 90) {
      return "blue";
    } else {
      return "purple";
    }
  }

  const sortDropdown = document.getElementById("sort-dropdown");
  const sortSelect = document.createElement("select");
  sortSelect.innerHTML = `
    <option value="full_name">Full Name</option>
    <option value="rating">Rating</option>
    <option value="fee">Fee</option>
  `;
  sortSelect.addEventListener("change", function () {
    const sortBy = this.value;
    if (sortBy === "full_name") {
      data.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
        const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      data.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    populateTable(data);
  });
  sortDropdown.appendChild(sortSelect);

  const regionSortDropdown = document.getElementById("region-sort");
  regionSortDropdown.addEventListener("change", function () {
    const region = this.value;
    if (region === "all") {
      populateTable(data);
    } else {
      const filteredData = data.filter((item) => item.region === region);
      populateTable(filteredData);
    }
  });
});

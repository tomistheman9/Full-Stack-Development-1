document.addEventListener("DOMContentLoaded", function() {
  // Fetch data from MongoDB (Assuming you're using some AJAX request or any other method)

  // Dummy data for demonstration
  const data = [
    { fullName: "John Doe", email: "john@example.com", region: "North", rating: 100, fee: 50 },
    { fullName: "Jane Smith", email: "jane@example.com", region: "South", rating: 95, fee: 60 },
    { fullName: "Alice Johnson", email: "alice@example.com", region: "West", rating: 85, fee: 70 },
    // Add more data as needed
  ];

  // Function to populate the table with data
  function populateTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear existing table data

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.first_name}</td>
        <td>${item.email}</td>
        <td>${item.region}</td>
        <td style="background-color: ${getRatingColor(item.rating)}">${item.rating}</td>
        <td>${item.fee}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Function to get background color based on rating
  function getRatingColor(rating) {
    if (rating === 100) {
      return "green";
    } else if (rating >= 90) {
      return "blue";
    } else {
      return "purple";
    }
  }

  // Populate initial table
  populateTable(data);

  // Dropdown menu for sorting
  const sortDropdown = document.getElementById("sort-dropdown");
  const sortSelect = document.createElement("select");
  sortSelect.innerHTML = `
    <option value="fullName">Name</option>
    <option value="rating">Rating</option>
    <option value="fee">Fee</option>
  `;
  sortSelect.addEventListener("change", function() {
    const sortBy = this.value;
    data.sort((a, b) => a[sortBy] - b[sortBy]); // Assuming numeric sorting for rating and fee
    populateTable(data);
  });
  sortDropdown.appendChild(sortSelect);
});

async function getData() {
  const response = await fetch('http://localhost:3015/agents');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data; 
}
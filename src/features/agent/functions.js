

async function getData() {
  const response = await fetch('http://localhost:3015/agents');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data; 
}

function populateTable(data) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";
  data.forEach(function(row) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.first_name} ${row.last_name}</td>
      <td>${row.email}</td>
      <td>${row.region}</td>
      <td class="${getClassForRating(row.rating)}">${row.rating}</td>
      <td>${row.fee}</td>
    `;
    tbody.appendChild(tr);
  });
}

function getClassForRating(rating) {
  if (rating >= 100) return "green";
  else if (rating >= 90) return "blue";
  else return "purple";
}

module.exports = { populateTable, getClassForRating, getData };

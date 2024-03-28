// Import necessary functions from functions.js in the same directory
const { populateTable, getData } = require('./functions');

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData();

  // Initial population of the table
  populateTable(data);

  // Event listener for sorting
  document.querySelector("#sort").addEventListener("change", async function() {
    data = await getData();
    sortData(this.value, data);
  });
});

function sortData(option, data) {
  data.sort((a, b) => {
    if (option === "name") return a.name.localeCompare(b.name);
    else if (option === "rating") return b.rating - a.rating;
    else return a.fee - b.fee;
  });
  populateTable(data);
}
function getClassForRating(rating) {
  if (rating >= 100) return "green";
  else if (rating >= 90) return "blue";
  else return "purple";
}






























// // controller.jsOLD CODE NOT SURE IF WORKING HAD HELP FROM GEORGE


// document.addEventListener("DOMContentLoaded", async () => {
//   const data = await getData();
//   populateTable(data);

//   document.querySelector("#sort").addEventListener("change", async function() {
//     const sortedData = await getData(this.value);
//     populateTable(sortedData);
//   });
// });

// async function getData() {
//   const response = await fetch('http://localhost:3015/agents');

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   return data; 
// }


// function populateTable(data) {
//   const tbody = document.querySelector("#dataTable tbody");
//   tbody.innerHTML = "";
//   data.forEach(function(row) {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${row.first_name} ${row.last_name}}</td>
//       <td>${row.email}</td>
//       <td>${row.region}</td>
//       <td class="${getClassForRating(row.rating)}">${row.rating}</td>
//       <td>${row.fee}</td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// function getClassForRating(rating) {
//   if (rating >= 100) return "green";
//   else if (rating >= 90) return "blue";
//   else return "purple";
// }

// //DONT KNOW IF ANY OF THIS WORKING


// //SEE DONT KNOW IF ANY OF THIS WORKING SEE ABOVE

// module.exports = { populateTable, getClassForRating, getData };


  

  
//   // Function to sort data by selected option
//   function sortData(option) {
//     data.sort(function(a, b) {
//       if (option === "name") return a.name.localeCompare(b.name);
//       else if (option === "rating") return b.rating - a.rating;
//       else return a.fee - b.fee;
//     });
//     populateTable(data);
//   }

//   // Initial population of the table
//   populateTable(data);

//   // Event listener for sorting
//   document.querySelector("#sort").addEventListener("change", function() {
//     sortData(this.value);
//   });

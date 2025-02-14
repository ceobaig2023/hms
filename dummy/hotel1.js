document.getElementById('categoryFilter').addEventListener('change', filterHotels);

function fetchHotels() {
  fetch('hotel1.json')  // Fetching hotels data from JSON file
    .then(response => response.json())
    .then(data => {
      const filteredHotels = filterHotelsByCategory(data);
      displayHotels(filteredHotels);
    })
    .catch(error => console.error('Error fetching hotels:', error));
}

// Filter hotels by selected category
function filterHotelsByCategory(hotels) {
  const category = document.getElementById('categoryFilter').value;
  if (category === 'All') {
    return hotels;
  } else {
    return hotels.filter(hotel => hotel.category === category);
  }
}

// Display filtered hotels in the table
function displayHotels(hotels) {
  const tableBody = document.getElementById('hotelsTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing rows

  hotels.forEach(hotel => {
    const row = `
      <tr>
        <td>${hotel.name}</td>
        <td>${hotel.category}</td>
        <td><a href="rooms.html?hotel=${hotel.id}">View Rooms</a></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

fetchHotels();  // Initial fetch of hotels on page load

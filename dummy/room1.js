document.getElementById('roomStatusFilter').addEventListener('change', filterRooms);

function fetchRooms() {
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get('hotel');  // Get hotel ID from URL

  fetch('room1.json')  // Fetch rooms data from JSON file
    .then(response => response.json())
    .then(data => {
      const filteredRooms = filterRoomsByStatus(data, hotelId);
      displayRooms(filteredRooms);
    })
    .catch(error => console.error('Error fetching rooms:', error));
}

// Filter rooms by status
function filterRoomsByStatus(rooms, hotelId) {
  const status = document.getElementById('roomStatusFilter').value;
  let filteredRooms = rooms.filter(room => room.hotelId == hotelId);

  if (status !== 'All') {
    filteredRooms = filteredRooms.filter(room => room.status === status);
  }

  return filteredRooms;
}

// Display rooms in the table
function displayRooms(rooms) {
  const tableBody = document.getElementById('roomsTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing rows

  rooms.forEach(room => {
    const row = `
      <tr>
        <td>${room.name}</td>
        <td>${room.status}</td>
        <td>${room.price}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

fetchRooms();  // Initial fetch of rooms on page load

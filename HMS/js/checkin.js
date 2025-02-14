    // Set default Check-In and Check-Out times
    const today = new Date();
    const checkinDate = new Date(today);
    checkinDate.setHours(14, 0, 0, 0); // Default Check-In time: 2 PM
    const checkoutDate = new Date(today);
    checkoutDate.setDate(checkoutDate.getDate() + 1); // Default Check-Out: Next day
    checkoutDate.setHours(15, 0, 0, 0); // Default Check-Out time: 3 PM

    // Format dates as dd-MMM-YYYY
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // Set default Check-In and Check-Out values
    document.getElementById('checkin').value = checkinDate.toISOString().split('T')[0];
    document.getElementById('checkout').value = checkoutDate.toISOString().split('T')[0];

    // Form submission
    document.getElementById('checkinForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Validate Name (at least 5 characters)
      const name = document.getElementById('name').value;
      if (name.length < 5) {
        alert('Name must be at least 5 characters long.');
        return;
      }

      // Validate Phone (10 digits)
      const phone = document.getElementById('phone').value;
      if (phone && !/^\d{10}$/.test(phone)) {
        alert('Phone number must be 10 digits.');
        return;
      }

      // Prepare log data
      const log = {
        uid: Math.floor(100000 + Math.random() * 900000), // Auto-generate 6-digit uid
        today: formatDate(new Date()),
        rid: document.getElementById('room').value,
        room: document.getElementById('room').value,
        tenant: document.getElementById('name').value,
        contact: document.getElementById('phone').value,
        checkin: formatDate(new Date(document.getElementById('checkin').value)),
        checkout: formatDate(new Date(document.getElementById('checkout').value)),
        price: document.getElementById('cost').value || 0,
        userid: 'USER123', // Replace with actual user ID if available
        image: document.getElementById('image').files[0]?.name || ''
      };

      // Submit log data
      fetch('APIs JAVA Backend', {
        method: 'POST',
        body: JSON.stringify({ action: 'addLog', ...log }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Show confirmation message
          const confirmationMessage = document.getElementById('confirmationMessage');
          confirmationMessage.style.display = 'block';
          setTimeout(() => {
            confirmationMessage.style.display = 'none';
            window.location.href = 'rooms.html';
          }, 4000); // Hide after 4 seconds
        }
      })
      .catch(error => console.error('Error:', error));
    });





  function populateRoomDropdown() {
    fetch('rooms.json', {
      method: 'POST',
      body: JSON.stringify({ action: 'addDropdown' }),
    })
      .then(response => response.json())
      .then(data => {
        const roomDropdown = document.getElementById('room');
        roomDropdown.innerHTML = '<option value="">Select a Room</option>'; // Reset dropdown
  
        data.forEach(room => {
          const option = document.createElement('option');
          option.value = room.roomName; // Store the rid as value
          option.textContent = room.roomName; // Display room name
  
          // Apply color based on room status
          option.style.color = room.status === "Filled" ? "green" :
                               room.status === "Exit Time" ? "red" :
                               room.status === "Available" ? "orange" : "gray";
  
          roomDropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }
  
  // Call function to populate the dropdown when the page loads
  document.addEventListener('DOMContentLoaded', populateRoomDropdown);


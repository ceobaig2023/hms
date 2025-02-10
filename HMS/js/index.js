function formatDate(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateRemainingTime(checkoutDate) {
    const now = new Date();
    const checkout = new Date(checkoutDate);

    if (isNaN(checkout.getTime())) {
        return { daysLeft: 'Invalid Date', hoursLeft: '' };  // Return error if the date is invalid
    }

    const timeDifference = checkout - now;
    if (timeDifference <= 0) {
        return { daysLeft: '0', hoursLeft: '0' }; // No time left, already passed
    }

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { daysLeft, hoursLeft };
}



function fetchRooms() {
    fetch('APIs JAVA Backend', {
        method: 'POST',
     
        body: JSON.stringify({ action: 'getRooms' }),
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById("roomTableBody");
        tableBody.innerHTML = "";

        if (Array.isArray(data)) {
            data.forEach(room => {
                const { daysLeft, hoursLeft } = calculateRemainingTime(room.checkout);
                const formattedCheckoutDate = formatDate(new Date(room.checkout)); // Format checkout date

                // Set button color using ternary operator
                const statusColor = room.status === "Filled" ? "green" :
                                    room.status === "Exit Time" ? "red" :
                                    room.status === "Available" ? "orange" : "gray";

                let row = `<tr>
                    <td class="room-name">${room.roomName}</td>
                    <td>${room.price}</td>
                    <td>
                      <button 
                        class="status-btn" 
                        style="background-color: ${statusColor}; color: white; border: none; padding: 3px 10px; cursor: pointer;"
                        onclick="${room.status === 'Filled' || room.status === 'Exit Time' ? 'updateStatus(\'' + room.rid + '\', \'' + room.checkout + '\')' : 'return false;'}">
                        ${room.status}
                     </button>

                    </td>
                    <td>${formattedCheckoutDate || 'N/A'}</td>
                    <td>${daysLeft} days ${hoursLeft} hours</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="5">No rooms available.</td></tr>`;
        }
    })
    .catch(error => {
        console.error('Error fetching rooms:', error);
        let tableBody = document.getElementById("roomTableBody");
        tableBody.innerHTML = `<tr><td colspan="5">Failed to load rooms. Please try again later.</td></tr>`;
    });
}

// Function to update room status
function updateStatus(rid, checkout) {
    fetch('APIs JAVA Backend', {
        method: 'POST',
       // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateCheckout',rid: rid, checkout:'',status:'Available'}),
    })
    .then(response => response.json())

.then(data => {
    if (data.status === "success") {  // ✅ FIX: Correct check
        alert("checkout verified");
        fetchRooms();  // ✅ Refresh room list after update
    } else {
        alert("Failed to update status. Server returned an error.");
    }
})
.catch(error => {
    console.error("Error updating status:", error);
    alert("Failed to update status. Please check the console.");
});
}


window.onload = fetchRooms;
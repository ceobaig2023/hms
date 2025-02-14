document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".clean-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const roomDiv = this.parentElement;
            const statusElement = roomDiv.querySelector(".status");

            if (statusElement.textContent === "Pending") {
                statusElement.textContent = "In Progress";
                statusElement.className = "status in-progress";
                this.textContent = "Complete Cleaning";
            } else if (statusElement.textContent === "In Progress") {
                statusElement.textContent = "Completed";
                statusElement.className = "status completed";
                this.textContent = "Reset Cleaning";
            } else if (statusElement.textContent === "Completed") {
                statusElement.textContent = "Pending";
                statusElement.className = "status pending";
                this.textContent = "Mark for Cleaning";
            }
        });
    });
});

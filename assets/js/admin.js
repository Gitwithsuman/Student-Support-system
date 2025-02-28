document.addEventListener("DOMContentLoaded", fetchApplications);

function fetchApplications() {
    fetch("http://localhost:5000/get_applications")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let table = document.getElementById("applicationsTable");
            table.innerHTML = "";

            data.forEach(app => {
                let row = `
                    <tr>
                        <td>${app.name}</td>
                        <td>${app.studentId}</td>
                        <td>${app.email}</td>
                        <td>${app.certificateType}</td>
                        <td><a href="${app.documents}" target="_blank">View</a></td>
                        <td>
                            <button class="verify" onclick="verifyApplication('${app.id}')">Verify</button>
                            <button class="reject" onclick="rejectApplication('${app.id}')">Reject</button>
                        </td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function verifyApplication(id) {
    fetch(`http://localhost:5000/verify_application/${id}`, { method: "POST" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            fetchApplications();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function rejectApplication(id) {
    fetch(`http://localhost:5000/reject_application/${id}`, { method: "POST" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            fetchApplications();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
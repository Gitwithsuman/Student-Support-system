function submitForm() {
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("studentId").value;
    const email = document.getElementById("email").value;
    const certificateType = document.getElementById("certificateType").value;
    const documents = document.getElementById("documents").files[0];
    const comments = document.getElementById("comments").value;

    if (!name || !studentId || !email || !certificateType || !documents) {
        alert("Please fill all required fields.");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("studentId", studentId);
    formData.append("email", email);
    formData.append("certificateType", certificateType);
    formData.append("documents", documents);
    formData.append("comments", comments);

    fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("Application submitted successfully!");
        document.getElementById("certificateForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting application.");
    });
}
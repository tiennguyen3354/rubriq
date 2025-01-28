document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        const statusElement = document.getElementById('status');
        if (response.ok) {
            statusElement.innerHTML = `
                ${result.message} <br>
                <a href="${result.cleanedFile}" download>Download Cleaned File</a>
            `;
        } else {
            statusElement.innerText = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('status').innerText = 'Error uploading file.';
    }
});

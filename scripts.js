// Temporary storage for daily updates
let dailyUpdates = [];

// Handle daily update submission
document.getElementById('dailyUpdateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const selectedClass = document.getElementById('classSelect').value;
    const day = document.getElementById('day').value;
    const programText = document.getElementById('program').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    if (imageFile && imageFile.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;

            // Save update to the dailyUpdates array
            dailyUpdates.push({
                class: selectedClass,
                day: day,
                programText: programText,
                imageUrl: imageUrl,
                id: Date.now() // Unique ID for the update
            });

            alert('Update submitted successfully!');
            document.getElementById('dailyUpdateForm').reset();
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert('Please upload a valid JPEG image.');
    }
});

// Admin login logic
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        document.getElementById('adminActions').style.display = 'block';
        alert('Admin logged in successfully!');
        loadAdminUpdates();
    } else {
        alert('Invalid username or password.');
    }
});

// Load updates in the admin panel
function loadAdminUpdates() {
    const adminUpdatesContainer = document.getElementById('adminUpdatesContainer');
    adminUpdatesContainer.innerHTML = '';

    dailyUpdates.forEach((update) => {
        const updateItem = document.createElement('div');
        updateItem.classList.add('update-item');

        const updateTitle = document.createElement('h4');
        updateTitle.textContent = `${update.class} - ${update.day}`;
        updateItem.appendChild(updateTitle);

        const programParagraph = document.createElement('p');
        programParagraph.textContent = update.programText;
        updateItem.appendChild(programParagraph);

        const image = document.createElement('img');
        image.src = update.imageUrl;
        updateItem.appendChild(image);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteUpdate(update.id);
        });
        updateItem.appendChild(deleteButton);

        const transferButton = document.createElement('button');
        transferButton.textContent = 'Transfer';
        transferButton.classList.add('transfer-btn');
        transferButton.addEventListener('click', () => {
            transferUpdate(update.id);
        });
        updateItem.appendChild(transferButton);

        adminUpdatesContainer.appendChild(updateItem);
    });
}

// Delete an update
function deleteUpdate(id) {
    dailyUpdates = dailyUpdates.filter(update => update.id !== id);
    alert('Update deleted.');
    loadAdminUpdates();
}

// Transfer an update (for example, saving it to an archive)
function transferUpdate(id) {
    // Logic to transfer the update to another location (e.g., archive)
    alert('Update transferred successfully.');
}

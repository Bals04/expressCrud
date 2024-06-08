
async function deleteUser(id) {
    try {

        const response = await fetch(`/users/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (result.success) {
            window.location.href = `/`
            console.log('success');
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
    }
}

function UpdateUser(id) {
    window.location.href = `/users/update?id=${id}`;
}

async function UpdateInfo() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const fname = document.getElementById('firstname').value;
    const lname = document.getElementById('lastname').value;

    try {
        const response = await fetch(`/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: fname,
                lastname: lname
            })
        });
        const result = await response.json();
        if (result.success) {
            alert('User updated successfully');
            window.location.href = `/`
            // Optionally, update the UI or reload data
        } else {
            alert('Error updating user');
        }

    } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user');
    }

}

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('/users/load');
        const data = await response.json();
        const tableBody = document.getElementById('data-table-body');

        data.forEach(row => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${row.ID}</td>
                <td>${row.Lastname}, ${row.Firstname} </td>
                <td>
                    <div class="action-buttons">
                        <button class="delete" onclick="deleteUser(${row.ID})">Delete</button>
                        <button class="update" onclick="UpdateUser(${row.ID})">Update</button>
                        <button class="view">View</button>
                    </div>
                </td>
            `
            tableBody.appendChild(tableRow);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll('.DeleteButton');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            // Get the document ID from the button's data-id attribute
            const documentId = button.getAttribute('data-id');

            if (confirm('Are you sure you want to delete this document?')) {
                try {
                    // Send a DELETE request to the server
                    const response = await fetch(`http://localhost:3000/documents/${documentId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        // Optionally remove the deleted item from the DOM
                        const listItem = button.closest('li');
                        listItem.remove();

                        alert('Document deleted successfully.');
                    } else {
                        alert('Failed to delete the document. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the document.');
                }
            }
        });
    });
});

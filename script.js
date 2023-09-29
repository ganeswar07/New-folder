
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const list = document.getElementById('list');
    const add = document.getElementById('add');
    let editingItem = null; // Track the item being edited

    // Function to create a new list item
    function createListItem(text) {
        const listItem = document.createElement('li');
        listItem.className = 'unchecked task';
        listItem.innerHTML = `
            <i class="ri-checkbox-blank-circle-line"></i>
            <span class="listitem">${text}</span>
            <i class="ri-delete-bin-6-line close"></i>
            <i class="ri-edit-2-line edit"></i>
        `;
        return listItem;
    }

    // Function to handle editing mode
    function enterEditMode(item) {
        editingItem = item;
        item.classList.add('editing');
        input.value = item.querySelector('.listitem').textContent;
        input.focus();
    }

    // Function to exit editing mode
    function exitEditMode() {
        if (editingItem) {
            editingItem.classList.remove('editing');
            editingItem = null;
        }
        input.value = '';
    }

    // Add button click event to add a new task or update an existing task
    add.addEventListener('click', () => {
        const text = input.value.trim();
        if (text === '') {
            alert("Please enter a task.");
        } else if (editingItem) {
            // If in edit mode, update the currently edited task
            editingItem.querySelector('.listitem').textContent = text;
            exitEditMode(); // Exit edit mode
        } else {
            const listItem = createListItem(text);
            list.prepend(listItem);
            input.value = ''; // Clear the input field
        }
    });

    // Event listener for list item interactions
    list.addEventListener('click', (event) => {
        const clickedListItem = event.target.closest('li');
        if (!clickedListItem) return;

        if (event.target.classList.contains('ri-checkbox-circle-fill') ||
            event.target.classList.contains('ri-checkbox-blank-circle-line')) {
            // Toggle checked/unchecked
            clickedListItem.classList.toggle('checked');
            const checkboxIcon = clickedListItem.querySelector('.ri-checkbox-blank-circle-line, .ri-checkbox-circle-fill');
            checkboxIcon.classList.toggle('ri-checkbox-circle-fill');
            checkboxIcon.classList.toggle('ri-checkbox-blank-circle-line');
        } else if (event.target.classList.contains('ri-delete-bin-6-line')) {
            // Delete task
            clickedListItem.remove();
            exitEditMode(); // Exit edit mode if deleting the edited item
        } else if (event.target.classList.contains('ri-edit-2-line')) {
            // Edit task
            if (editingItem === clickedListItem) {
                exitEditMode(); // Exit edit mode if clicking the edited item again
            } else {
                exitEditMode(); // Exit edit mode if editing another item
                enterEditMode(clickedListItem); // Enter edit mode for the clicked item
            }
        }
    });

    // Event listener for input field changes
    input.addEventListener('input', () => {
        const inputValue = input.value.trim();

        // Find the currently edited task (with class 'editing')
        if (editingItem) {
            // Update the text content of the edited task with the input value
            editingItem.querySelector('.listitem').textContent = inputValue;
        }
    });
});

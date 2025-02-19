// Selecting necessary elements
const notesContainer = document.querySelector(".notes-container"); // Container to hold notes
const createBtn = document.querySelector(".btn"); // Button to create new notes
let notes = document.querySelectorAll(".input-box"); // All note elements

// Function to load saved notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes"); // Retrieve and display saved notes
}
showNotes(); // Call function on page load

// Function to update localStorage whenever notes are modified
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML); // Save current notes to localStorage
}

// Event listener for "Create Notes" button
createBtn.addEventListener("click", () => {
    let inputbox = document.createElement("p"); // Create a new paragraph for note
    let img = document.createElement('img'); // Create a delete icon

    inputbox.className = "input-box"; // Add class to note for styling
    inputbox.setAttribute("contenteditable", "true"); // Make note editable
    img.src = "images/delete.png"; // Set delete icon image source

    // Append note and delete button to the notes container
    notesContainer.appendChild(inputbox).appendChild(img);

    updateStorage(); // Save changes to localStorage
});

// Event listener for deleting and editing notes
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") { 
        // If delete icon is clicked, remove the corresponding note
        e.target.parentElement.remove();
        updateStorage(); // Save updated notes
    }
    else if (e.target.tagName === "P") { 
        // If a note is clicked, update its content in localStorage when typing
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = updateStorage(); // Save content when user types
        })
    }
});

// Prevent default behavior when pressing "Enter" inside a note
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak"); // Insert a line break instead of submitting
        event.preventDefault(); // Prevent default action
    }
});

const API_URL = "http://localhost:3000/books";

const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

// Get all books from the server
async function fetchBooks() {
  const response = await fetch(API_URL);
  const books = await response.json();

  // Clear list before re-rendering
  bookList.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <strong>${book.title}</strong> by ${book.author}
      </div>
      <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
    `;

    bookList.appendChild(li);
  });
}

// Add a new book
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();

  if (title && author) {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author })
    });

    // Reset form
    bookForm.reset();

    // Re-fetch books
    fetchBooks();
  }
});

// Delete a book
async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchBooks(); // Refresh list
}

// Initial load
fetchBooks();

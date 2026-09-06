const myLibrary = [];
const tbody = document.querySelector('tbody');

function Book(title, author, pages, genre, finished, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.finished = finished;
  this.id = id;
}

function addBookToLibrary(title, author, pages, genre, finished) {
  let id = crypto.randomUUID();
  myLibrary.push(new Book(title, author, pages, genre, finished, id));
}

function displayBooks(numberOfBooks) {
  let tr;
  for (const book of numberOfBooks) {
      tr = document.createElement('tr');
      const tdTitle = document.createElement('td');
      tdTitle.textContent = book.title;
      const tdAuthor = document.createElement('td');
      tdAuthor.textContent = book.author;
      const tdPages = document.createElement('td');
      tdPages.textContent = book.pages;
      const tdGenre = document.createElement('td');
      tdGenre.textContent = book.genre;
      const tdRead = document.createElement('td');
      tdRead.textContent = book.finished;
      const deleteBtnCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.textContent = 'Delete';
      deleteBtn.dataset.bookId = book.id;
      deleteBtnCell.appendChild(deleteBtn);
      tr.append(tdTitle, tdAuthor, tdPages, tdGenre, tdRead, deleteBtnCell);
      

      tr.dataset.bookId = book.id; 
      
  }
  tbody.appendChild(tr);
  console.log(numberOfBooks);
}

// Modal
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => {
  modal.showModal(); 
});

closeBtn.addEventListener("click", () => {
  modal.close(); 
});

// book form
const bookForm = document.querySelector('#book-form');
const bookFormTitle = document.querySelector('#book-title');
const bookFormAuthor = document.querySelector('#book-author');
const bookFormPageNumber = document.querySelector('#page-number');
const bookFormGenre = document.querySelector('#book-genre');
const bookFormRead = document.querySelector('#book-read');
let hasRead;

bookForm.addEventListener('submit', function(event) {
// Stop the form from submitting and reloading the page
    event.preventDefault();

    if (bookFormRead.checked) {
      hasRead = "Read";
    } else {
      hasRead = "Not Read";
    }

    console.log(bookFormTitle.value, bookFormAuthor.value, bookFormPageNumber.value, bookFormGenre.value, hasRead);

    addBookToLibrary(bookFormTitle.value, bookFormAuthor.value, bookFormPageNumber.value, bookFormGenre.value, hasRead);

    displayBooks(myLibrary);
    
});


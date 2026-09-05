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
    for (const book of numberOfBooks) {
        const tr = document.createElement('tr');
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
        tr.append(tdTitle, tdAuthor, tdPages, tdGenre, tdRead);
        tbody.appendChild(tr);
    }
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


addBookToLibrary("The Hobbit", "J.R.R. Tolken", "312", "fantasy", "yes");

addBookToLibrary("Dune", "Frank Herbert", "412", "sci-fi", "yes");

addBookToLibrary("1984", "George Orwell", "328", "dystopian", "no");

addBookToLibrary("Dracula", "Bram Stoker", "418", "horror", "yes");

addBookToLibrary("The Way of Kings", "Brandon Sanderson", "1007", "fantasy", "no");

displayBooks(myLibrary);

// console.log(myLibrary);

const myLibrary = [];
const tbody = document.querySelector('tbody');
let rows = document.querySelectorAll('tbody > tr');

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
      const tdReadSpan = document.createElement('span');
      tdReadSpan.textContent = book.finished;
      tdRead.appendChild(tdReadSpan);
      const changeReadBtn = document.createElement('button');
      changeReadBtn.type = 'button';
      changeReadBtn.textContent = 'Change';
      tdRead.appendChild(changeReadBtn);
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
  rows = document.querySelectorAll('tbody > tr');
  deleteRowBtn();
  changeReadStatus()
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

// book form inside modal
const bookForm = document.querySelector('#book-form');
const bookFormTitle = document.querySelector('#book-title');
const bookFormAuthor = document.querySelector('#book-author');
const bookFormPageNumber = document.querySelector('#page-number');
const bookFormGenre = document.querySelector('#book-genre');
const bookFormRead = document.querySelector('#book-read');
let hasRead;

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (bookFormRead.checked) {
      hasRead = "Read";
    } else {
      hasRead = "Not Read";
    }

    addBookToLibrary(bookFormTitle.value, bookFormAuthor.value, bookFormPageNumber.value, bookFormGenre.value, hasRead);

    displayBooks(myLibrary);  

    document.getElementById('book-title').value = ''; 
    document.getElementById('book-author').value = ''; 
    document.getElementById('page-number').value = ''; 
    document.getElementById('book-genre').value = ''; 
    modal.close(); 
    
});

// delete buttons for each row
function deleteRowBtn() {
  rows.forEach((row) => {
    row.cells[5].querySelector('button').addEventListener("click", (e) => {
      rows.forEach((row) => {
        if (row.cells[5].querySelector('button').dataset.bookId === e.target.dataset.bookId) {
          e.target.closest('tr').remove();
        }
      });
    });
  });
}

// change read status

Book.prototype.toggleRead = function(trSpanElementText) {
  if (this.finished === 'Read') {
    this.finished = 'Not Read';
    trSpanElementText.remove();
    displayBooks(myLibrary);
  } else {
    this.finished = 'Read';
    trSpanElementText.remove();
    displayBooks(myLibrary);
  }
};

function changeReadStatus() {
  rows.forEach((row) => {
    row.cells[4].querySelector('button').addEventListener("click", (e) => {
        myLibrary.forEach((_, index) => {
          if (myLibrary[index].id === e.target.closest('tr').dataset.bookId) {
            // console.log(row.cells[4].querySelector('span').textContent);
            myLibrary[index].toggleRead(row);
          }
        });
      });
    });
  };


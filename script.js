class BookForLibrary {
  #myLibrary = [];
  #rows;

  constructor(elements, title, author, pages, genre, finished, id) {
    this.tbody = elements.tbody;
    this.openBtn = elements.openBtn;
    this.modal = elements.modal;
    this.closeBtn = elements.closeBtn;
    this.bookForm = elements.bookForm;
    this.bookFormTitle = elements.bookFormTitle;
    this.bookFormAuthor = elements.bookFormAuthor;
    this.bookFormPageNumber = elements.bookFormPageNumber;
    this.bookFormGenre = elements.bookFormGenre;
    this.bookFormRead = elements.bookFormRead;
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.finished = finished;
    this.id = id;

    this.attachEvents();
  }

  attachEvents() {
    this.openBtn?.addEventListener("click", this.openModalBtn);
    this.closeBtn?.addEventListener("click", this.closeModalBtn);
    this.bookForm?.addEventListener("submit", this.bookFormModal); 
  }

  addBookToLibrary(title, author, pages, genre, finished) {
    let id = crypto.randomUUID();
    this.#myLibrary.push({title, author, pages, genre, finished, id});
  }

  displayBooks(numberOfBooks) {
    let tr;  
    // console.log(numberOfBooks);
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
    // row gets appended to body
    this.tbody.appendChild(tr);
    this.#rows = document.querySelectorAll('tbody > tr');
    this.deleteRowBtn();
    this.changeReadStatus();
  }

  openModalBtn = () => {
    this.modal.showModal(); 
  }
  
  closeModalBtn = () => {
    this.modal.close(); 
  }

  bookFormModal = (event) => {
    event.preventDefault();
    let hasRead;

    if (this.bookFormRead.checked) {
      hasRead = "Read";
    } else {
      hasRead = "Not Read";
    }

    this.addBookToLibrary(this.bookFormTitle.value, this.bookFormAuthor.value, this.bookFormPageNumber.value, this.bookFormGenre.value, hasRead);
    // console.log(this.#myLibrary);
    this.displayBooks(this.#myLibrary); 
    this.bookFormTitle.value = ''; 
    this.bookFormAuthor.value = ''; 
    this.bookFormPageNumber.value = ''; 
    this.bookFormGenre.value = ''; 
    this.modal.close();  
  }

  // delete buttons for each row
  deleteRowBtn() {
    this.#rows.forEach((row) => {
      row.cells[5].querySelector('button').addEventListener("click", (e) => {
        this.#rows.forEach((row) => {
          if (row.cells[5].querySelector('button').dataset.bookId === e.target.dataset.bookId) {
            e.target.closest('tr').remove();
          }
        });
      });
    });
  }

  toggleRead(trSpanElementText, libraryIndex) { 
    let isReadText = this.#myLibrary[libraryIndex].finished;
    if (isReadText === 'Read') {
        this.#myLibrary[libraryIndex].finished = 'Not Read';
        this.tbody.replaceChildren();
        this.displayBooks(this.#myLibrary);
      } else {
        this.#myLibrary[libraryIndex].finished = 'Read';
        this.tbody.replaceChildren();
        this.displayBooks(this.#myLibrary);
      }
    }

  changeReadStatus() {
    this.#rows.forEach((row) => {
      row.cells[4].querySelector('button').addEventListener("click", (e) => {
          this.#myLibrary.forEach((_, index) => {
            if (this.#myLibrary[index].id === e.target.closest('tr').dataset.bookId) {
              this.toggleRead(row, index);
            }
          });
      });
    });
  };
}

const book = new BookForLibrary({
  tbody: document.querySelector("tbody"),
  openBtn: document.querySelector("#openModalBtn"),
  modal: document.querySelector("#myModal"),
  closeBtn: document.querySelector("#closeModalBtn"),
  bookForm: document.querySelector("#book-form"),
  bookFormRead: document.querySelector("#book-read"),
  bookFormTitle: document.querySelector("#book-title"),
  bookFormAuthor: document.querySelector("#book-author"),
  bookFormPageNumber: document.querySelector("#page-number"),
  bookFormGenre: document.querySelector("#book-genre"),
});
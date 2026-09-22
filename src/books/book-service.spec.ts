import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  it('should not add book without title', () => {
    const book = {
      id: 10,
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    } as Book;

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  it('should not add book an empty title', () => {
    const book = {
      id: 10,
      title: '',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  it('should not add book with totalCopies lesser or equal to 0', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: -1,
    };

    const book2 = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 0,
    };

    const result = service.addBook(book);
    const result2 = service.addBook(book2);

    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  it('should decrement availableCopies when a book is borrowed', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const borrowedBook = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.borrowBook(book.id);

    expect(result).toBe(true);
    expect(book).toEqual(borrowedBook);
  });

  it('should not borrow a book with no availableCopies', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.borrowBook(book.id);

    expect(result).toBe(false);
  });

  it('should not borrow an unexisting book', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.borrowBook(book.id + 1);

    expect(result).toBe(false);
  });

  it('should increment availableCopies when returning a book', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    };

    const returnedBook = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.returnBook(book.id);

    expect(result).toBe(true);
    expect(book).toEqual(returnedBook);
  });

  it('should not return an unexisting book', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.returnBook(book.id + 1);

    expect(result).toBe(false);
  });

  it('should not return a book when all copies are returned', () => {
    const book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.returnBook(book.id);

    expect(result).toBe(false);
  });

  it('should get books correctly', () => {
    const book1 = {
      id: 10,
      title: 'Test Book 1',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const book2 = {
      id: 11,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const book3 = {
      id: 12,
      title: 'Test Book 3',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book1);
    service.addBook(book2);
    service.addBook(book3);
    const result = service.getBooks();

    expect(result).toContainEqual(book1);
    expect(result).toContainEqual(book2);
    expect(result).toContainEqual(book3);
  });

  it('should update a book correctly', () => {
    const book = {
      id: 10,
      title: 'Test Book 1',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const updatedBook = {
      id: 10,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.updateBook(updatedBook);
    const registeredBook = service.getBookById(book.id);

    expect(result).toBe(true);
    expect(registeredBook).toEqual(updatedBook);
  });

  it('should not update an unknown book', () => {
    const unknownBook = {
      id: 10,
      title: 'Test Book 1',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.updateBook(unknownBook);

    expect(result).toBe(false);
  });

  it('should get a book with its id', () => {

    const book = {
      id: 10,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.getBookById(book.id);

    expect(result).toEqual(book);
  });

  it('should return null when a book is not found by its id', () => {

    const unknownBook = {
      id: 10,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.getBookById(unknownBook.id);

    expect(result).toBeNull();
  });

  it('should delete a book with its id', () => {

    const book = {
      id: 10,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    service.addBook(book);
    const result = service.deleteBook(book.id);
    const searchDeletedBook = service.getBookById(book.id)

    expect(result).toBe(true);
    expect(searchDeletedBook).toEqual(null);
  });

  it('should not delete an unknown book', () => {

    const unknownBook = {
      id: 10,
      title: 'Test Book 2',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.deleteBook(unknownBook.id);

    expect(result).toBe(false);
  });
});

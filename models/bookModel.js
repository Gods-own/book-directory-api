const books = require('../data/books.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils.js');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(books)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const bookData = books.find((book) => book.id === id)
        resolve(bookData)
    })
}

function create(newbook) {
    return new Promise((resolve, reject) => {
        let id = uuidv4()
        const book = {id, ...newbook}
        books.push(book)
        writeDataToFile('./data/books.json', books)
        resolve(book)
    })
}

function update(updbook, id) {

    return new Promise((resolve, reject) => {
        const bookIndex = books.findIndex((book) => book.id === id)
        books[bookIndex] = {id, ...updbook}
        writeDataToFile('./data/books.json', books)
        resolve(books[bookIndex])
    })
    
}

function remove(id) {
    return new Promise ((resolve, reject) => {
        const undeletedBooks = books.filter((book) => book.id !== id)
        writeDataToFile('./data/books.json', undeletedBooks)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
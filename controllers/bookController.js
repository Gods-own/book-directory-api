const Book = require('../models/bookModel')
const { getBody } = require('../utils.js')

async function getBooks(request, response) {
    try{
        const books = await Book.findAll()

        if(!books) {
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.write(JSON.stringify({ message: 'Books not found' }))
            response.end()
        }
        else {
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.write(JSON.stringify(books))
            response.end()
        }
    } catch(e) {
        console.log(e)
    }
    
}

async function getBookById(request, response, id) {
    try{

        const book = await Book.findById(id)
        if(!book) {
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.write(JSON.stringify({ message: 'Book not found' }))
            response.end()
        }
        else{
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.write(JSON.stringify(book))
            response.end()
        }    
    } catch(e) {
        console.log(e)
    }
    
}

async function createBook(request, response) {
    try{

        const body = await getBody(request);
    
        const { title, coverUrl, theme, author, postedBy, link } = JSON.parse(body)
        const book = {
            title,
            coverUrl,
            theme,
            author,
            postedBy,
            link
        }
        const newBook = await Book.create(book)
        response.writeHead(201, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(newBook))
        response.end()
    }catch(e){
        console.log(e)
    }
}

async function updateBook(request, response, id) {
    try {
        const book = await Book.findById(id)
        if (!book) {
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.write(JSON.stringify({ message: 'Books not found' }))
            response.end()
        }
        else {
            const body = await getBody(request) 

            const { title, coverUrl, theme, author, postedBy, link } = JSON.parse(body)

            const bookBody = {
                title: title || book.title,
                coverUrl: coverUrl || book.coverUrl,
                theme: theme || book.theme,
                author: author || book.author,
                postedBy: postedBy || book.postedBy,
                link: link || book.link
            }

            const updbook = await Book.update(bookBody, id)
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.write(JSON.stringify(updbook))
            response.end()
        }
    } catch(e) {
        console.log(e)
    }
}

async function removeBook(request, response, id) {
    try {
        await Book.remove(id)
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify({ message: 'Book successfullt deleted' }))
        response.end()
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook
}
const http = require('http');
const { getBooks, getBookById, createBook, updateBook, removeBook } = require('./controllers/bookController')

const server = http.createServer((request, response) => {
    if(request.url === '/allbooks' && request.method === 'GET') {
        getBooks(request, response)        
    }
    else if(request.url.match(/\/allbooks\/([0-9]+)/) && request.method === 'GET') {
        const id = request.url.split('/')[2]
        getBookById(request, response, id)
    }
    else if(request.url === '/allbooks' && request.method === 'POST') {

        createBook(request, response)
    }
    else if(request.url.match(/\/allbooks\/([0-9]+)/) && request.method === 'PUT') {
        const id = request.url.split('/')[2]
        updateBook(request, response, id)
    }
    else if(request.url.match(/\/allbooks\/([0-9]+)/) && request.method === 'DELETE') {
        const id = request.url.split('/')[2]
        removeBook(request, response, id)
    }
    else {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.write(JSON.stringify({ message: 'Route Not Found' }))
        response.end()  
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
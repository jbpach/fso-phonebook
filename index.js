const express = require('express')
const cors = require('cors')
// const morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.json())

// app.use(morgan('tiny'))
// morgan.token('body', (req, res) => JSON.stringify(req.body));
// app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const numOfPersons = persons.length
    const requestDate = new Date()
    response.send(`<p>Phonebook has info for ${numOfPersons} people</p><p>${requestDate}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const person = persons.find(p => p.name === body.name)

    if(person) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } 

    const newPerson = {
        name: body.name, 
        number: body.number, 
        id: Math.floor(Math.random() * 1000000000)
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is listing on ${PORT}`)
})
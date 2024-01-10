import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://cluster-books-api.onrender.com/api'
})

export const getBooks = ()=>{
    return api
    .get('/books')
    .then((body)=>{
        return body.data.books
    })
}

export const getBookBySearch = (bookName) => {
    return api
        .get(`/books?search=${bookName}`)
        .then((body) => {
            return body.data.books
        })
}

export const postLogin = (loginBody) => {
    return api
        .post('/login', loginBody)
        .then((body) => {
            return body.data.token
        }).catch((err) => {
        })
}

export const postUser = (userBody) => {
    return api.post('/users', userBody)
        .then((user) => {
            return user.data
        })
}


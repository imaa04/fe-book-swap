import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://cluster-books-api.onrender.com/api'
})

export const getBooks = ()=>{
    return api
    .get('/books')
    .then(({data:{books}})=>{
        console.log(books, 'this is books from api');
        return books
    })
}

export const postLogin = (loginBody) => {
    return api
        .post('/login', loginBody)
        .then((body) => {
            return body.data.token
        }).catch((err) => {
            console.log('error here');
        })
}

export const postUser = (userBody) => {
    return api.post('/users', userBody)
        .then((user) => {
            console.log('success');
            return user.data
        })
}


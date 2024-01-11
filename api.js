import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://cluster-books-api.onrender.com/api'
})

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
            return user.data
        })
}

export const postBook = (newBook)=>{
    return api.post('/books', newBook)
    .then(({data:{book}})=>{
        console.log(book,'book in the api');
        return book
    })
}


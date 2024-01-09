import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://cluster-books-api.onrender.com/api'
})

export const getBooks = ()=>{
    return api
    .get('/books')
    .then(({data:{books}})=>{
        return books
    })
}

export const postLogin = (loginBody) => {
    console.log(loginBody, 'loginbody api');
    return api
        .post('/login', loginBody)
        .then((body) => {
            return body.data.token
        }).catch((err) => {
            console.log('error here');
        })
}

export const postUser = (userBody) => {
    console.log(userBody);
    return api.post('/users', userBody)
        .then((user) => {
            console.log('success');
            return user.data
        })
}


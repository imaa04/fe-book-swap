import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://cluster-books-api.onrender.com/api'
})

export const getLogin = ()=>{
    return api
    .get('/login')
    .then((token)=>{
        return token
    })
}


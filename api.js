import axios from "axios";

export const api = axios.create({
    baseURL: "https://cluster-books-api.onrender.com/api",
});

export const getBooks = (username)=>{
    return api
    .get('/books', {params: {username}})
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


export const postBook = (newBook)=>{
    return api.post('/books', newBook)
    .then(({data:{book}})=>{
        console.log(book,'book in the api');
        return book
    })
}


export const getGenres = () => {
    return api
        .get('/genres')
        .then((body) => {
            const genreArray = []
            body.data.forEach((book) => {
                genreArray.push(book.genre)
            })
            return genreArray
        })
}

export const getBookByGenre = (bookGenre) => {
    return api
        .get(`/books?genre=${bookGenre}`)
        .then((body) => {
            return body.data.books
        })
        
}

export const postLogin = (loginBody) => {

    return api
        .post("/login", loginBody)
        .then((body) => {
            return body.data.token;
        })
        .catch((err) => {
            console.log("error here");
        });
};


export const postUser = (userBody) => {
    return api.post("/users", userBody).then((user) => {
        return user.data;
    });
};

export const getConversations = (username) => {
    return api.get(`/messages/${username}/`).then((res) => {
        return res;
    });
};

export const getMessages = (user, conversationWith) => {
    return api
        .get(`/messages`, { params: { users: `${user}-${conversationWith}` } })
        .then((res) => {
            return res;
        });
};

export const getUsers = (username) => {
  return api
    .get(`/users`, { params: { username} })
    .then((res) => {
      return res;
    });
};




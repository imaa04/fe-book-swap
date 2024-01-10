import axios from "axios";

export const api = axios.create({
  baseURL: "https://cluster-books-api.onrender.com/api",
});

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

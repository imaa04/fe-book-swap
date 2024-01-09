import axios from "axios";

const clusterBooksAPI = axios.create({
  baseURL: "https://cluster-books-api.onrender.com/api",
});

export const getConversations = (username) => {
  return clusterBooksAPI.get(`/messages/${username}/`).then((res) => {
    return res;
  });
};

export const getMessages = (user, conversationWith) => {
  return clusterBooksAPI
    .get(`/messages`, { params: { users: `${user}-${conversationWith}` } })
    .then((res) => {
      return res;
    });
};


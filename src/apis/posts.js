/* eslint-disable */
import request from "@utils/request";

export const getPosts = (payload) => {
  return request(`api/posts`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getPostsLoadMore = async (payload) => {
  return await request("api/posts/loadmore", payload)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getPostsByCategory = (payload) => {
  return request("api/posts/category", payload)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getPopularPosts = (payload) => {
  return request("api/posts/popular", payload)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getPostsByTag = (payload) => {
  return request("api/posts/tag", payload)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getPost = (payload) => {
  const {postId} = payload;
  return request(`api/post/${postId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPostBySlug = (payload) => {
  return request(`api/post/slug/${payload}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCategories = async () => {
  return await request(`api/categories`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getLabels = async () => {
  return await request(`api/labels`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCategory = (payload) => {
  const {categoryId} = payload;
  return request(`api/category/${categoryId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getTags = () => {
  debugger
  return request(`api/tags`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getTag = (payload) => {
  const {tagId} = payload;
  return request(`api/tag/${tagId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAuthors = () => {
  return request(`api/authors`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPopularAuthors = () => {
  return request(`api/authors/popular`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAuthor = (payload) => {
  const {authorId} = payload;
  return request(`api/author/${authorId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAuthorStatistics = (payload) => {
  const {authorId} = payload;
  return request(`api/author/statistics/${authorId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createComment = (payload, token) => {
  return request("api/post/comment", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const updateComment = (payload, token) => {
  return request("api/post/comment", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};


export const createCommentReply = (payload, token) => {
  return request("api/post/comment/reply", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createPostByUser = (payload, token) => {
  return request("api/user/post", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updatePostByUser = (payload, token) => {
  return request("api/user/post", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPostsByUser = (token) => {
  return request(`api/user/posts`, {}, { method: "GET", token })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const createPostView = (payload) => {
  return request("api/post/view", payload, { method: "POST" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
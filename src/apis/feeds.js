/* eslint-disable */
import request from "@utils/request";

export const getFeed = (payload) => {
  const {feedId} = payload;
  return request(`api/feed/${feedId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getFeeds = (payload) => {
  return request(`api/feeds/${payload}`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getFeedsLoadMore = async (payload) => {
  // er
  return await request("api/feeds/loadmore", payload)
    .then((result) => {
      // er
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const createComment = (payload, token) => {
  return request("api/feed/comment", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createCommentReply = (payload, token) => {
  return request("api/feed/comment/reply", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createFeedByUser = (payload, token) => {
  return request("api/user/feed", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateFeedByUser = (payload, token) => {
  return request("api/user/feed", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteFeedByUser = async (feedId, token) => {
  return request(`api/user/feed/${feedId}`, {}, { method: "DELETE", token })
};

export const getFeedsByUser = (token) => {
  return request(`api/user/feeds`, {}, { method: "GET", token })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getTags = () => {
  return request(`api/tags`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const createFeedView = (payload) => {
  return request("api/feed/view", payload, { method: "POST" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};


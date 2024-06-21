/* eslint-disable */
import { db } from "@utils/firebase";
import request from "@utils/request";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";

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

export const getStory = (payload) => {
  const {storyId} = payload;
  return request(`api/story/${storyId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getFeeds = (payload) => {
  return request(`api/feeds`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getStories = (payload) => {
  return request(`api/stories`, {}, { method: "GET" })
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
export const getFeedsLoadMore2 = (callback, num) => {
  return onSnapshot(
    query(
        collection(db, "newsfeeds"), orderBy("no", "desc"), limit(num)
    ),
    (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(messages);
    }
);
};



export const getStoriesLoadMore = async (payload) => {
  // er
  return await request("api/stories/loadmore", payload)
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

export const updateComment = (payload, token) => {
  return request("api/feed/comment", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createCommentStories = (payload, token) => {
  return request("api/story/comment", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateCommentStories = (payload, token) => {
  return request("api/story/comment", payload, { method: "PUT", token })
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

export const createStoryByUser = (payload, token) => {
  return request("api/user/story", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
export const updateStoryByUser = (payload, token) => {
  return request("api/user/story", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateFeedByUser = (payload, token) => {
  console.log("Payload", payload)
  return request("api/user/feed", payload, { method: "PUT", token })
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteFeedByUser = async (feedId, token) => {
  return request(`api/user/feed/${feedId}`, {}, { method: "DELETE", token })
};

export const deleteStoryByUser = async (storyId, token) => {
  return request(`api/user/story/${storyId}`, {}, { method: "DELETE", token })
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


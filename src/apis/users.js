/* eslint-disable */
import request from "utils/request";

export const generateCustomToken = (token) => {
  return request("api/user/custom-token", {}, { method: "GET", token})
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getProfile = async token => {
  return request("api/user/profile", {}, { method: "GET", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createUserBookmark = (payload, token) => {
  return request("api/user/bookmark", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteUserBookmark = (payload, token) => {
  const { bookmarkType, bookmarkValue} = payload;
  return request(`api/user/bookmark/${bookmarkType}/${bookmarkValue}`, {}, { method: "DELETE", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createUserLike = (payload, token) => {
  return request("api/user/like", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteUserLike = (payload, token) => {
  const { likeType, likeValue} = payload;
  console.log("Call function", likeValue)
  return request(`api/user/like/${likeType}/${likeValue}`, {}, { method: "DELETE", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createUserFollow = (payload, token) => {
  return request("api/user/follow", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteUserFollow = (payload, token) => {
  const {authorId} = payload;
  return request(`api/user/follow/${authorId}`, {}, { method: "DELETE", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getReferralLinkByPartnerAndUserName = (payload) => {
  const {username, partnerId} = payload;
  return request(`api/user/referral/link/${username}/${partnerId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getReferralLinkByPartnerForTask = (partnerId, token) => {
  return request(`api/user/task/link/${partnerId}`, {}, { method: "GET", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updatePartnerTasks = (payload, token) => {
  return request("api/user/partner-tasks", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateProfile = (payload, token) => {
  return request("api/user/profile", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateCCCDFrontPhoto = (payload, token) => {
  const formData = new FormData();
  formData.append('file', payload);
  return request(`api/user/profile/upload/cccd-front-photo`, formData, { method: "POST", token })
};
export const updateCCCDBackSidePhoto = (payload, token) => {
  const formData = new FormData();
  formData.append('file', payload);
  return request(`api/user/profile/upload/cccd-backside-photo`, formData, { method: "POST", token })
};

export const userPhotoUpload = async (payload, token) => {
  const formData = new FormData();
  formData.append('file', payload?.photo);
  return request(`api/user/photo/${payload?.userId}`, formData, { method: "POST", token })
};

export const createUserRanking = (payload, token) => {
  return request("api/user/ranking", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getUsersRanking = async (payload) => {
  return await request("api/users/ranking", payload, { method: "POST" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const updateIdentity = (payload, token) => {
  return request("api/user/identity", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
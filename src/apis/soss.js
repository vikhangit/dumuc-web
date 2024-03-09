/* eslint-disable */
import request from "@utils/request";

export const getSoss = (payload) => {
  return request(`api/soss`, payload, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getSos = (payload) => {
  const {sosId} = payload;
  return request(`api/sos/${sosId}`, {}, { method: "GET" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createSos = (payload, token) => {
  return request("api/user/sos", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateSos = (payload, token) => {
  return request("api/user/sos", payload, { method: "PUT", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const cancelSos = (payload, token) => {
  return request("api/user/sos/cancel", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const expireSos = (payload, token) => {
  return request("api/user/sos/expire", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const createSosHelper = (payload, token) => {
  return request("api/user/sos/helper", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const completeSosHelper = (payload, token) => {
  return request("api/user/sos/helper/complete", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const completeConfirmSosHelper = (payload, token) => {
  return request("api/user/sos/helper/complete/confirm", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const cancelSosHelper = (payload, token) => {
  return request("api/user/sos/helper/cancel", payload, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};


export const uploadPhotoSos = (payload, token) => {
  const formDataUploadPhoto = new FormData();
  formDataUploadPhoto.append("file", payload.photo);

  return request(`api/user/sos/photo/${payload.sosId}`, formDataUploadPhoto, { method: "POST", token })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const getSossByUser = (token) => {
  return request(`api/user/soss`, {}, { method: "GET", token })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getHelperSossByUser = (token) => {
  return request(`api/user/helper-soss`, {}, { method: "GET", token })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getHelperSossByMember = (userId) => {
  return request(`api/helper-soss/${userId}`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const getSosTypes = (payload) => {
  return request(`api/sosTypes/${payload}`, {}, { method: "GET" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

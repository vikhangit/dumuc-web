/* eslint-disable */
import request from "@utils/request";

export const createContact = (payload) => {
  return request("api/contact", payload, { method: "POST" })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
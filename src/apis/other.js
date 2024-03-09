/* eslint-disable */
import request from "utils/request";
import { storage } from 'utils/firebase'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import moment from "moment";

export const uploadImage = async (payload, token) => {
    const formDataUploadPhoto = new FormData();
    formDataUploadPhoto.append('file', payload);
    return request(`api/user/upload/image`, formDataUploadPhoto, { method: "POST", token })
};

export const getAddressFromLatLng = async (payload, token) => {
    return request(`api/user/geocode?lat=${payload?.lat}&lng=${payload?.lng}`, {}, { method: "GET", token })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export const uploadFile = async (file, forderName = 'upload') => {
    const storageRef = ref(storage, `${forderName}/${new moment().format('YYYYMMDD')}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref)
};

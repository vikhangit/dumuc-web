import request from "@utils/request";

//admin
export const tenantList = async (payload, token) => {
    return request(`api/admin/tenants`, payload, { method: "POST", token })
};

export const tenantDetail = async (payload, token) => {
    return request(`api/admin/tenant/${payload}`, {}, { method: "GET", token })
};

export const tenantUpdate = async (payload, token) => {
    return request(`api/admin/tenant`, payload, { method: "PUT", token })
};

//dashboard
export const tenantGet = async (token) => {
    return request('api/tenant', {}, { method: "GET", token })
};

//guest
export const tenantCreate = (payload) => {
    return request('api/tenant', payload, { method: "POST" })
      .then(data => {
          return;
      })
      .catch(err => {
          return err;
      });
};
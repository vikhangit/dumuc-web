/* eslint-disable */
import request from "utils/request";

export const createUser = (payload) => {
  return request('api/user/create', payload)
      .then(data => {
          return;
      })
      .catch(err => {
          return err;
      });
};

export const loginGoogle = (payload) => {
  return request('api/user/create-by-google', payload)
      .then(data => {
          return;
      })
      .catch(err => {
          return err;
      });
};

export const login = (payload) => {
  return request("api/user/login", payload)
    .then((data) => {
      if (!data.token) {
        return;
      }
      setCookie("__a_token", data.token);
    })
    .catch((err) => {
      return err;
    });
};

export const contact = (payload) => {
  return request("api/user/contact", payload)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export const signup = (payload) => {
  return request("api/user/signup", payload)
    .then((data) => {
      if (!data.token) {
        return;
      }
      setCookie("__a_token", data.token);
    })
    .catch((err) => {
      return err;
    });
};

export const changePassword = (payload) => {
  return request("api/user/change-password", payload)
    .then((data) => {
      return;
    })
    .catch((err) => {
      return err;
    });
};

export const forgotPassword = (payload) => {
  return request("api/user/reset-password", payload)
    .then(() => {
      return;
    })
    .catch((err) => {
      return err;
    });
};

export const logout = (next) => {
  removeCookie("__a_token");
  next();
};

export const authenticate = (next) => {
  request("api/user/user", {}, { method: "GET" })
    .then((user) => {
      setCookie("__user", user)
      setLocalStorage("user", user);
      next();
    })
    .catch((err) => {
      next();
    });
};

// export const isAuth = () => {
//   const cookieStore = cookies()
//   if (process.browser) {
//     const tokenChecked = cookieStore.get("__a_token");
//     if (tokenChecked) {
//       if (localStorage.getItem("user")) {
//         return JSON.parse(localStorage.getItem("user"));
//       } else {
//         return false;
//       }
//     }
//   }
// };

// // set cookie
// export const setCookie = (key, value, expires = 1) => {
//   const cookieStore = cookies()
//   if (process.browser) {
//     cookieStore.set(key, value, {
//       expires,
//     });
//   }
// };

// export const removeCookie = (key) => {
//   const cookieStore = cookies()
//   if (process.browser) {
//     cookieStore.remove(key, {
//       expires: 1,
//     });
//   }
// };
// // get cookie
// export const getCookie = (key) => {
//   const cookieStore = cookies()
//   if (process.browser) {
//     return cookieStore.get(key);
//   }
// };

// export const setLocalStorage = (key, value) => {
//   if (process.browser) {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// export const removeLocalStorage = (key) => {
//   if (key) {
//     if (process.browser) {
//       localStorage.removeItem(key);
//     }
//   } else {
//     if (process.browser) {
//       localStorage.clear();
//     }
//   }
// };

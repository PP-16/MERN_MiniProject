//save token or username in session storage
export const authenticate = (response, next) => {
  if (window !== null) {
    //save data in session storage
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.username));
  }
  next();
};

//get token
export const getToken = () => {
  if (window !== null) {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};
//get data user
export const getUser = () => {
  if (window !== null) {
    if (sessionStorage.getItem("user")) {
      
      return JSON.parse(sessionStorage.getItem("user"));

    } else {
      return false;
    }
  }
};

//logout
export const logout = (next) => {
  if (typeof window !== "undefined") { // Corrected the comparison
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next()
}
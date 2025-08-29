import axios from "axios";
import {
  LoginTokenReduser,
  LoginUserReduser,
  UserEditReduser,
  UserProfilePicReduser,
  AlluserProfileGetReduser,
  // TotalUserReduser,
  // TotalAttendanceReduser,
} from "../redecer/AllReducers";
import { toast } from "react-toastify";

const token = localStorage.getItem("authtoken");

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const LoginUserAction = (obj12) => async (dispatch) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_AUTH}`, {
      username: obj12.email,
      password: obj12.password,
    });

    if (res.status === 200) {
      const user = res.data;
      // console.log(user);
      
      const userRole = user.roles && user.roles[0] ? user.roles[0] : null;

      if (userRole) {
        localStorage.setItem('password' , obj12.password )
        localStorage.setItem("authtoken", user.token);
        localStorage.setItem("user_email", user.user_email);
        localStorage.setItem("user_name", user.user_display_name);
        localStorage.setItem("role", userRole);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_id", user.user_id);
        dispatch(LoginTokenReduser(res?.data));
        dispatch(LoginUserReduser(res.data));
        return user;
      } else {
        console.error("User role is missing.");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const FetchUserProfileAction = (body) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authtoken");
    const profileResponse = await axios.get(
      `${import.meta.env.VITE_API_PROFILE_GET}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(profileResponse.data, "============================jsut check");

    if (profileResponse.status == 200) {
      dispatch(UserProfilePicReduser(profileResponse.data.profile_image));
      return profileResponse;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const FetchAllUserProfileAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("authtoken");
    const profileResponse = await axios.get(`${import.meta.env.VITE_API_PROFILE_GET_ALL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(profileResponse, "Full API response"); // Log the response
    if (profileResponse.status == 200) {
      dispatch(AlluserProfileGetReduser(profileResponse?.data)); // Send full response, not just [0]
      return profileResponse;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const EditUserProfileAction =
  (userInfo, user_id) => async (dispatch) => {
    try {
      const profileResponse = await axios.put(
        `${import.meta.env.VITE_API_CUSTOM_USERS}/${user_id}`,
        userInfo,
        header
      );

      if (profileResponse.status == 200) {
        dispatch(UserEditReduser(userInfo));
        return profileResponse;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

export const ProfilePicUpdateAction = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${import.meta.env.VITE_API_PROFILE_UPDATE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response, "=====ProfilePicUpdateAction");
console.log(response.data,"check");

    if (response?.data) {
      dispatch(UserProfilePicReduser(response.data.url));
      return response;
    }
  } catch (error) {
    console.error("Error ProfilePicUpdateAction:", error);
  }
};

export const ChangePasswordAction = (obj) => async (dispatch) => {
  // console.log(obj, "===========object");
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_CHANGE_PASSWORD,
      obj
    );
    // console.log(response?.data?.message);
    toast.success(response?.data?.message);

    return response;
  } catch (error) {
    if (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error.response.data, "======error.response.data");
    }
  }
};

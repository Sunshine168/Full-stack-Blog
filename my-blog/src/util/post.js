import { toast } from "react-toastify";
import emitter from "./event-emitter";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const get = async url => {
  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: CREDENTIALS
    });
    const data = await result.json();
    if (data.resCode === 500) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      if (data.resCode === 401) {
        emitter.emit("USER_INVALID");
        return;
      }
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      code: -2,
      message: e.message
    };
  }
};

export const post = async (url, body) => {
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: CREDENTIALS
    });
    const data = await result.json();
    if (data.resCode !== 200) {
      if (data.resCode === 401) {
        emitter.emit("USER_INVALID");
      }
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      message: e.message,
    };
  }
};

export const formPost = async (url, formData) => {
  try {
    var result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
    const data = await result.json();
    if (data.resCode === 500) {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      throw new Error(data.message);
    }
    return {
      data
    };
  } catch (e) {
    return {
      code: -2,
      message: "未知错误"
    };
  }
};

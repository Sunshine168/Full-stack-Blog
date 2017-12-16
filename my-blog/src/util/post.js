export const DOMAIN = "";
const CREDENTIALS = process.env.ORIGIN ? "include" : "same-origin";

export const get = async(url)=> {
  try {
    var result = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: CREDENTIALS
    });
    const data = await result.json()
    return {
      code:1,
      data,
    };
  } catch (e) {
    return {
      code: -2,
      message: e.message,
    };
  }
};

export const post = async(url,body)=>{
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
    const data = await result.json()
    return data
  } catch (e) {
    return {
      code: -2,
      message: "未知错误"
    };
  }
}

export const formPost = async(url,formData)=>{
  try {
    var result = await fetch(url, {
      method: "POST",
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
       },
      body: formData
    });
    const data = await result.json()
    return {
      code:1,
      data,
    };
  } catch (e) {
    return {
      code: -2,
      message: "未知错误"
    };
  }
}
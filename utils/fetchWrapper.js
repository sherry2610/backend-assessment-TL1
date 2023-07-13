import fetch from "node-fetch";

export const fetchApi = async (route, body, method = "get") => {
  try {
    let config = {
      method: method ? method : "get",
    };

    if (body) config.body = body;

    const response = await fetch(`${route}`, config);

    const responseJSON = await response.json();
    return { payload: responseJSON, status: response.status };
  } catch (err) {
    console.log("error in fetch", { route, err });
    return { status: false };
  }
};

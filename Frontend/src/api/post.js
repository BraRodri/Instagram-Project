import { basePath } from "./config";

export function addPostApi(data, userId) {
  const url = `${basePath}/addPost/${userId}`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function uploadImageApi(avatar) {
  const url = `${basePath}/uploadImgPost`;

  const formData = new FormData();
  formData.append("image", avatar);

  const params = {
    method: "POST",
    body: formData,
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

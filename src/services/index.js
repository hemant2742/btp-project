import axios from "axios";

const path = "http://localhost:8080";

export const dataEncryption = async (payload) => {
  const data = await axios({
    method: "post",
    url: `${path}/crypto/encrypt`,
    data: payload,
  });
  if (data.status === 200 || data.status === 201) {
    return data;
  } else {
    throw new Error("Process failed!");
  }
};

export const dataDecryption = async (payload) => {
  await axios({
    method: "post",
    url: `${path}/crypto/decrypt`,
    data: payload,
  });
};

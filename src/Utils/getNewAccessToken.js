import axios from "axios";

export default async function getNewAccessToken() {
  try {
    const newToken = await axios.get(
      "https://e-commerce-backend-two-rouge.vercel.app/refresh",
      {
        withCredentials: true,
      }
    );

    return newToken.data.accessToken;
  } catch (err) {
    console.log(err);
  }
}

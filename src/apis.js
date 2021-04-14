import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
});
const apiKey = "YOUR_API_KEY";
// error test
// const apiKey = "";

const getLists = async ({ query, pageToken }) => {
  let apiUrl = `/search?part=snippet&maxResults=15&type=video&q=${query}&key=${apiKey}`;
  if (pageToken) {
    apiUrl = `/search?part=snippet&maxResults=15&type=video&q=${query}&key=${apiKey}&pageToken=${pageToken}`;
  }

  return await axiosInstance
    .get(apiUrl)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error?.response?.data;
    });
};

export default getLists;


const ADMIN_API_URL: string = "@api.cloudinary.com/v1_1/";
const API_KEY: string | undefined = process.env.REACT_APP_CLOUDINARY_KEY;
const API_SECRET: string | undefined = process.env.REACT_APP_CLOUDINARY_SECRET;
const CLOUD_NAME: string = "bethany";
const BASE_URL: string | undefined= process.env.REACT_APP_API_PROXY;
// example request structure
// https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image

export { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME, BASE_URL }
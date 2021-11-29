const httpProtocol =
  process.env.REACT_APP_USE_SSL === "false" ? "http" : "https";
const wsProtocol = process.env.REACT_APP_USE_SSL === "false" ? "ws" : "wss";

export const apiUrl = `${httpProtocol}://${process.env.REACT_APP_API_HOST}/api/`;
export const wsUrl = `${wsProtocol}://${process.env.REACT_APP_API_HOST}/ws/`;

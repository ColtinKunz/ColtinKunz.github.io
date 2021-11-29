// const httpProtocol =
// process.env.REACT_APP_USE_SSL === "false" ? "http" : "https";
// const wsProtocol = process.env.REACT_APP_USE_SSL === "false" ? "ws" : "wss";
const httpProtocol = "http";
const wsProtocol = "ws";
const host = "localhost:8000";

export const apiUrl = `${httpProtocol}://${host}/api/`;
export const wsUrl = `${wsProtocol}://${host}/ws/`;

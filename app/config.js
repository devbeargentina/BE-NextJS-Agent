// config.js
const config = {
  Language: localStorage.getItem("lang") === null ? "en-US" : localStorage.getItem("lang").length === 2 ? "en-US" : localStorage.getItem("lang")
};

export default config;

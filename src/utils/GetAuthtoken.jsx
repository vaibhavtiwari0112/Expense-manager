const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  return token ? token.replace(/^"|"$/g, "") : null;
};

export default getAuthToken;

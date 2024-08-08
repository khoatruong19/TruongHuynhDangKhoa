const getTokens = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    }, 2000);
  });
};

export default { getTokens };

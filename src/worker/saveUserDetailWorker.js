// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  self.onmessage = async function (event) {
    const { userDetail, BASE_URL } = event.data;

    try {
      if (!BASE_URL) {
        throw new Error("Base URL is not defined");
      }

      const response = await fetch(`${BASE_URL}/api/save-user-detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetail),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      self.postMessage({ success: true, result, status: response.status });
    } catch (error) {
      // Handle the case where error might not have a status
      self.postMessage({
        success: false,
        error: error.message || "An unexpected error occurred",
        status: error.status || 500,
      });
    }
  };
};

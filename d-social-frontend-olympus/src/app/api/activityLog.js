const baseUrl = process.env.BASE_URL;

export const loginActivty = async ({...data}) => {
  try {
    // console.log(data.email);
    const formData = new URLSearchParams();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await fetch(baseUrl + "/login-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const responseData = await response.json();

    return await responseData;
  } catch (err) {
    return err.response?.data;
  }
};

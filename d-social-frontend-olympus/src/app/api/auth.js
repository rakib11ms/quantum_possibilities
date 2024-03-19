const baseUrl = process.env.BASE_URL;


export const login = async ({ ...data }, { ...position }) => {

    try {
        console.log(position);
        const formData = new URLSearchParams();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('latitude', position.latitude);
        formData.append('longitude', position.longitude);


        const response = await fetch(baseUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const responseData = await response.json();



        return await responseData;
    } catch (err) {
        return err.response?.data
    }
}



export const registration = async ({ ...data }) => {

    try {
        console.log(position);
        const formData = new URLSearchParams();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('latitude', position.latitude);
        formData.append('longitude', position.longitude);


        const response = await fetch(baseUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const responseData = await response.json();



        return await responseData;
    } catch (err) {
        return err.response?.data
    }
}
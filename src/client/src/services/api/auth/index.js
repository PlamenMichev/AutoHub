import globalConstants from "../../../global-constants";

const login = async (body, onSuccess, onFailure) => {
    const promise = await fetch(`${globalConstants.serverUrl}/users/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const response = await promise.json();

        if (promise.status > 300) {
            const error = await response.message;
            onFailure(error);
        } else {
            const authToken = promise.headers.get('auth');
            document.cookie = `auth=${authToken}`;
            const user = {
                firstName: response.firstName,
                id: response._id,
            }
            onSuccess(user);
        }
}

const register = async (body, onSuccess, onFailure) => {
    const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }

        const promise = await fetch(`${globalConstants.serverUrl}/users/register`, {
            method: 'POST',
            body: formData,
        });

        const response = await promise.json();

        if (promise.status > 300) {
            const error = await response.message;
            onFailure(error);
        } else {
            const authToken = promise.headers.get('auth');
            document.cookie = `auth=${authToken}`;
            const user = {
                firstName: response.firstName,
                id: response._id,
            }
            onSuccess(user);
        }
}

export default {
    login,
    register,
}
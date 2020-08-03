const login = async (url, body, onSuccess, onFailure) => {
    const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('promise', promise);
        const response = await promise.json();

        if (promise.status > 300) {
            const error = await response.message;
            onFailure(error);
        } else {
            const authToken = promise.headers.get('auth');
            document.cookie = `auth=${authToken}`;
            onSuccess();
        }
}

const register = (url, body, onSuccess, onFailure) => {
    
}

export default {
    login,
}
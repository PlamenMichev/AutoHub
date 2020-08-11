const getUser = async (userId) => {
    const promise = await fetch(`http://localhost:3001/users/${userId}`);
    const user = promise.json();

    return user;
}

export default {
    getUser,
}
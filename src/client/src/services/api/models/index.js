const getModels = async (make) => {
    const promise = await fetch(`http://localhost:3001/models?make=${make}`);

    if (promise.status !== 200) {
        return [];
    } else {
        const models = await promise.json();
        return models;
    }
}

export default {
    getModels,
};
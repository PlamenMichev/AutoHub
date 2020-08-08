import globalConstants from "../../../global-constants";

const getModels = async (make) => {
    const promise = await fetch(`${globalConstants.serverUrl}/models?make=${make}`);

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
import globalConstants from "../../../global-constants";

const getMakes = async () => {
    const promise = await fetch(`${globalConstants.serverUrl}/makes/all`);
    if (promise.status !== 200) {
        return [];
    } else {
        const makes = await promise.json();
        return makes;
    }
}

export default {
    getMakes,
};
const getMakes = async () => {
    const promise = await fetch('http://localhost:3001/makes/all');
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
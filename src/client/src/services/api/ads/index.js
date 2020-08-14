import globalConstants from '../../../global-constants';

const CreateAd = async (body, onSuccess, onFailure) => {
    const formData = new FormData();
    for (const key in body) {
        if (key === 'photos') {
            for (const photo of body[key]) {
                formData.append('photos', photo);
            }
        } else {
            formData.append(key, body[key]);
        }
    }

    const promise = await fetch(`${globalConstants.serverUrl}/ads/create`, {
        method: 'POST',
        body: formData,
    });

    const response = await promise.json();

    if (promise.status > 300) {
        onFailure('Invalid data!');
    } else {
        onSuccess();
    }
}

export default {
    CreateAd,
}
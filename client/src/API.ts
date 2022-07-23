// example request structure
// https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image

import { ADMIN_API_URL, API_KEY, API_SECRET, CLOUD_NAME } from './config';

const apiSettings = {
    getUserPhotos: async (username: string): Promise<any> => {
        const endpoint = `https://${API_KEY}:${API_SECRET}${ADMIN_API_URL}${CLOUD_NAME}/resources/image`
    }
}

export default apiSettings;
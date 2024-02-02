const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token');
    try {
        const data = await $fetch(`${apiUrl}/profile/orders`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return data.data;
    } catch(error) {
        return error;
    }
});
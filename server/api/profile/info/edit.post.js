const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = getCookie(event, 'token');
    try {
        const data = await $fetch(`${apiUrl}/profile/info/edit`, {
            method: 'POST',
            body: body,
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
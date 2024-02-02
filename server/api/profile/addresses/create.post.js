const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = getCookie(event, 'token');
    console.log(body);
    try {
        console.log('in try', body);
        const data = await $fetch(`${apiUrl}/profile/addresses/create`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('after try', body);
        console.log(data.data);
        return data.data;
    } catch(error) {
        console.log('in error', body);
        return error;
    }
});
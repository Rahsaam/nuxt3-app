const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    // console.log(body);
    try {
        const data = await $fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json'
            },
        });

        setCookie(event, 'login_token', data.data.login_token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });
        console.log(data);
        return 'login success';
    } catch(error) {
        console.log(error.data.message);
        return error;
    }
})
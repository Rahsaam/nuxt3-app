const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const loginToken = getCookie(event, 'login_token');
    // console.log(body, loginToken, {...body, login_Token: loginToken});
    try {
        const data = await $fetch(`${apiUrl}/auth/check-otp`, {
            method: 'POST',
            body: {...body, login_token: loginToken},
            headers: {
                'Accept': 'application/json'
            },
        });

        setCookie(event, 'token', data.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });

        setCookie(event, 'login_token', '', {
            httpOnly: true,
            secure: true,
            maxAge: new Date(0),
            path: '/'
        });
        return data.data.user;
    } catch(error) {
        console.log(error.data.message);
        return error;
    }
});
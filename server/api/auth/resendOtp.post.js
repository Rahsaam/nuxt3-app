const runtimeConfig = useRuntimeConfig();
const { apiUrl } = runtimeConfig.public;


export default defineEventHandler(async (event) => {
    const loginToken = getCookie(event, 'login_token');
    try {
        const data = await $fetch(`${apiUrl}/auth/resend-otp`, {
            method: 'POST',
            body: {login_token: loginToken},
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
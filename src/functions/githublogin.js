export default function loginWithGithub(){
    const clientId = "Ov23liNIKGOX6tMb84AL";
    const redirectUri = "http://localhost:5173/auth/github/callback";
    const scope = "repo";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
}
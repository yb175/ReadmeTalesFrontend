export default function loginWithGithub(){
    const clientId = "Ov23liNIKGOX6tMb84AL";
    const redirectUri = "https://readme-tales-frontend.vercel.app/auth/github/callback";
    const scope = "repo";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
}
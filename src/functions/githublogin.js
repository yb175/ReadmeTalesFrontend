export default function loginWithGithub(){
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = "https://readme-tales-frontend.vercel.app/auth/github/callback";
    const scope = "repo";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
}
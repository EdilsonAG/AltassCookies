import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Callback() {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (!code) {
            navigate('/login')
            return
        }

        // Troca o code pelo cookie de sessão
        fetch('http://localhost:8080/oauth2/token', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('food:food123'),
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:5173/callback',
                code_verifier: localStorage.getItem('codeVerifier') || '',
            }),
        }).then(() => {
            localStorage.removeItem('codeVerifier')
            localStorage.removeItem('oauth_state')
            navigate('/')
        })
            .catch(() => navigate('/login'))

    }, [navigate])

    return <p style={{ padding: '2rem' }}>Autenticando...</p>
}
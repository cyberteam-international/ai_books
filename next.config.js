/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    webpack: {
        devServer: {
            allowedHosts: "all"
        }
    },
    env: {
        BACKEND_URL: 'https://lp.aibooks.ru'
        // BACKEND_URL: 'http://localhost:5555'
    },
}

module.exports = nextConfig

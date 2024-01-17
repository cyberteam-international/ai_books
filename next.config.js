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

    },
}

module.exports = nextConfig

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
        BACKEND_URL: 'http://localhost:3001'
    },
}

module.exports = nextConfig

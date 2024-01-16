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
        BACKEND_URL: 'http://185.251.89.86:3001'
    },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    webpack: {
        devServer: {
            allowedHosts: "all"
        }
    }
}

module.exports = nextConfig

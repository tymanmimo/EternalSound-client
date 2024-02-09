/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'lh3.googleusercontent.com',
            },
            {
                hostname: 'yt3.googleusercontent.com',
            },
            {
                hostname: 'i.ytimg.com',
            },
            {
                hostname: 'yt3.ggpht.com',
            },
        ],
    },
};

module.exports = nextConfig;

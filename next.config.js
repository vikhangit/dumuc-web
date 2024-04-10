/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: false,
    images: {
        domains: [
          'firebasestorage.googleapis.com',
          'googleapis.com',
          'localhost',
          'lh3.googleusercontent.com',
          'wall.vn'
        ]
    },
}



module.exports = nextConfig

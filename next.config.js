/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        esmExternals: "loose", // required to make Konva & react-konva work
        webpackBuildWorker: true
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work

        return config;
    },
};
module.exports = nextConfig

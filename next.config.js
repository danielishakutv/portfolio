/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'

module.exports = {
	output: 'export',
	trailingSlash: true,
	basePath: isPages ? '/portfolio' : undefined,
	// use a consistent assetPrefix without a trailing slash
	assetPrefix: isPages ? '/portfolio' : undefined,
	images: { unoptimized: true },
}

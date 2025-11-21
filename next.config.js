/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true'

module.exports = {
	output: 'export',
	trailingSlash: true,
	basePath: isPages ? '/portfolio' : undefined,
	// use a consistent assetPrefix without a trailing slash
	assetPrefix: isPages ? '/portfolio' : undefined,
	images: { unoptimized: true },
	// expose base path to the client so static assets (like prebuilt CSS)
	// can be referenced correctly in the app when deployed to GitHub Pages
	env: {
		NEXT_PUBLIC_BASE_PATH: isPages ? '/portfolio' : '',
	},
}

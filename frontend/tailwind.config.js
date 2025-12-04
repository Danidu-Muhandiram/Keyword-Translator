module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html"
	],
	theme: {
		extend: {
			colors: {
				primary: '#22c55e', // Tailwind green-500
				background: '#ffffff',
			},
		},
	},
	plugins: [],
};

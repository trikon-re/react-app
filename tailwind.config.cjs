
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#1a946e",
					light: "#a3d4c5",
					dark: "#082c21",
					50: "#badfd4",
					100: "#a3d4c5",
					200: "#8dcab7",
					300: "#5fb49a",
					400: "#319f7d",
					500: "#178563",
					600: "#12684d",
					700: "#105942",
					800: "#0d4a37",
					900: "#0a3b2c",
				},
				// secondary: {
				// 	DEFAULT: "#343c7b",
				// 	light: "#5d6395",
				// 	dark: "#242a56",
				// 	50: "#d6d8e5",
				// 	100: "#aeb1ca",
				// 	200: "#9a9ebd",
				// 	300: "#858ab0",
				// 	400: "#7177a3",
				// 	500: "#2f366f",
				// 	600: "#2a3062",
				// 	700: "#242a56",
				// 	800: "#1f244a",
				// 	900: "#151831",
				// },
				background: {
					DEFAULT: "#E6E8F1",
					light: "#FFFFFF",
					dark: "#F1F5F9",
				},
				text:{
					DEFAULT:"#2D3D45",
					light:"#4A6979",
					dark:"#414141"
				}
			},
		},
		screens: {
			xs: "375px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
	important: true,
};

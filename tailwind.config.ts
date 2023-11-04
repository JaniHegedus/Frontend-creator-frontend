const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ffe9c4",
          200: "#ffd285",
          300: "#f7b645",
          400: "#f9ad29",
        },
        secondary: {
          100: "#e9f5f5",
          200: "#cadede",
          300: "#9ab3b3",
          400: "#6b7d7d",
          500: "#506161",
          600: "#404d4d",
          700: "#2a3232",
          800: "#131717",
        },
        brokenWhite: {
          100: "#fcfbf7",
        },
        success: {
          100: "#97f783",
          200: "#37b31e",
          300: "#198f01",
        },
        warning: {
          100: "#fff675",
          200: "#e6d600",
          300: "#c9bc00",
        },
        error: {
          100: "#fa9898",
          200: "#ff2121",
          300: "#bd0000",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        rotate: "rotating 2s linear infinite",
      },
      keyframes: {
        rotating: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      theme: {
        height:{
          '10vh': '10vh',
          '20vh': '20vh',
          '30vh': '30vh',
          '40vh': '40vh',
          '50vh': '50vh',
          '60vh': '60vh',
          '70vh': '70vh',
          '78vh': '78vh',
          '80vh': '80vh',
          '90vh': '90vh',
        },
        width:{
          '10vh': '10vh',
          '20vh': '20vh',
          '30vh': '30vh',
          '40vh': '40vh',
          '50vh': '50vh',
          '60vh': '60vh',
          '70vh': '70vh',
          '80vh': '80vh',
          '90vh': '90vh',
          '160vh': '160vh',
        }
      }
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          width: "90%",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        },
        ".header-container": {
          width: "90%",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        },
        ".mobile-header-container": {
          width: "90%",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      });
    },
  ],
};
export default config;

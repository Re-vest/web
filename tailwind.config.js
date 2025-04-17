/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}", "index.html"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/assets/home.png')",
        doacao: "url('/src/assets/doacoes.png')",
        bazar: "url('/src/assets/bazar.png')"
      },
      fontFamily: {
        rhodium: "'Rhodium Libre', 'serif'",
      },
      colors: {
        yellow: {
          600: "#FFC600",
        },
        blue: {
          500: "#00A1FF",
          950: "#1F2A44",
        },
      },
      screens: {
        custom: { max: "1000px" }, // Breakpoint personalizado
        mdCustom: "769px", // Aparece a partir de 769px
      },
    },
  },
  plugins: [],
};

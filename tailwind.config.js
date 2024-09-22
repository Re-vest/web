/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/assets/home.png')",
        bazar: "url('/src/assets/bazar.png')",
        doacao: "url('/src/assets/doacoes.png')"
      },
      fontFamily: {
        'rhodium': "'Rhodium Libre', 'serif'"
      },
      colors: {
        yellow: {
          600: '#FFC600'
        },
        blue: {
          500: "#00A1FF",
          950: "#1F2A44"
        }
      }
    },
  },
  plugins: [],
}


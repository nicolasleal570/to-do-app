/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './context/**/*.{js,jsx,ts,tsx}',
    ],
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    minHeight: {
      12: '3rem',
      screen: '100vh',
    },
    extend: {
      colors: {
        primary: '#3871FF',
        secondary: '#B8CCFF',
        dark: '#283345',
        darkAccent: '#475B7B',
        darkNavbar: '#181F2A',
        lightSecondary: '#A8A8A8',
        danger: '#FF6262',
        info: '#F1B170',
      },
      spacing: {
        card: '560px',
        'task-card': '189px',
        'task-card-content': '133px',
      },
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{html,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      },
      colors: {
        gray: {
          0: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529'
        },

        red: {
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
          700: '#F03E3E',
          800: '#E03131',
          900: '#C92A2A'
        },

        pink: {
          50: '#FFF0F6',
          100: '#FFDEEB',
          200: '#FCC2D7',
          300: '#FAA2C1',
          400: '#F783AC',
          500: '#F06595',
          600: '#E64980',
          700: '#D6336C',
          800: '#C2255C',
          900: '#A61E4D'
        },
        teal: {
          50: '#E6FCF5',
          100: '#C3FAE8',
          200: '#96F2D7',
          300: '#63E6BE',
          400: '#38D9A9',
          500: '#20C997',
          600: '#12B886',
          700: '#0CA678',
          800: '#099268',
          900: '#087F5B'
        },

        green: {
          50: '#EBFBEE',
          100: '#D3F9D8',
          200: '#B2F2BB',
          300: '#8CE99A',
          400: '#69DB7C',
          500: '#51CF66',
          600: '#40C057',
          700: '#37B24D',
          800: '#2F9E44',
          900: '#2B8A3E'
        }
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
        }
      },
      animation: {
        'slide-up-and-fade':
          'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-and-fade':
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'overlay-show': 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'content-show': 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};

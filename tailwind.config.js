/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'primary-hover': '#2563eb',
        'primary-light': '#eff6ff',
      },
      animation: {
        'icon-bounce': 'iconBounce 0.4s ease',
        'jumps': 'jumps 1.2s ease',
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.3s ease',
        'scale-up': 'scaleUp 0.2s ease',
        'rotate': 'rotate 0.3s ease',
        'glow': 'glow 0.3s ease',
        'ripple': 'ripple 0.4s ease',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        iconBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.1)' },
        },
        jumps: {
          '0%': { transform: 'translate(0)' },
          '10%': { transform: 'translateY(8px) scaleX(1.2) scaleY(0.8)' },
          '30%': { transform: 'translateY(-5px) scaleX(1) scaleY(1) rotate(5deg)' },
          '50%': { transform: 'translateY(3px) scaleX(1) rotate(0)' },
          '55%': { transform: 'translateY(0) scaleX(1.1) scaleY(0.9) rotate(0)' },
          '70%': { transform: 'translateY(-5px) scaleX(1) scaleY(1) rotate(-2deg)' },
          '80%': { transform: 'translateY(0) scaleX(1) scaleY(1) rotate(0)' },
          '85%': { transform: 'translateY(0) scaleX(1.05) scaleY(0.95) rotate(0)' },
          '100%': { transform: 'translateY(0) scaleX(1) scaleY(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionProperty: {
        'width': 'width',
        'shadow': 'box-shadow',
      },
    },
  },
  plugins: [],
}
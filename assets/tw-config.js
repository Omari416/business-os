// Configuration Tailwind partagée — chargée juste après le CDN Tailwind.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#15171C',
        muted: '#5A6070',
        subtle: '#8B91A0',
        line: '#E6E8EC',
        'line-strong': '#D4D7DE',
        canvas: '#F6F7F9',
        surface: '#FFFFFF',
        hover: '#F1F2F5',
        accent: { DEFAULT: '#2F55D4', hover: '#2647B8', soft: '#EEF2FC', ink: '#1E3A9A' },
        danger: { DEFAULT: '#B42318', soft: '#FDF1F0' },
        warn: { DEFAULT: '#A15C07', soft: '#FDF6EC' },
        ok: { DEFAULT: '#067647', soft: '#EEF8F2' },
      },
      fontSize: { '2xs': ['11px', '16px'], xs: ['12px', '16px'], sm: ['13px', '20px'], base: ['14px', '22px'] },
      borderRadius: { DEFAULT: '4px', md: '6px', lg: '8px' },
    },
  },
};

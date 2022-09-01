const base = {
  shape: {
    borderRadius: 4,
    spacing: 4,
  },

  typography: {
    fontSize: 16,
  },

  color(mixin) {
    const [color, variation = 'main'] = `${mixin || ''}`.split('.');
    return this?.colors[color]?.[variation] ?? this?.colors[color]?.primary ?? this?.colors[color] ?? mixin;
  },

  colors: {
    common: {
      trans: 'rgba(0, 0, 0, 0)',
      black: '#000000',
      white: '#ffffff',
    },

    primary: {
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
    },

    secondary: {
      main: '#009688',
      light: '#52c7b8',
      dark: '#00675b',
    },

    info: {
      main: '#2196f3',
      light: '#6ec6ff',
      dark: '#0069c0',
    },

    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
    },

    warning: {
      main: '#ff9800',
      light: '#ffc947',
      dark: '#c66900',
    },

    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
  },

  rem(multiplier = 1, base = null) {
    return (base || this.typography.fontSize) * multiplier;
  },

  spacing(multiplier = 1) {
    return this.shape.spacing * multiplier;
  },

  hex2rgba(hex: string, alpha = 1) {
    const [r, g, b] =
      this.color(hex)
        .match(/\w\w/g)
        ?.map((x) => parseInt(x, 16)) || [];

    return `rgba(${r || 0},${g || 0},${b || 0},${alpha})`;
  },

  mixins: {
    transition: '0.35s ease',

    zIndex: {
      modal: 900,
      dropdown: 901,
    },
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },

  components: {
    Badge: {
      name: 'rbk-badge',
      defaultProps: {
        color: 'error.dark',
        size: 'medium',
      },
    },
    Box: {
      name: 'rbk-box',
      defaultProps: {},
    },
    Button: {
      name: 'rbk-button',
      defaultProps: {
        accessibility: {
          role: 'button',
        },
      },
    },
    ButtonGroup: {
      name: 'rbk-button-group',
      defaultProps: {
        color: 'primary',
      },
    },
    Card: {
      name: 'rbk-card',
      defaultProps: {},
    },
    Checkbox: {
      name: 'rbk-checkbox',
      defaultProps: {
        accessibility: {
          role: 'combobox',
        },
      },
    },
    Collapse: {
      name: 'rbk-collapse',
      defaultProps: {},
    },
    Divider: {
      name: 'rbk-divider',
      defaultProps: {
        color: 'text.primary',
        opacity: 0.15,
        size: 1,
      },
    },
    Dropdown: {
      name: 'rbk-dropdown',
      defaultProps: {
        accessibility: {
          role: 'menu',
        },
      },
    },
    Form: {
      name: 'rbk-form',
      defaultProps: {},
    },
    Grid: {
      name: 'rbk-grid',
      defaultProps: {},
    },
    Group: {
      name: 'rbk-group',
      defaultProps: {
        color: 'primary',
      },
    },
    Icon: {
      name: 'rbk-icon',
      defaultProps: {
        color: 'primary',
        weight: 'regular',
      },
    },
    Image: {
      name: 'rbk-image',
      defaultProps: {
        accessibility: {
          role: 'image',
        },
        mode: 'cover',
      },
    },
    Input: {
      name: 'rbk-input',
      defaultProps: {
        autoCapitalize: 'sentences',
        autoCorrect: true,
        color: 'primary',
        get selectionColor() {
          return this.color;
        },
      },
    },
    Label: {
      name: 'rbk-label',
      defaultProps: {},
    },
    Loading: {
      name: 'rbk-loading',
      defaultProps: {
        color: 'primary',
        accessibility: {
          role: 'progressbar',
        },
        speed: '1s',
      },
    },
    Modal: {
      name: 'rbk-modal',
      defaultProps: {},
    },
    Scrollable: {
      name: 'rbk-scrollable',
      defaultProps: {
        direction: 'vertical',
      },
    },
    Select: {
      name: 'rbk-select',
      defaultProps: {
        accessibility: {
          role: 'combobox',
        },
      },
    },
    Table: {
      name: 'rbk-table',
      defaultProps: {},
    },
    Text: {
      name: 'rbk-text',
      defaultProps: {
        style: {
          color: 'text.primary',
          fontSize: '1rem',
          margin: 0,
          textDecorationLine: 'none',
          web: {
            display: 'block',
            '& .rbk-text': { display: 'inline' },
          },
        },
      },
    },
  },
};

export default base;

const base = {
  shape: {
    borderRadius: 4,
    spacing: 4,
  },

  typography: {
    fontSize: 16,
  },

  colors: {
    common: {
      trans: 'rgba(0, 0, 0, 0)',
      black: '#000000',
      white: '#ffffff',
      gray: '#808080',
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

  mixins: {
    transition: '0.35s ease',

    zIndex: {
      modal: 900,
      dropdown: 901,
      tooltip: 902,
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

  rem(multiplier = 1, base = null) {
    return (base || this.typography.fontSize) * multiplier;
  },

  spacing(multiplier = 1) {
    return this.shape.spacing * multiplier;
  },

  color(mixin) {
    const [color, variation = 'main'] = `${mixin || ''}`.split('.');

    return (
      this?.colors[color]?.[variation] ?? this?.colors[color]?.primary ?? this?.colors[color] ?? this?.colors?.common?.[color] ?? mixin
    );
  },

  hex2rgba(hex: string, alpha = 1) {
    const [r, g, b] =
      this.color(hex)
        .match(/\w\w/g)
        ?.map((x) => parseInt(x, 16)) || [];

    return `rgba(${r || 0},${g || 0},${b || 0},${alpha})`;
  },

  rgba2hex(rgba) {
    let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
    rgba = rgba.substr(4).split(')')[0].split(sep);

    let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
  },

  contrast(color) {
    const { black, white } = this.colors.common;

    color = this.color(color);

    // Must be an HEX color
    if (color.includes('rgb')) {
      color = this.rgba2hex(color);
    }

    // If a leading # is provided, remove it
    if (color.slice(0, 1) === '#') {
      color = color.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (color.length === 3) {
      color = color
        .split('')
        .map((hex) => `${hex}${hex}`)
        .join('');
    }

    // Convert to RGB value
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Get YIQ ratio
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? black : white;
  },

  get components() {
    return {
      Badge: {
        name: 'rbk-badge',
        defaultProps: {
          color: 'error.dark',
          size: 'medium',
          style: {
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'common.white',
            fontSize: '0.625rem',
            fontWeight: 'bold',
            web: {
              display: 'inline-flex',
              lineHeight: 1,
            },
            native: {
              alignSelf: 'flex-start',
            },
          },
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
        defaultProps: {
          style: {
            backgroundColor: 'background.primary',
            corners: 1,
            p: 3,
          },
        },
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
          style: {
            position: 'absolute',
            maxWidth: '100%',
            border: `1px solid background.secondary`,
            zIndex: -1,
            web: {
              boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
              transition: 'all 0.35s ease',
              opacity: 0,
              visibility: 'hidden',
            },
          },
        },
      },
      Form: {
        name: 'rbk-form',
        defaultProps: {
          style: {
            margin: 0,
            padding: 0,
          },
        },
      },
      Grid: {
        name: 'rbk-grid',
        defaultProps: {
          style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'stretch',
          },
        },
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
          style: {
            web: { verticalAlign: 'text-bottom' },
          },
        },
      },
      Image: {
        name: 'rbk-image',
        defaultProps: {
          accessibility: {
            role: 'image',
          },
          mode: 'cover',
          style: {
            web: { display: 'inline-block' },
          },
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
        defaultProps: {
          style: {
            web: {
              textRendering: 'optimizeLegibility',
              '-webkit-font-smoothing': 'antialiased',
              '-moz-osx-font-smoothing': 'grayscale',
              'font-smooth': 'always',
            },
          },
        },
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
        defaultProps: {
          style: {
            position: 'relative',
            top: 0,
            left: 0,

            height: '100%',
            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',

            web: {
              position: 'fixed',
              transition: 'all 0.35s ease',
              opacity: 0,
              visibility: 'hidden',
              zIndex: -1,
            },
          },
        },
      },
      Scrollable: {
        name: 'rbk-scrollable',
        defaultProps: {
          direction: 'vertical',
          style: {
            flex: 1,
            web: {
              overflow: 'hidden',
              scrollBehavior: 'smooth',
            },
          },
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
        defaultProps: {
          style: {
            corners: 1,
          },
        },
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
      Tooltip: {
        name: 'rbk-tooltip',
        defaultProps: {
          position: 'top',
          color: 'black',
          style: {
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
          },
        },
      },
    };
  },
};

export default base;

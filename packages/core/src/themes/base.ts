import { ThemeProps } from '@react-bulk/core';

const base: ThemeProps & any = {
  shape: {
    borderRadius: 4,
    spacing: 4,
  },

  typography: {
    fontSize: 16,
    lineHeight: 1.15,
  },

  colors: {
    primary: '#673ab7',
    secondary: '#009688',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',

    common: {
      trans: 'rgba(0, 0, 0, 0)',
      black: '#000000',
      white: '#ffffff',
      gray: '#808080',
    },
  },

  mixins: {
    transitions: {
      slow: {
        transitionProperty: 'all',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'ease',
      },
      medium: {
        transitionProperty: 'all',
        transitionDuration: '0.35s',
        transitionTimingFunction: 'ease',
      },
      fast: {
        transitionProperty: 'all',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease',
      },
    },

    zIndex: {
      backdrop: 900,
      modal: 901,
      dropdown: 902,
      tooltip: 903,
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

  contrast(color, lightColor?: string | null, darkColor?: string | null) {
    lightColor = this.color(lightColor || this.colors.common.white);
    darkColor = this.color(darkColor || this.colors.common.black);

    color = this.color(color);

    // Transparent
    if (['transparent', this.colors.common.trans].includes(color)) {
      return darkColor;
    }

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
    return yiq >= 128 ? darkColor : lightColor;
  },

  get components() {
    return {
      Backdrop: {
        name: 'rbk-backdrop',
        defaultProps: {
          platform: {
            web: {
              accessibility: { role: 'dialog' },
            },
          },
        },
        defaultStyles: {
          root: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            height: '100%',
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',

            native: {
              position: 'absolute',
            },

            web: {
              position: 'fixed',
              opacity: 0,
              visibility: 'hidden',
              zIndex: -1,
              ...this.mixins.transitions.medium,
              transitionProperty: 'all',
            },
          },
          visible: {
            web: {
              opacity: 1,
              visibility: 'visible',
              zIndex: this.mixins.zIndex.backdrop,
            },
          },
        },
      },
      Badge: {
        name: 'rbk-badge',
        defaultProps: {
          color: 'error.dark',
          size: 'medium',
        },
        defaultStyles: {
          root: {
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
        defaultStyles: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          },
        },
      },
      Button: {
        name: 'rbk-button',
        defaultProps: {
          accessibility: { role: 'button' },
          color: 'primary',
        },
        defaultStyles: {
          root: {
            position: 'relative',

            backgroundColor: 'primary',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'primary',
            borderRadius: this.shape.borderRadius,

            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',

            margin: 0,
            padding: 0,
            touchAction: 'none',

            web: {
              backgroundImage: 'none',
              boxShadow: 'none',
              cursor: 'pointer',
              '-webkit-user-select': 'none',
              '-ms-user-select': 'none',
              'user-select': 'none',
              outline: '0 !important',
              textDecorationLine: 'none !important',
              ...this.mixins.transitions.fast,
              transitionProperty: 'box-shadow, opacity',

              '&:hover': {
                opacity: 0.75,
              },
            },
          },
        },
      },
      ButtonGroup: {
        name: 'rbk-button-group',
        defaultProps: {
          color: 'primary',
        },
        defaultStyles: {
          content: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
          },
        },
      },
      Card: {
        name: 'rbk-card',
        defaultProps: {},
        defaultStyles: {
          root: {
            backgroundColor: 'background.primary',
            corners: 1,
            p: 3,
          },
        },
      },
      Checkbox: {
        name: 'rbk-checkbox',
        defaultProps: {
          accessibility: { role: 'combobox' },
        },
        defaultStyles: {
          root: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
          },
          button: {
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          },
        },
      },
      Collapse: {
        name: 'rbk-collapse',
        defaultProps: {},
        defaultStyles: {},
      },
      Divider: {
        name: 'rbk-divider',
        defaultProps: {
          color: 'text.primary',
          opacity: 0.15,
          size: 1,
        },
        defaultStyles: {},
      },
      Dropdown: {
        name: 'rbk-dropdown',
        defaultProps: {
          accessibility: { role: 'menu' },
        },
        defaultStyles: {
          root: {
            position: 'absolute',
            maxWidth: '100%',
            border: `1px solid background.secondary`,
            zIndex: -1,
            web: {
              boxShadow: 'rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px',
              opacity: 0,
              visibility: 'hidden',
              ...this.mixins.transitions.medium,
            },
          },
        },
      },
      Form: {
        name: 'rbk-form',
        defaultProps: {},
        defaultStyles: {
          root: {
            margin: 0,
            padding: 0,
          },
        },
      },
      Grid: {
        name: 'rbk-grid',
        defaultProps: {
          size: 12,
        },
        defaultStyles: {
          root: {
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
        defaultStyles: {
          root: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
      },
      Icon: {
        name: 'rbk-icon',
        defaultProps: {
          color: 'primary',
          weight: 'regular',
        },
        defaultStyles: {
          root: {
            web: { verticalAlign: 'text-bottom' },
          },
        },
      },
      Image: {
        name: 'rbk-image',
        defaultProps: {
          accessibility: { role: 'image' },
          mode: 'cover',
        },
        defaultStyles: {
          root: {
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
        },
        defaultStyles: {
          root: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'primary',
            borderRadius: this.shape.borderRadius,
            backgroundColor: this.colors.common.trans,
            web: {
              ...this.mixins.transitions.fast,
              transitionProperty: 'box-shadow',
            },
          },
          input: {
            backgroundColor: this.colors.common.trans,
            borderWidth: 0,
            color: 'text.primary',
            flex: 1,
            fontSize: '1rem',
            height: '1.25rem',
            margin: 0,
            padding: '0.5rem',
            textDecorationLine: 'none',
            width: '100%',
            web: {
              backgroundImage: 'none',
              boxShadow: 'none',
              cursor: 'inherit',
              outline: '0 !important',
              touchAction: 'none',
            },
          },
        },
      },
      Label: {
        name: 'rbk-label',
        defaultProps: {},
        defaultStyles: {
          root: {
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
          accessibility: { role: 'progressbar' },
          speed: '1s',
        },
        defaultStyles: {},
      },
      Modal: {
        name: 'rbk-modal',
        defaultProps: {
          align: 'center',
        },
        defaultStyles: {
          root: {
            zIndex: (theme) => theme.mixins.zIndex.modal,
          },
        },
      },
      Scrollable: {
        name: 'rbk-scrollable',
        defaultProps: {
          direction: 'vertical',
        },
        defaultStyles: {
          root: {
            flex: 1,
            maxHeight: '100%',
            maxWidth: '100%',
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
          accessibility: { role: 'combobox' },
        },
        defaultStyles: {},
      },
      Table: {
        name: 'rbk-table',
        defaultProps: {},
        defaultStyles: {
          root: {
            corners: 1,
          },
        },
      },
      Text: {
        name: 'rbk-text',
        defaultProps: {},
        defaultStyles: {
          root: {
            color: 'text.primary',
            flexDirection: 'row',
            fontSize: '1rem',
            margin: 0,
            textAlign: 'left',
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
        },
        defaultStyles: {
          root: {
            position: 'absolute',
            zIndex: this.mixins.zIndex.tooltip,

            native: {
              display: 'none',
            },

            web: {
              opacity: 0,
              pointerEvents: 'none',
              visibility: 'hidden',
              zIndex: -1,
              ...this.mixins.transitions.medium,
            },
          },
          visible: {
            native: {
              display: 'flex',
            },

            web: {
              opacity: 1,
              visibility: 'visible',
              zIndex: this.mixins.zIndex.tooltip,
            },
          },
        },
      },
    };
  },
};

export default base;

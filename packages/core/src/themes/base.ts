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
      Animation: {
        name: 'rbk-animation',
        defaultProps: {
          direction: 'normal',
          speed: 625,
        },
        defaultStyles: {
          root: {
            position: 'relative',
          },
        },
      },
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

            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 'bold',
            overflow: 'hidden',

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
            flexWrap: 'nowrap',
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
          size: 'medium',
          variant: 'solid',
        },
        defaultStyles: {
          root: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',

            bg: 'primary',
            border: '1px solid primary',
            borderRadius: this.shape.borderRadius,
            margin: 0,
            minHeight: '2.5rem',
            minWidth: '2.5rem',
            padding: 0,
            paddingHorizontal: '1rem',
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
              transitionProperty: 'background-color, box-shadow',

              '&:hover': { bg: this.hex2rgba('primary', 0.8) },
            },
          },
          label: {
            color: 'white',
            fontSize: '1rem',
            web: { lineHeight: 1 },
          },
        },
        variants: {
          block: {
            true: {
              styles: {
                root: { width: '100%' },
              },
            },
          },
          disabled: {
            true: {
              styles: {
                root: {
                  opacity: 0.75,
                  web: { cursor: 'not-allowed', '& *': { cursor: 'not-allowed' } },
                },
              },
            },
          },
          size: {
            xsmall: {
              styles: {
                root: {
                  minHeight: '1.5625rem',
                  minWidth: '1.5625rem',
                  paddingHorizontal: '0.625rem',
                },
                label: {
                  fontSize: '0.625rem',
                },
              },
            },
            small: {
              styles: {
                root: {
                  minHeight: '1.875rem',
                  minWidth: '1.875rem',
                  paddingHorizontal: '0.75rem',
                },
                label: {
                  fontSize: '0.75rem',
                },
              },
            },
            large: {
              styles: {
                root: {
                  minHeight: '3.125rem',
                  minWidth: '3.125rem',
                  paddingHorizontal: '1.25rem',
                },
                label: {
                  fontSize: '1.25rem',
                },
              },
            },
            xlarge: {
              styles: {
                root: {
                  minHeight: '4.0625rem',
                  minWidth: '4.0625rem',
                  paddingHorizontal: '1.625rem',
                },
                label: {
                  fontSize: '1.625rem',
                },
              },
            },
          },
          variant: {
            outline: {
              styles: {
                root: {
                  bg: 'trans',
                  '&:hover': { bg: (theme) => theme.hex2rgba('primary', 0.1) },
                },
                label: {
                  color: 'primary',
                },
              },
            },
            text: {
              styles: {
                root: {
                  bg: 'trans',
                  borderWidth: 0,
                  '&:hover': { bg: this.hex2rgba('primary', 0.1) },
                },
                label: {
                  color: 'primary',
                },
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
          color: 'primary',
          size: 'medium',
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
            marginLeft: '-0.5rem',
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
          size: 1,
          opacity: 0.15,
        },
        defaultStyles: {
          root: {
            backgroundColor: 'text.primary',
            opacity: 0.15,
          },
        },
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
            border: '1px solid background.secondary',
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
          size: 1,
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
          color: 'primary',
          size: 'medium',
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
          label: {
            mx: 1,
            mb: 1,
          },
          input: {
            backgroundColor: this.colors.common.trans,
            borderWidth: 0,
            color: 'text.primary',
            flex: 1,
            fontSize: '1rem',
            height: '2.5rem',
            margin: 0,
            paddingVertical: 0,
            paddingHorizontal: '0.5rem',
            textDecorationLine: 'none',
            width: '100%',
            web: {
              backgroundImage: 'none',
              boxShadow: 'none',
              cursor: 'inherit',
              outline: '0 !important',
              paddingVertical: '1rem',
              touchAction: 'none',
            },
          },
          error: {
            color: 'error',
            mx: 1,
            mt: 1,
          },
        },
        variants: {
          disabled: {
            true: {
              styles: {
                root: {
                  backgroundColor: (theme) => theme.hex2rgba('background.disabled', 0.125),
                  borderColor: (theme) => theme.hex2rgba('background.disabled', 0.25),
                  web: {
                    cursor: 'not-allowed',
                    '& *': { cursor: 'not-allowed' },
                  },
                },
              },
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
      Link: {
        name: 'rbk-link',
        defaultProps: {},
        defaultStyles: {
          root: {
            color: 'primary',
            web: { cursor: 'pointer' },
          },
        },
        variants: {
          underline: {
            true: {
              styles: {
                root: { textDecoration: 'underline' },
              },
            },
          },
        },
      },
      ListItem: {
        name: 'rbk-list-item',
        defaultProps: {
          gap: 3,
        },
        defaultStyles: {},
        variants: {},
      },
      Loading: {
        name: 'rbk-loading',
        defaultProps: {
          accessibility: { role: 'progressbar' },
          color: 'primary',
        },
        defaultStyles: {
          root: {},
          label: {
            color: 'primary',
            fontSize: '1rem',
            ml: 1,
          },
        },
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
      Progress: {
        name: 'rbk-progress',
        defaultProps: {
          accessibility: { role: 'progressbar' },
          color: 'primary',
          size: 1,
        },
        defaultStyles: {},
      },
      Scrollable: {
        name: 'rbk-scrollable',
        defaultProps: {
          direction: 'vertical',
        },
        defaultStyles: {
          root: {
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
          accessibility: { role: 'combobox' },
          color: 'primary',
          size: 'medium',
        },
        defaultStyles: {
          label: {
            mx: 1,
            mb: 1,
          },
          error: {
            color: 'error',
            mx: 1,
            mt: 1,
          },
        },
      },
      Slider: {
        name: 'rbk-slider',
        defaultProps: {
          color: 'primary',
          min: 0,
          max: 100,
          size: 'medium',
        },
        defaultStyles: {
          root: {
            position: 'relative',
            height: '1rem',
            marginHorizontal: '0.5rem',
            web: { cursor: 'pointer' },
          },
          rule: {
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            marginTop: '-0.125rem',
            marginRight: '-0.5rem',
            backgroundColor: 'background.secondary',
            borderRadius: '0.125rem',
            height: '0.25rem',
          },
          bar: {
            position: 'absolute',
            top: '50%',
            left: 0,
            marginTop: '-0.125rem',
            marginLeft: '-0.5rem',
            backgroundColor: 'primary',
            borderTopLeftRadius: '0.125rem',
            borderBottomLeftRadius: '0.125rem',
            height: '0.25rem',
            width: 0,
          },
          thumb: {
            position: 'absolute',
            top: 0,
            left: '-0.5rem',
            backgroundColor: 'primary',
            borderRadius: '0.5rem',
            paddingVertical: 0,
            paddingHorizontal: 0,
            minHeight: 0,
            minWidth: 0,
            height: '1rem',
            width: '1rem',
          },
        },
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

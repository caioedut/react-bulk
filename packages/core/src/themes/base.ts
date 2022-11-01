import { ThemeProps } from '../types';

const base: ThemeProps & any = {
  shape: {
    borderRadius: 4,
    spacing: 4,
  },

  typography: {
    fontSize: 16,
    lineHeight: 1,
  },

  colors: {
    primary: '#673ab7',
    secondary: '#b06ab3',
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

    scroll: {
      '&::-webkit-scrollbar': { height: '0.375rem', width: '0.375rem' },
      '&::-webkit-scrollbar-track': { background: 'transparent' },
      '&::-webkit-scrollbar-corner': { background: 'transparent' },
      '&::-webkit-scrollbar-thumb': { bg: 'text.disabled', borderRadius: '0.1875rem' },
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

  setTheme() {
    if (process?.env?.NODE_ENV !== 'production') {
      console.error('setTheme only works when the app is wrapped in the <ReactBulk /> context.');
    }
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
        },
        variants: {
          visible: {
            true: {
              root: {
                web: {
                  opacity: 1,
                  visibility: 'visible',
                  zIndex: this.mixins.zIndex.backdrop,
                },
              },
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

            backgroundColor: 'error.dark',
            borderRadius: '0.625rem',
            border: '1px solid error.dark',
            overflow: 'hidden',
            py: 1,
            px: 1.5,

            minHeight: '1.25rem',
            minWidth: '1.25rem',

            alignSelf: 'center',
            justifySelf: 'center',
          },
          label: {
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 'bold',
          },
        },
        variants: {
          dot: {
            true: {
              root: {
                minWidth: 0,
                minHeight: 0,
                px: 1,
              },
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

            web: { '-webkit-tap-highlight-color': 'transparent' },
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
            minHeight: '2rem',
            minWidth: '2rem',
            padding: 0,
            paddingHorizontal: '0.5rem',

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

              touchAction: 'none',
              '-webkit-tap-highlight-color': 'transparent',

              '&:hover': { bg: this.hex2rgba('primary', 0.8) },
            },
          },
          label: {
            color: 'white',
            fontSize: '1rem',
            textAlign: 'center',
            transform: [{ scale: 0.9 }],
          },
        },
        variants: {
          block: {
            true: {
              root: { width: '100%' },
            },
          },
          circular: {
            true: {
              root: { borderRadius: '1rem' },
            },
          },
          disabled: {
            true: {
              root: {
                opacity: 0.75,
                web: { cursor: 'not-allowed', '& *': { cursor: 'not-allowed' } },
              },
            },
          },
          size: {
            xsmall: {
              root: {
                minHeight: '1.5625rem',
                minWidth: '1.5625rem',
                paddingHorizontal: '0.625rem',
              },
              label: {
                fontSize: '0.625rem',
              },
            },
            small: {
              root: {
                minHeight: '1.875rem',
                minWidth: '1.875rem',
                paddingHorizontal: '0.75rem',
              },
              label: {
                fontSize: '0.75rem',
              },
            },
            large: {
              root: {
                minHeight: '3.125rem',
                minWidth: '3.125rem',
                paddingHorizontal: '1.25rem',
              },
              label: {
                fontSize: '1.25rem',
              },
            },
            xlarge: {
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
          transform: {
            none: { label: { textTransform: 'none' } },
            capitalize: { label: { textTransform: 'capitalize' } },
            uppercase: { label: { textTransform: 'uppercase' } },
            lowercase: { label: { textTransform: 'lowercase' } },
            'full-width': { label: { textTransform: 'full-width' } },
          },
          variant: {
            outline: {
              root: {
                bg: 'trans',
                '&:hover': { bg: (theme) => theme.hex2rgba('primary', 0.1) },
              },
              label: {
                color: 'primary',
              },
            },
            text: {
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
      ButtonGroup: {
        name: 'rbk-button-group',
        defaultProps: {
          color: 'primary',
        },
        defaultStyles: {
          root: {
            p: 1,
            m: -1,
          },
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
      Carousel: {
        name: 'rbk-carousel',
        defaultProps: {
          chevron: 'visible',
          color: 'primary',
          gap: 0,
          swipe: false,
          xs: 1,
        },
        defaultStyles: {
          root: {
            position: 'relative',
          },
          content: {},
          chevron: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
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
        defaultStyles: {
          root: {
            overflow: 'hidden',
          },
        },
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
            height: 1,
            opacity: 0.15,
            width: 'auto',
          },
        },
        variants: {
          vertical: {
            true: {
              root: {
                alignSelf: 'stretch',
                height: 'auto',
                width: 1,
              },
            },
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
            native: {
              display: 'none',
            },
          },
        },
        variants: {
          visible: {
            true: {
              root: {
                zIndex: this.mixins.zIndex.dropdown,
                web: {
                  opacity: 1,
                  visibility: 'visible',
                },
                native: {
                  display: 'flex',
                },
              },
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
          item: {
            m: 0,
            p: 0,
          },
        },
        variants: {
          direction: {
            horizontal: {
              root: { flexDirection: 'row' },
            },
            vertical: {
              root: { flexDirection: 'column' },
            },
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
            web: { display: 'block' },
          },
        },
      },
      Input: {
        name: 'rbk-input',
        defaultProps: {
          autoCapitalize: 'none',
          color: 'primary',
          returnKeyType: 'default',
          size: 'medium',
          type: 'text',
        },
        defaultStyles: {
          root: {},
          content: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'primary',
            borderRadius: this.shape.borderRadius,
            backgroundColor: this.colors.common.trans,
            web: {
              ...this.mixins.transitions.fast,
              transitionProperty: 'box-shadow',
              touchAction: 'none',
              '-webkit-tap-highlight-color': 'transparent',
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
            height: '1rem',
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
              paddingVertical: '0.5rem',
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
              content: {
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
              root: { textDecoration: 'underline' },
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
      },
      Loading: {
        name: 'rbk-loading',
        defaultProps: {
          accessibility: { role: 'progressbar' },
          color: 'primary',
          size: 2,
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
          halign: 'center',
          valign: 'center',
        },
        defaultStyles: {
          root: {
            zIndex: (theme) => theme.mixins.zIndex.modal,
          },
        },
        variants: {
          halign: {
            center: {
              root: { alignItems: 'center' },
            },
            left: {
              root: { alignItems: 'flex-start' },
            },
            right: {
              root: { alignItems: 'flex-end' },
            },
          },
          valign: {
            center: {
              root: { justifyContent: 'center' },
            },
            top: {
              root: { justifyContent: 'flex-start' },
            },
            bottom: {
              root: { justifyContent: 'flex-end' },
            },
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
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'column',
            web: {
              display: 'flex',
              overflow: 'hidden',
              overflowY: 'auto',
              scrollBehavior: 'smooth',
              ...this.mixins.scroll,
            },
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            flexGrow: 1,
          },
        },
        variants: {
          direction: {
            horizontal: {
              root: {
                flexDirection: 'row',
                web: { overflowX: 'auto' },
              },
              content: {
                flexDirection: 'row',
              },
            },
          },
          hideScrollBar: {
            true: {
              root: {
                web: {
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                },
              },
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
            web: {
              cursor: 'pointer',
              touchAction: 'none',
              '-webkit-tap-highlight-color': 'transparent',
            },
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
            fontSize: '1rem',
            margin: 0,
            textAlign: 'left',
            textDecorationLine: 'none',
            web: {
              display: 'block',
              '& .rbk-text': { display: 'inline' },
            },
            native: {
              flexDirection: 'row',
            },
          },
        },
        variants: {
          variant: {
            h1: { root: { fontSize: '2.6rem' } },
            h2: { root: { fontSize: '2.1rem' } },
            h3: { root: { fontSize: '1.8rem' } },
            h4: { root: { fontSize: '1.4rem' } },
            h5: { root: { fontSize: '1.2rem' } },
            h6: { root: { fontSize: '1.1rem' } },
            title: { root: { fontSize: '1.25rem' } },
            subtitle: { root: { fontSize: '1.125rem' } },
            caption: { root: { fontSize: '0.75rem' } },
          },
          bold: {
            true: { root: { fontWeight: 'bold' } },
            false: { root: { fontWeight: 'normal' } },
          },
          italic: {
            true: { root: { fontStyle: 'italic' } },
            false: { root: { fontStyle: 'normal' } },
          },
          center: {
            true: { root: { textAlign: 'center' } },
            false: { root: { web: { textAlign: 'initial' }, native: { textAlign: 'auto' } } },
          },
          left: {
            true: { root: { textAlign: 'left' } },
            false: { root: { web: { textAlign: 'initial' }, native: { textAlign: 'auto' } } },
          },
          right: {
            true: { root: { textAlign: 'right' } },
            false: { root: { web: { textAlign: 'initial' }, native: { textAlign: 'auto' } } },
          },
          justify: {
            true: { root: { textAlign: 'justify' } },
            false: { root: { web: { textAlign: 'initial' }, native: { textAlign: 'auto' } } },
          },
          smallCaps: {
            true: { root: { web: { fontVariant: 'small-caps' }, native: { fontVariant: ['small-caps'] } } },
            false: { root: { web: { fontVariant: 'initial' }, native: { fontVariant: [] } } },
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

            web: {
              opacity: 0,
              pointerEvents: 'none',
              visibility: 'hidden',
              zIndex: -1,
              ...this.mixins.transitions.medium,
            },

            native: {
              display: 'none',
            },
          },
        },
        variants: {
          visible: {
            true: {
              root: {
                web: {
                  opacity: 1,
                  visibility: 'visible',
                  zIndex: this.mixins.zIndex.tooltip,
                },

                native: {
                  display: 'flex',
                },
              },
            },
          },
          position: {
            top: {
              root: { top: 0, left: '50%' },
            },
            bottom: {
              root: { bottom: 0, left: '50%' },
            },
            left: {
              root: { left: 0, top: '50%' },
            },
            right: {
              root: { right: 0, top: '50%' },
            },
          },
        },
      },
    };
  },
};

export default base;

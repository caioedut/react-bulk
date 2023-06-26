import { ThemeProps } from '../types';

const shape = {
  borderRadius: 4,
  spacing: 4,
};

const typography = {
  fontSize: 16,
  lineHeight: 1.15,
};

const colors = {
  primary: '#8b5cf6',
  secondary: '#f59e0b',

  info: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',

  gray: '#6b7280',
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#84cc16',
  green: '#22c55e',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  purple: '#a855f7',
  fuchsia: '#d946ef',
  pink: '#ec4899',

  common: {
    trans: 'rgba(0, 0, 0, 0)',
    black: '#000000',
    white: '#ffffff',
  },

  text: {
    primary: '#232323',
    secondary: '#666666',
    disabled: '#999999',
  },

  background: {
    primary: '#ffffff',
    secondary: '#e3e3e3',
    disabled: '#616161',
  },
};

const breakpoints = {
  xs: 0,
  sm: 320,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const mixins = {
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
};

const base: ThemeProps = {
  custom: {},
  shape,
  typography,
  colors,
  breakpoints,
  mixins,

  rem(multiplier = 1, base = null) {
    return (base || this.typography.fontSize) * multiplier;
  },

  spacing(multiplier = 1) {
    return this.shape.spacing * multiplier;
  },

  color(mixin, alpha?: number) {
    const [color, variation = 'main', opacity] = `${mixin || ''}`.split('.');

    let newColor =
      this?.colors[color]?.[variation] ?? this?.colors[color]?.primary ?? this?.colors[color] ?? this?.colors?.common?.[color] ?? mixin;

    if (typeof alpha !== 'number' && opacity) {
      alpha = Number(opacity) / 100;
    }

    if (typeof alpha === 'number') {
      const [r, g, b] = newColor?.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [];

      newColor = `rgba(${r || 0},${g || 0},${b || 0},${alpha})`;
    }

    return newColor;
  },

  hex2rgba(hex: string, alpha = 1) {
    const [r, g, b] =
      this.color(hex)
        .match(/\w\w/g)
        ?.map((x) => parseInt(x, 16)) || [];

    return `rgba(${r || 0},${g || 0},${b || 0},${alpha})`;
  },

  rgba2hex(rgba: string) {
    const sep = rgba.includes(',') ? ',' : ' ';
    const split = rgba.substr(4).split(')')[0].split(sep);

    let r = (+split[0]).toString(16),
      g = (+split[1]).toString(16),
      b = (+split[2]).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return `#${r}${g}${b}`;
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

  // Warn user about ReactBulk context
  // @ts-ignore
  setTheme() {
    if (process?.env?.NODE_ENV !== 'production') {
      console.error('setTheme only works when the app is wrapped in the <ReactBulk /> context.');
    }
  },

  components: {
    ActionSheet: {
      name: 'rbk-action-sheet',
      defaultProps: {},
      defaultStyles: {
        root: {
          align: 'center',
          corners: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          maxh: '100%',
        },
      },
    },
    Animation: {
      name: 'rbk-animation',
      defaultProps: {
        direction: 'normal',
        speed: 625,
        timing: 'ease',
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
            cursor: 'auto !important',
            opacity: 0,
            visibility: 'hidden',
            zIndex: -1,
            ...mixins.transitions.medium,
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
                zIndex: (theme) => theme.mixins.zIndex.backdrop,
              },
            },
          },
        },
      },
    },
    Badge: {
      name: 'rbk-badge',
      defaultProps: {
        color: 'secondary',
        size: 'medium',
      },
      defaultStyles: {
        root: {
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          alignSelf: 'center',
          justifySelf: 'center',

          backgroundColor: 'secondary',
          borderRadius: '0.5625rem',
          overflow: 'hidden',
          minHeight: '1.125rem',
          minWidth: '1.125rem',
          paddingVertical: '0.25rem',
          paddingHorizontal: '0.375rem',
        },
        label: {
          color: 'white',
          fontSize: '0.5625rem',
          fontWeight: 'bold',

          web: { lineHeight: 1 },
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
        transform: 'uppercase',
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
          borderRadius: (theme) => theme.shape.borderRadius,
          margin: 0,
          minHeight: '2.25rem',
          minWidth: '2.25rem',
          padding: 0,
          paddingHorizontal: '0.75rem',

          web: {
            backgroundImage: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
            outline: '0 !important',
            textDecorationLine: 'none !important',
            ...mixins.transitions.fast,
            transitionProperty: 'background-color, box-shadow',
            '-webkit-tap-highlight-color': 'transparent',

            '&:hover': { bg: (theme) => theme.color('primary', 0.8) },
          },
        },
        label: {
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          letterSpacing: 1,
          textAlign: 'center',

          web: {
            lineHeight: '0.75rem',
          },
        },
      },
      variants: {
        block: {
          true: { root: { width: '100%' } },
        },
        circular: {
          true: { root: { borderRadius: '1rem' } },
        },
        disabled: {
          true: {
            root: {
              opacity: 0.75,
              web: {
                cursor: 'not-allowed !important',
                '& *': { cursor: 'not-allowed !important' },
              },
            },
          },
        },
        size: {
          xsmall: {
            root: {
              minHeight: '1.25rem',
              minWidth: '1.25rem',
              paddingHorizontal: '0.25rem',
            },
          },
          small: {
            root: {
              minHeight: '1.75rem',
              minWidth: '1.75rem',
              paddingHorizontal: '0.5rem',
            },
          },
          large: {
            root: {
              minHeight: '2.75rem',
              minWidth: '2.75rem',
              paddingHorizontal: '1rem',
            },
          },
          xlarge: {
            root: {
              minHeight: '3.25rem',
              minWidth: '3.25rem',
              paddingHorizontal: '1.25rem',
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
              web: { '&:hover': { bg: (theme) => theme.color('primary', 0.2) } },
            },
            label: {
              color: 'primary',
            },
          },
          text: {
            root: {
              bg: 'trans',
              borderColor: 'trans',
              web: { '&:hover': { bg: (theme) => theme.color('primary', 0.2) } },
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
          corners: 2,
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
        pagingEnabled: true,
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
        accessibility: { role: 'checkbox' },
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
    Drawer: {
      name: 'rbk-drawer',
      defaultProps: {
        placement: 'right',
      },
      defaultStyles: {
        root: {
          position: 'absolute',
          bg: 'background',
          maxh: '100%',
          maxw: '100%',
          ...mixins.transitions.fast,
        },
        backdrop: {},
      },
      variants: {
        placement: {
          left: {
            root: { top: 0, left: 0, height: '100%', ml: '-100%' },
          },
          right: {
            root: { top: 0, right: 0, height: '100%', mr: '-100%' },
          },
          top: {
            root: { top: 0, left: 0, width: '100%', mt: '-100%' },
          },
          bottom: {
            root: { bottom: 0, left: 0, width: '100%', mb: '-100%' },
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
            ...mixins.transitions.fast,
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
              zIndex: (theme) => theme.mixins.zIndex.dropdown,
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
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.color('trans'),
          web: {
            ...mixins.transitions.fast,
            transitionProperty: 'box-shadow',
            '-webkit-tap-highlight-color': 'transparent',
          },
        },
        label: {
          mx: 1,
          mb: 1,
        },
        input: {
          backgroundColor: (theme) => theme.color('trans'),
          borderWidth: 0,
          color: 'text.primary',
          flex: 1,
          fontSize: '1rem',
          height: '2.25rem',
          margin: 0,
          paddingVertical: 0,
          paddingHorizontal: '0.625rem',
          textDecorationLine: 'none',
          width: '100%',

          web: {
            backgroundImage: 'none',
            boxShadow: 'none',
            cursor: 'inherit',
            lineHeight: '1rem',
            outline: '0 !important',
            paddingHorizontal: '0.625rem',

            '-moz-appearance': 'textfield',
            appearance: 'textfield',
            '&::-webkit-outer-spin-button,::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              appearance: 'none',
            },
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
              backgroundColor: (theme) => theme.color('background.disabled', 0.125),
              borderColor: (theme) => theme.color('background.disabled', 0.25),
              web: {
                cursor: 'not-allowed !important',
                '& *': { cursor: 'not-allowed !important' },
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
      defaultStyles: {
        root: {},
      },
    },
    Loading: {
      name: 'rbk-loading',
      defaultProps: {
        accessibility: { role: 'progressbar' },
        color: 'primary',
        size: 'medium',
      },
      defaultStyles: {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        label: {
          color: 'primary',
          fontSize: '1rem',
          ml: 1.25,
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
    Outline: {
      name: 'rbk-outline',
      defaultProps: {
        color: 'primary',
        size: 4,
        visible: 'auto',
      },
      defaultStyles: {
        root: {
          web: {
            outline: '0 !important',
            ...mixins.transitions.fast,
            transitionProperty: 'box-shadow',
            '-webkit-tap-highlight-color': 'transparent',
          },
        },
      },
    },
    Progress: {
      name: 'rbk-progress',
      defaultProps: {
        accessibility: { role: 'progressbar' },
        color: 'primary',
        corners: 2,
        label: true,
        size: 'medium',
      },
      defaultStyles: {
        root: {
          position: 'relative',
          bg: 'text.main.25',
          overflow: 'hidden',
        },
        bar: {
          bg: 'primary',
          h: '1.25rem',
          web: {
            ...mixins.transitions.fast,
          },
        },
        label: {
          textAlign: 'center',
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
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column',
          web: {
            display: 'flex',
            overflow: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            ...mixins.scroll,
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
        root: {},
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
    Tabs: {
      name: 'rbk-tabs',
      defaultProps: {
        accessibility: { role: 'tablist' },
        variant: 'group',
      },
      defaultStyles: {
        root: {
          p: 1,
          m: -1,
        },
        content: {
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'stretch',
          justifyContent: 'start',
        },
        button: {
          web: { transitionProperty: 'all' },
        },
        active: {},
      },
      variants: {
        variant: {
          group: {
            root: {
              pt: 2,
            },
            button: {
              borderBottomWidth: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              marginLeft: -1,
            },
            active: {
              mt: -1,
            },
          },
          card: {
            button: {
              mr: 1.5,
            },
          },
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
          primary: { root: { fontSize: '1rem' } },
          secondary: { root: { fontSize: '0.875rem' } },
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
          zIndex: (theme) => theme.mixins.zIndex.tooltip,

          web: {
            opacity: 0,
            pointerEvents: 'none',
            visibility: 'hidden',
            zIndex: -1,
            ...mixins.transitions.fast,
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
                zIndex: (theme) => theme.mixins.zIndex.tooltip,
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
  },
};

export default base;

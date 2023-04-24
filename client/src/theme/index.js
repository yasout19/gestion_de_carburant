import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider,alpha } from '@mui/material/styles';
//
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const LIGHT_PALETTE = {
  common: { black: '#000', white: '#fff' },
  primary: {
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#fff',
  },
  secondary: {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
  },
  info: {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
  },
  success: {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
  },
  warning: {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
  },
  error: {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
  },
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const DARK_PALETTE = {
  common: { black: '#fff', white: '#000' },
  primary: {
    lighter: '#7187A1',
    light: '#4D6680',
    main: '#2B3A4F',
    dark: '#1A2531',
    darker: '#0E141C',
    contrastText: '#fff',
    },
    secondary: {
    lighter: '#4C5D6D',
    light: '#354359',
    main: '#1E2A3A',
    dark: '#111924',
    darker: '#080D14',
    contrastText: '#fff',
    },
    info: {
    lighter: '#6E8BA6',
    light: '#506A85',
    main: '#2C3E50',
    dark: '#1A2531',
    darker: '#0E141C',
    contrastText: '#fff',
    },
    success: {
    lighter: '#8ED08A',
    light: '#639E62',
    main: '#387D3C',
    dark: '#235A24',
    darker: '#10330F',
    contrastText: GREY[100],
    },
    warning: {
    lighter: '#FFD285',
    light: '#E6B45C',
    main: '#C69439',
    dark: '#8F6321',
    darker: '#5F3E0B',
    contrastText: GREY[100],
    },
    error: {
    lighter: '#FFA09A',
    light: '#E16B67',
    main: '#D32F2F',
    dark: '#A01313',
    darker: '#700909',
    contrastText: '#fff',
    },
    grey: GREY,
    divider: alpha(GREY[500], 0.24),
    text: {
    primary: '#fff',
    secondary: alpha(GREY[100], 0.7),
    disabled: alpha(GREY[100], 0.5),
    },
    background: {
    paper: '#2B3A4F',
    default: '#1E2A3A',
    neutral: '#111924',
    },
    action: {
    active: '#fff',
    hover: alpha(GREY[100], 0.1),
    selected: alpha(GREY[100], 0.2),
    disabled: alpha(GREY[100], 0.5),
    disabledBackground: alpha(GREY[100], 0.12),
    focus: alpha(GREY[100], 0.12),
    hoverOpacity: 0.1,
    disabledOpacity: 0.5,
    },
    };

    ThemeProvider.propTypes = {
      children: PropTypes.node,
      isDarkMode: PropTypes.bool // Add isDarkMode prop
    };
    
    export default function ThemeProvider({ children, isDarkMode }) {
      const themeOptions = useMemo(
        () => ({
          palette: isDarkMode ? DARK_PALETTE : LIGHT_PALETTE, // Update palette based on isDarkMode prop
          shape: { borderRadius: 6 },
          typography,
          shadows: shadows(),
          customShadows: customShadows(),
        }),
        [isDarkMode] // Update theme options whenever isDarkMode prop changes
      );
    
      const theme = createTheme(themeOptions);
      theme.components = componentsOverride(theme);
    
      return (
        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
          </MUIThemeProvider>
        </StyledEngineProvider>
      );
    }

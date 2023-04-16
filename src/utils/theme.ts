import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#2e86de",
    },
  },
  // components: {
  //   MuiContainer: {
  //     defaultProps: {
  //       maxWidth: "md",
  //     },
  //     styleOverrides: {
  //       maxWidthSm: {
  //         maxWidth: "780px",
  //         "@media (min-width: 600px)": {
  //           maxWidth: "780px",
  //         },
  //       },
  //       maxWidthMd: {
  //         maxWidth: "1024px",
  //         "@media (min-width: 900px)": {
  //           maxWidth: "1024px",
  //         },
  //       },
  //       maxWidthLg: {
  //         maxWidth: "1200px",
  //         "@media (min-width: 1200px)": {
  //           maxWidth: "1200px",
  //         },
  //       },
  //     },
  //   },
  // },
  typography: {
    fontFamily: ["Roboto Condensed"].join(","),
  },
});

theme = responsiveFontSizes(theme);

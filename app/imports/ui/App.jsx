"use strict";
import React from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom";

import {ClassDashboard} from "./pages/ClassDashboard";
import {TeamDashboard} from "./pages/TeamDashboard";
import {DashboardSelector} from "./pages/DashboardSelector"

import {CssBaseline, responsiveFontSizes, ThemeProvider} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import {blue, green, nws_blue, orange, red, yellow} from "../api/constants";
import {addAlpha} from "../api/auxFunctions";
import {RefreshPage} from "./pages/RefreshPage";


let theme = createTheme({
    palette: {
        primary: {
            main: blue
        },
        secondary: {
            main: orange
        },
        error: {
            main: red
        },
        warning: {
            main: yellow
        },
        info: {
            main: nws_blue
        },
        success: {
            main: green
        }
    },
    typography: {
        allVariants: {
            color: nws_blue
        },
        fontFamily: 'FormaDJRText, Arial',
        widgetTitle: {
            fontWeight: 'bold',
            color: addAlpha(nws_blue, 0.8),
            textTransform: "uppercase"
        },
        CPSCriteriaTitle: {
            fontWeight: 'bold',
            color: addAlpha(nws_blue, 0.8),
            fontSize: 21
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'FormaDJRText';
          src: local('FormaDJRText-Regular'), url('/fonts/FormaDJRText-Regular.otf') format('opentype');
        }
        @font-face {
          font-family: 'FormaDJRText';
          font-weight: bold;
          src: local('FormaDJRText-Bold'), url('/fonts/FormaDJRText-Bold.otf') format('opentype');
        }
      `,
        },
    }
});
theme = responsiveFontSizes(theme);

export const App = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/refresh" element={<RefreshPage/>}/>
                        {/*<Route path="/dashboard" element={<DashboardSelector/>}/>*/}
                        <Route path="/dashboard/:className" element={<ClassDashboard/>}/>
                        <Route path="/dashboard/:className/:teamName" element={<TeamDashboard/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    );
};


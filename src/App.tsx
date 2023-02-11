import {
  AppBar,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC } from "react";

const darkTheme = createTheme();

export const App: FC = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <Typography color="inherit" noWrap variant="h6">
          Test
        </Typography>
      </Toolbar>
    </AppBar>
  </ThemeProvider>
);

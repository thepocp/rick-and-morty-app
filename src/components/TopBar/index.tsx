import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppBar, Link, Switch, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const TopBar: FC<Props> = ({ darkMode, setDarkMode }) => (
  <AppBar position="static">
    <Toolbar
      sx={{
        gap: '0.5em',
      }}
    >
      <Typography color="inherit" noWrap sx={{ flexGrow: 1 }} variant="h6">
        Rick and Morty character guide
      </Typography>
      <Switch
        checkedIcon={
          <LightModeIcon
            sx={{
              height: '20px',
            }}
          />
        }
        color="default"
        icon={
          <DarkModeIcon
            sx={{
              height: '20px',
            }}
          />
        }
        onChange={(): void => {
          setDarkMode(!darkMode);
        }}
        value={darkMode}
      />
      <Link
        href="https://github.com/thepocp/rick-and-morty-app"
        target="_blank"
      >
        <GitHubIcon color="action" />
      </Link>
    </Toolbar>
  </AppBar>
);

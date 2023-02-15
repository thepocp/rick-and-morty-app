import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

export const TopBar: FC = () => (
  <AppBar position="sticky">
    <Toolbar
      sx={{
        gap: '0.5em',
      }}
    >
      <Typography color="inherit" noWrap sx={{ flexGrow: 1 }} variant="h6">
        Rick and Morty character guide
      </Typography>
      <Link
        href="https://github.com/thepocp/rick-and-morty-app"
        target="_blank"
      >
        <GitHubIcon color="action" />
      </Link>
    </Toolbar>
  </AppBar>
);

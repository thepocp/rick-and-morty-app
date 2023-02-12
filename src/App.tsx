import GitHubIcon from '@mui/icons-material/GitHub';
import {
  AppBar,
  CircularProgress,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  SwipeableDrawer,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FC, useState } from 'react';

import { CharacterInfo } from './components/CharacterInfo';
import { CharacterList } from './components/CharacterList';
import { useCharacterLazyQuery, useCharactersQuery } from './generated/graphql';
import { filterEmpty } from './helpers/arrays';

const darkTheme = createTheme();

export const App: FC = () => {
  const isSm = useMediaQuery(darkTheme.breakpoints.up('sm'));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: charactersData, loading: charactersLoading } =
    useCharactersQuery();

  const [
    loadCharacterInfo,
    {
      data: characterData,
      variables: characterVariables,
      loading: characterLoading,
    },
  ] = useCharacterLazyQuery();

  const characters = filterEmpty(charactersData?.characters?.results || []);

  const characterLoadingId = characterLoading
    ? characterVariables?.id
    : undefined;

  const showCharacterInfo = (id: string): void => {
    loadCharacterInfo({ variables: { id } });
    setIsDrawerOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
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
      {charactersLoading ? (
        <Grid container justifyContent="center" margin="100px" width="100%">
          <CircularProgress />
        </Grid>
      ) : null}
      <CharacterList
        characterLoadingId={characterLoadingId}
        characters={characters}
        showCharacterInfo={showCharacterInfo}
      />
      <SwipeableDrawer
        anchor={isSm ? 'right' : 'bottom'}
        onClose={(): void => {
          setIsDrawerOpen(false);
        }}
        onOpen={(): void => {
          setIsDrawerOpen(true);
        }}
        open={isDrawerOpen}
        PaperProps={{
          sx: {
            width: isSm ? '500px' : 'auto',
            height: isSm ? '100vh' : '70vh',
          },
        }}
      >
        {characterLoading ? (
          <CircularProgress />
        ) : (
          <CharacterInfo character={characterData?.character} />
        )}
      </SwipeableDrawer>
    </ThemeProvider>
  );
};

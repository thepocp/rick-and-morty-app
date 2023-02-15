import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC } from 'react';

import { CharacterPanel } from './components/CharacterPanel';
import { Content } from './components/Content';
import { TopBar } from './components/TopBar';
import { useCharacter } from './hooks/useCharacter';
import { useCharactes } from './hooks/useCharactes';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App: FC = () => {
  const {
    characters,
    charactersLoading,
    charactersVariables,
    fetchNextData,
    fetchPrevData,
    canPrevPage,
    canNextPage,
    applyFilters,
  } = useCharactes();

  const {
    isCharacterInfoOpen,
    showCharacterInfo,
    toggleInfo,
    characterLoading,
    character,
  } = useCharacter(charactersVariables);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <Content
        applyFilters={applyFilters}
        canNextPage={canNextPage}
        canPrevPage={canPrevPage}
        characters={characters}
        charactersLoading={charactersLoading}
        charactersVariables={charactersVariables}
        fetchNextData={fetchNextData}
        fetchPrevData={fetchPrevData}
        showCharacterInfo={showCharacterInfo}
      />
      <CharacterPanel
        character={character}
        characterLoading={characterLoading}
        isDrawerOpen={isCharacterInfoOpen}
        toggleDrawer={toggleInfo}
      />
    </ThemeProvider>
  );
};

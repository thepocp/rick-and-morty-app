import { Container, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ListWrapper: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        '&:before': isSm
          ? {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'url(/rick.png) no-repeat left',
              backgroundSize: 'contain',
              opacity: 0.2,
              zIndex: -1,
            }
          : {},
        '&:after': {
          content: '""',
          position: 'fixed',
          top: 0,
          right: 0,
          width: isSm ? '50%' : '100%',
          height: '100%',
          background: 'url(/morty.webp) no-repeat right',
          backgroundSize: 'contain',
          opacity: 0.2,
          zIndex: -1,
        },
      }}
    >
      {children}
    </Container>
  );
};

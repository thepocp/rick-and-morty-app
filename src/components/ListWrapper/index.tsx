import { Container, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ListWrapper: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container
      maxWidth="md"
      sx={{
        flex: '1 1 auto',
        overflowX: 'auto',
        '&:before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: isSm ? '30%' : '50%',
          height: '100%',
          background: 'url(/rick.png) no-repeat center center',
          backgroundSize: 'cover',
          opacity: 0.2,
          zIndex: -1,
        },
        '&:after': {
          content: '""',
          position: 'fixed',
          top: 0,
          right: 0,
          width: isSm ? '30%' : '50%',
          height: '100%',
          background: 'url(/morty.png) no-repeat center center',
          backgroundSize: 'cover',
          opacity: 0.2,
          zIndex: -1,
        },
      }}
    >
      {children}
    </Container>
  );
};

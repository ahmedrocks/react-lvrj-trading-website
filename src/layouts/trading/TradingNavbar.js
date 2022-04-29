import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  OutlinedInput,
  InputAdornment,
  Stack,
  Card,
  CardContent,
  CardHeader,
  IconButton
} from '@material-ui/core';
import searchFill from '@iconify/icons-eva/search-fill';
import CloseIcon from '@material-ui/icons/Close';
// hooks
// components
import CryptoForex from '../../components/_external-pages/trading/CryptoForex';
import Logo from '../../components/Logo';
import { MHidden } from '../../components/@material-extend';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 50,
  [theme.breakpoints.up('md')]: {
    width: 340
  },
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': {
    width: 350,
    [theme.breakpoints.up('md')]: {
      width: 550
    },
    boxShadow: theme.customShadows.z8
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const SearchBoxStyle = styled(Box)(({ theme }) => ({
  width: '95%',
  position: 'absolute',
  top: 0,
  left: '50%',
  margin: 'auto',
  transform: 'translate(-50%, 60px)',
  [theme.breakpoints.up('md')]: {
    transform: 'translate(-42.5%, 60px)',
    maxWidth: 600
  }
}));

const SearchBackground = styled(Box)(() => ({
  position: 'absolute',
  top: 60,
  width: '100%',
  height: 'calc(100vh - 60px)'
}));
// ----------------------------------------------------------------------

export default function MainNavbar() {
  const theme = useTheme();
  const [filterName, setFilerName] = useState('');
  const [isShowSearchBox, setShowSearchBox] = useState(false);
  const onFilterName = (e) => {
    setFilerName(e.target.value);
  };

  return (
    <AppBar sx={{ boxShadow: 0, position: 'relative' }}>
      <Toolbar disableGutters sx={{ bgcolor: 'background.default', boxShadow: 'none' }}>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <MHidden width="mdDown">
            <SearchStyle
              size="small"
              value={filterName}
              onChange={onFilterName}
              onClick={() => setShowSearchBox(true)}
              placeholder="Search market here..."
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
            />
          </MHidden>
          <Stack direction="row" spacing={1} sx={{ position: 'relative' }}>
            <MHidden width="mdUp">
              <SearchStyle
                size="small"
                value={filterName}
                onChange={onFilterName}
                onClick={() => setShowSearchBox(true)}
                placeholder="Search market here..."
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      onClick={() => setShowSearchBox(false)}
                      icon={searchFill}
                      sx={{ color: 'text.disabled' }}
                    />
                  </InputAdornment>
                }
              />
            </MHidden>
            <Box component="img" src="/static/trading/nav-wallet.svg" sx={{ width: 35 }} />
          </Stack>
        </Container>
      </Toolbar>
      {isShowSearchBox && (
        <>
          <SearchBackground onClick={() => setShowSearchBox(false)} />
          <SearchBoxStyle>
            <Card variant="outlined">
              <CardHeader
                sx={{ padding: theme.spacing(1, 2, 0, 3) }}
                action={
                  <IconButton aria-label="settings" onClick={() => setShowSearchBox(false)}>
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ paddingTop: 0 }}>
                <CryptoForex />
              </CardContent>
            </Card>
          </SearchBoxStyle>
        </>
      )}
    </AppBar>
  );
}

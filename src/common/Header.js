import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Button, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Person as PersonIcon, ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';
import { getCartTotal } from '../stores/cartSlice';
import TopBar from './TopBar';

export default function Navbar() {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <TopBar />
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'primary.main', textDecoration: 'none' }}>
            Fruitables
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            <Button component={Link} to="/" sx={{ color: 'text.primary' }}>
              Home
            </Button>
            <Button component={Link} to="/shop" sx={{ color: 'text.primary' }}>
              Shop
            </Button>
            <Button component={Link} to="/shop-details" sx={{ color: 'text.primary' }}>
              Shop Detail
            </Button>
            <Button
              aria-controls="category-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: 'text.primary' }}
            >
              Category
            </Button>
            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'category-menu-button',
              }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/category/vegetables">Vegetables</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/category/fruits">Fruit</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/category/bread">Bread</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/category/meat">Meat</MenuItem>
            </Menu>
            <Button component={Link} to="/contact" sx={{ color: 'text.primary' }}>
              Contact
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <SearchIcon />
            </IconButton>
            <IconButton component={Link} to="/cart" color="inherit" sx={{ mx: 1 }}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

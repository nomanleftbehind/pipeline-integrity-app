import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLogoutMutation } from '../graphql/generated/graphql';

import { IUserNonNull } from '../context/AuthContext';

interface IDropdownMenuProps {
  user: IUserNonNull;
}

export default function DropdownMenu({ user }: IDropdownMenuProps) {
  const { setUser } = useAuth() || {};
  const client = useApolloClient();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout().then(() => {
      client.resetStore().then(() => {
        setUser && setUser(null);
        router.push('/register');
      })
    })
  }

  return (
    <div>
      <Button
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        style={{ textTransform: 'none', padding: 0 }}
        color='inherit'
        onClick={handleClick}
      >
        {user.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

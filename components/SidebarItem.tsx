import { useState } from 'react';

import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface ISidebarItemProps {
  id?: string;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  padding_left?: number;
  onExpand?: () => void;
  open?: boolean;
}

function SidebarItem({ id, name, padding_left, onClick, onExpand, open }: ISidebarItemProps) {

  return (
    <ListItem
      sx={padding_left ? { pl: padding_left } : undefined}
      secondaryAction={onExpand ?
        <IconButton edge="end" aria-label="open" onClick={onExpand} size='small'>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton> : undefined
      }
    >
      {onExpand ?
        <ListItemAvatar>
          <Avatar>
            <IconButton edge="end" aria-label="open" value={id} onClick={onClick} size='small'>
              <FolderIcon />
            </IconButton>
          </Avatar>
        </ListItemAvatar> :
        <ListItemIcon>
          <IconButton edge="end" aria-label="open" value={id} onClick={onClick} size='small'>
            <FolderIcon />
          </IconButton>
        </ListItemIcon>
      }
      <ListItemText
        primary={name}
      />
    </ListItem>
  );
}


interface ISidebarDropdownItemProps {
  id?: string;
  name: string;
  onSidebarClick: (id: string, table: string) => void;
  satellites?: {
    id: string;
    name: string;
  }[]
}


export default function SidebarDropdownItem({ id, name, onSidebarClick, satellites }: ISidebarDropdownItemProps) {

  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarItem
        id={id}
        name={name}
        onClick={(e) => onSidebarClick(e.currentTarget.value, 'facility')}
        onExpand={handleExpand}
        open={open}
      />
      {satellites ?
        satellites.map(satellite => {
          return satellite ?
            (
              <Collapse in={open} timeout="auto" unmountOnExit key={satellite.id}>
                <List component="div" disablePadding>
                  <SidebarItem
                    id={satellite.id}
                    name={satellite.name}
                    onClick={(e) => onSidebarClick(e.currentTarget.value, 'satellite')}
                    padding_left={6}
                  />
                </List>
              </Collapse>
            ) :
            null;
        }) :
        null
      }
    </>
  )
}
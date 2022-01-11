import { useState } from 'react';

import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface ISidebarItemProps {
  id?: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  padding_left?: number;
  onExpand?: () => void;
  open?: boolean;
}

function SidebarItem({ id, name, padding_left, onClick, onExpand, open }: ISidebarItemProps) {

  return (
    <ListItem
      sx={padding_left ? { pl: padding_left } : undefined}
      secondaryAction={onExpand ?
        <IconButton edge="end" aria-label="open" onClick={onExpand}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton> : undefined
      }
    >
      <ListItemAvatar>
        <Avatar>
          <IconButton edge="end" aria-label="open" value={id} onClick={onClick}>
            <FolderIcon />
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
      />
    </ListItem>
  );
}


interface ISidebarDropdownItemProps {
  id?: string;
  name: string;
  onAllPipelinesClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFacilityClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSatelliteClick?: React.MouseEventHandler<HTMLButtonElement>;
  satellites?: {
    satelliteId: string;
    satelliteName: string;
  }[]
}


export default function SidebarDropdownItem({ id, name, onAllPipelinesClick, onFacilityClick, onSatelliteClick, satellites }: ISidebarDropdownItemProps) {

  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarItem
        id={id}
        name={name}
        onClick={onFacilityClick}
        onExpand={handleExpand}
        open={open}
      />
      {satellites ?
        satellites.map(satellite => {
          return satellite ?
            (
              <Collapse in={open} timeout="auto" unmountOnExit key={satellite.satelliteId}>
                <List component="div" disablePadding>
                  <SidebarItem
                    id={satellite.satelliteId}
                    name={satellite.satelliteName}
                    onClick={onSatelliteClick}
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
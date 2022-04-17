import { useState } from 'react';
import FacilityIcon from '../svg/facility';
import SatelliteIcon from '../svg/satellite';
import { IOnNavigationAction } from './HierarchyNavigation'

import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { TableEnum } from '../../graphql/generated/graphql';

interface ISidebarItemProps {
  id?: string;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  paddingLeft?: number;
  onExpand?: () => void;
  open?: boolean;
}

function HierarchyNavigationItem({ id, name, paddingLeft, onClick, onExpand, open }: ISidebarItemProps) {

  return (
    <ListItem
      sx={paddingLeft ? { pl: paddingLeft } : undefined}
      secondaryAction={onExpand ?
        <IconButton edge="end" aria-label="open" onClick={onExpand} size='small'>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton> : undefined
      }
    >
      {onExpand ?
        <ListItemIcon>
          <IconButton edge="end" aria-label="open" value={id} onClick={onClick} size='small'>
            <FacilityIcon />
          </IconButton>
        </ListItemIcon> :
        <ListItemIcon>
          <IconButton edge="end" aria-label="open" value={id} onClick={onClick} size='small'>
            <SatelliteIcon />
          </IconButton>
        </ListItemIcon>
      }
      <ListItemText
        primary={name}
      />
    </ListItem>
  );
}


interface IHierarchyNavigationDropdownItemProps {
  id?: string;
  name: string;
  onHierarchyItemClick: IOnNavigationAction;
  satellites?: {
    id: string;
    name: string;
  }[]
}


export default function HierarchyNavigationDropdownItem({ id, name, onHierarchyItemClick, satellites }: IHierarchyNavigationDropdownItemProps) {

  const [open, setOpen] = useState(false);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <>
      <HierarchyNavigationItem
        id={id}
        name={name}
        onClick={(e) => onHierarchyItemClick({ hierarchy: { id: e.currentTarget.value, table: TableEnum.Facility } })}
        onExpand={handleExpand}
        open={open}
      />
      {satellites && satellites.map(satellite => {
        return satellite && (
          <Collapse in={open} timeout="auto" unmountOnExit key={satellite.id}>
            <List component="div" disablePadding>
              <HierarchyNavigationItem
                id={satellite.id}
                name={satellite.name}
                onClick={(e) => onHierarchyItemClick({ hierarchy: { id: e.currentTarget.value, table: TableEnum.Satellite } })}
                paddingLeft={6}
              />
            </List>
          </Collapse>
        );
      })
      }
    </>
  )
}
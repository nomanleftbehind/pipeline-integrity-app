import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ModalAllocationProgress, ModalFieldError, openAllocationProgressModal } from './Modal';
import { openModal } from './rows/RenderPipeline';
import {
  useAllocateRiskMutation,
  useRiskAllocationProgressSubscription,
} from '../graphql/generated/graphql';


interface IAllocateMenuProps {
  userId: string;
}

export default function AllocateMenu({ userId }: IAllocateMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { } = useRiskAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { riskAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

  const [allocateRisk] = useAllocateRiskMutation({
    onCompleted: ({ allocateRisk }) => {
      const { error, success } = allocateRisk || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
  });

  const handleAllocate = () => {
    allocateRisk();
  }

  const [allocationProgressBar, setAllocationProgressBar] = useState({ progress: 0, numberOfItems: 0 });
  const initialFieldStatus = { field: '', message: '' };
  const [fieldStatus, setFieldStatus] = useState(initialFieldStatus);

  const isProgressModalOpen = openAllocationProgressModal(allocationProgressBar);
  const isStatusModalOpen = openModal(fieldStatus);

  const hideFieldStatusModal = () => {
    setFieldStatus(initialFieldStatus);
  }

  return (
    <div>
      {isProgressModalOpen && <ModalAllocationProgress
        progress={allocationProgressBar}
      />}
      {isStatusModalOpen && <ModalFieldError
        fieldError={fieldStatus}
        hideFieldError={hideFieldStatusModal}
      />}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{ textTransform: 'none', padding: 0, color: 'inherit' }}
        onClick={handleClick}
      >
        Allocate
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleAllocate}>Risk</MenuItem>
      </Menu>
    </div>
  );
}

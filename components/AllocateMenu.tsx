import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { openModal } from '../components/rows/RenderPipeline';
import { ModalFieldError as ModalFieldPayload } from './Modal';
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
        console.log(`Allocated ${progress} of ${numberOfItems}`);

        setFieldPayload({
          field: 'Risk Allocation',
          message: `Allocated ${progress} of ${numberOfItems}`
        });
      }
    },
  });

  const [allocateRisk] = useAllocateRiskMutation({
    onCompleted: ({ allocateRisk }) => {
      const { error, success } = allocateRisk || {};
      if (error) {
        setFieldPayload(error);
      }
      if (success) {
        setFieldPayload(success);
      }
    }
  });

  const handleAllocate = () => {
    allocateRisk({
      notifyOnNetworkStatusChange: true,
    });
  }

  const initialFieldPayload = { field: '', message: '' };
  const [fieldPayload, setFieldPayload] = useState(initialFieldPayload);

  const hideFieldPayloadModal = () => {
    setFieldPayload(initialFieldPayload);
  }

  const isModalOpen = openModal(fieldPayload);

  return (
    <div>
      {isModalOpen && <ModalFieldPayload
        fieldError={fieldPayload}
        hideFieldError={hideFieldPayloadModal}
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

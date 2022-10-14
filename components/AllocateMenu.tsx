import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ModalAllocationProgress, ModalFieldError, openAllocationProgressModal } from './Modal';
import { openModal } from './rows/RenderPipeline';
import {
  useAllocatePipelineFlowMutation,
  usePipelineFlowAllocationProgressSubscription,
  useAllocateWellFlowMutation,
  useWellFlowAllocationProgressSubscription,
  useAllocateSalesPointFlowMutation,
  useSalesPointFlowAllocationProgressSubscription,
  useAllocateRiskMutation,
  useRiskAllocationProgressSubscription,
  useAllocateChronologicalEdgeMutation,
  useChronologicalEdgeAllocationProgressSubscription,
  useAllocatePressureTestMutation,
  usePressureTestAllocationProgressSubscription,
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

  const { } = usePipelineFlowAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { pipelineFlowAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

  const { } = useWellFlowAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { wellFlowAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

  const { } = useSalesPointFlowAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { salesPointFlowAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

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

  const { } = usePressureTestAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { pressureTestAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

  const { } = useChronologicalEdgeAllocationProgressSubscription({
    variables: { data: { userId } },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) {
        const { chronologicalEdgeAllocationProgress: { progress, numberOfItems } } = data;
        setAllocationProgressBar({
          progress,
          numberOfItems,
        });
      }
    },
  });

  const [allocatePipelineFlow] = useAllocatePipelineFlowMutation({
    onCompleted: ({ allocatePipelineFlow }) => {
      const { error, success } = allocatePipelineFlow || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
  });

  const [allocateWellFlow] = useAllocateWellFlowMutation({
    onCompleted: ({ allocateWellFlow }) => {
      const { error, success } = allocateWellFlow || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
  });

  const [allocateSalesPointFlow] = useAllocateSalesPointFlowMutation({
    onCompleted: ({ allocateSalesPointFlow }) => {
      const { error, success } = allocateSalesPointFlow || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
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

  const [allocatePressureTest] = useAllocatePressureTestMutation({
    onCompleted: ({ allocatePressureTest }) => {
      const { error, success } = allocatePressureTest || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
  });

  const [allocateChronologicalEdge] = useAllocateChronologicalEdgeMutation({
    onCompleted: ({ allocateChronologicalEdge }) => {
      const { error, success } = allocateChronologicalEdge || {};
      if (error) {
        setFieldStatus(error);
      }
      if (success) {
        setFieldStatus(success);
      }
    }
  });

  const handleAllocatePipelineFlow = () => {
    allocatePipelineFlow();
  }

  const handleAllocateWellFlow = () => {
    allocateWellFlow();
  }

  const handleAllocateSalesPointFlow = () => {
    allocateSalesPointFlow();
  }

  const handleAllocateRisk = () => {
    allocateRisk();
  }

  const handleAllocatePressureTest = () => {
    allocatePressureTest();
  }

  const handleAllocateChronologicalEdge = () => {
    allocateChronologicalEdge();
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
        <MenuItem onClick={handleAllocatePipelineFlow}>Pipeline Flow</MenuItem>
        <MenuItem onClick={handleAllocateWellFlow}>Well Flow</MenuItem>
        <MenuItem onClick={handleAllocateSalesPointFlow}>Sales Point Flow</MenuItem>
        <MenuItem onClick={handleAllocateRisk}>Risk</MenuItem>
        <MenuItem onClick={handleAllocatePressureTest}>Pressure Test</MenuItem>
        <MenuItem onClick={handleAllocateChronologicalEdge}>Chronological Edge</MenuItem>
      </Menu>
    </div>
  );
}

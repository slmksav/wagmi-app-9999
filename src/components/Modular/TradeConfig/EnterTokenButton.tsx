import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  background: 'transparent',
  border: '1px solid white',
  color: 'white',
  '&:hover': {
    background: 'transparent',
    border: '1px solid #1076d2',
  },
});

interface EnterTokenButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  resetTokenSelection: boolean; // Add a prop to reset token selection
}

const EnterTokenButton: React.FC<EnterTokenButtonProps> = ({
  onClick,
  resetTokenSelection,
}) => {
  const [tokenSelected, setTokenSelected] = React.useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (tokenSelected) {
      // If the button is in "SELECTED" mode, reset it when clicked
      setTokenSelected(false);
    } else {
      // Otherwise, set it to "SELECTED" mode
      setTokenSelected(true);
    }
    // Always call the original onClick function to open the menu
    onClick(event);
  };

  // Use useEffect to reset tokenSelected when the resetTokenSelection prop changes
  React.useEffect(() => {
    if (resetTokenSelection) {
      setTokenSelected(false);
    }
  }, [resetTokenSelection]);

  return (
    <CustomButton
      variant="contained"
      fullWidth
      onClick={handleButtonClick}
      className="mb-4 mt-3"
      style={{
        backgroundColor: tokenSelected ? 'transparent' : 'transparent',
        color: tokenSelected ? '#1076d2' : 'white', // Change text color to blue when selected
        border: tokenSelected ? '1px solid #1076d2' : '1px solid white', // Change border color to blue when selected
      }}
    >
      <div className={`audiowide`}>
        {tokenSelected ? 'CHANGE TOKEN' : 'SELECT TOKEN'}
      </div>
    </CustomButton>
  );
};

export default EnterTokenButton;

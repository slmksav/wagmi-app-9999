import React, { useState } from 'react';
import {
  Menu,
  TextField,
  IconButton,
  MenuItem,
  FormHelperText,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import metamask from '../img/metamask.svg';

interface TokenSelectionProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelectContract: (contract: string) => void;
}

const TokenSelection: React.FC<TokenSelectionProps> = ({
  anchorEl,
  onClose,
  onSelectContract,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const contractAddresses = [
    '0x86f61e980Eda9e2B5846589B4Ad6aB1eC584905D',
    '0x2dbf22C2080637DF7863AF3019CAC8e3fb82daC7',
    '0x3D806324b6Df5AF3c1a81aCbA14A8A62Fe6D643F',
  ]; // Replace with actual contract addresses
  const [visibleContracts, setVisibleContracts] = useState(contractAddresses);
  const [selectedContract, setSelectedContract] = useState<string | null>(null); // Track the selected contract

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setSearchInput(value); // Always update the searchInput state
    if (value.startsWith('0x') || value.startsWith('0')) {
      const filteredContracts = contractAddresses.filter((contract) =>
        contract.toLowerCase().includes(value.toLowerCase()),
      );
      setVisibleContracts(filteredContracts);
      setErrorMessage('');
    } else {
      setVisibleContracts(contractAddresses);
      setErrorMessage('Input must start with "0x" or "0".');
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setVisibleContracts(contractAddresses);
    setErrorMessage('');
  };

  const handleContractSelection = (contract: string) => {
    setSelectedContract(contract);
    setSearchInput(contract); // Set the input field value to the selected contract
    setErrorMessage(''); // Reset the error message when a contract is selected from the list
  };

  const handleVerify = () => {
    if (selectedContract && visibleContracts.includes(selectedContract)) {
      onSelectContract(selectedContract); // Pass the selected contract to the parent component
      onClose(); // Close the menu after selecting a token
    } else {
      setSelectedContract(null); // Reset the selected contract
      setErrorMessage('Contract not found in the list.');
    }
  };

  const shortenContractAddress = (contract: string) => {
    if (!contract.startsWith('0x')) return contract;
    const start = contract.slice(0, 6);
    const end = contract.slice(-6);
    return `${start}...${end}`;
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div style={{ padding: '8px', maxHeight: '300px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            label="Contract"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={handleSearchInputChange}
            InputLabelProps={{ style: { color: 'black' } }}
            style={{ color: 'black', flex: 1 }}
            error={!!errorMessage}
          />
          <IconButton color="inherit">
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
          <IconButton onClick={handleClear} color="inherit">
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </div>
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
        <Button fullWidth variant="contained" color="primary" onClick={handleVerify}>
          <div className="allerta-stencil font-bold">PROCEED</div>
        </Button>
      </div>
      {visibleContracts.map((contract) => (
        <MenuItem key={contract} onClick={() => handleContractSelection(contract)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {shortenContractAddress(contract)}
            <img
              src={metamask}
              alt="Metamask Logo"
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TokenSelection;

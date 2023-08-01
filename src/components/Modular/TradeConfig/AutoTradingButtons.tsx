import React, {useState} from 'react';
import {
  Switch,
  FormControlLabel,
  Button,
  Popover,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle, faTimes} from '@fortawesome/free-solid-svg-icons';

interface AutotradingButtonsProps {
  isContractSelected: boolean;
  isInputValid: boolean;
  selectedContract: string | null;
  onTradeSummary: (summary: string) => void;
  onTradeConfirmation: () => void;
  tradeAmount: string; // Add tradeAmount prop
  stopLoss: string; // Add stopLoss prop
  slippage: string; // Add slippage prop
}

const AutotradingButtons: React.FC<AutotradingButtonsProps> = ({
  isContractSelected,
  isInputValid,
  selectedContract,
  tradeAmount,
  stopLoss,
  slippage,
  onTradeSummary,
  onTradeConfirmation,
}) => {
  const [autotradingEnabled, setAutotradingEnabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const handleAutotradingToggle = () => {
    setAutotradingEnabled((prev) => !prev);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.classList.contains('MuiSwitch-root')) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = () => {
    setAnchorEl(buttonRef.current);
    setShowVerification(true);
  };

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const createTradeSummary = () => {
    return [
      <div
        className="text-center"
        style={{display: 'flex', justifyContent: 'center'}}
        key="summaryContainer"
      >
        <div style={{textAlign: 'left', maxWidth: '200px'}}>
          <p className="gruppo text-left" key="contract">
            <b>Token:</b> Cashtag
          </p>
          <div
            className="gruppo mt-0 text-black"
            style={{fontSize: '0.35rem'}}
          >
            CA: {selectedContract}
          </div>
          <p className="gruppo mt-2 text-black" key="autotrading">
            <b>Autotrade:</b> {autotradingEnabled ? 'Yes' : 'No'}
          </p>
          <p className="gruppo mt-1 text-black">
            <b>Dex:</b> UniSwapV3
          </p>
          <hr
            style={{
              borderTop: '1px solid #000',
              marginBottom: '10px',
              marginTop: '10px',
            }}
            key="line"
          />
          <p
            className="audiowide mt-4"
            style={{fontSize: '1rem'}}
            key="summary"
          >
            <b>DETAILS:</b>
          </p>
          <ul key="details" style={{listStyleType: 'none', paddingLeft: 0}}>
            <li className="gruppo mt-1 text-black">
              <b>Trade Amount:</b> {tradeAmount} ($x)
            </li>
            <li className="gruppo mt-1 text-black">
              <b>Stop Loss:</b> {stopLoss}
            </li>
            <li className="gruppo mt-1 text-black">
              <b>Max Slippage:</b> {slippage}%
            </li>
          </ul>
        </div>
      </div>,
    ];
  };

  const handleTradeConfirmation = () => {
    console.log('Trade Summary:', createTradeSummary());
    setShowVerification(false);
  };

  const getButtonLabel = () => {
    return autotradingEnabled ? 'AUTOTRADE' : 'TRADE';
  };

  return (
    <React.Fragment>
      {/* Autotrading On/Off */}
      <div className="mb-3 flex items-center">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={autotradingEnabled}
                onChange={handleAutotradingToggle}
              />
            }
            label={
              <div className="allerta-stencil text-sm text-white">
                Autotrading
              </div>
            }
          />
          {/* Replace the button element with a span or any other suitable element */}
          <span
            style={{cursor: 'pointer', marginLeft: '0.05rem'}}
            onClick={handlePopoverOpen}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </span>
        </div>
      </div>

      {/* Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {/* Add a close button to the top right corner of the popover */}
        <IconButton
          aria-label="close"
          size="small"
          style={{position: 'absolute', top: 5, right: 5}}
          onClick={handlePopoverClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <Typography sx={{p: 1, maxWidth: 250}}>
          <div className="gruppo text-black">
            While we support <b>manual trades</b> as well, <b>Autotrading{' '}
            will automatically sell</b> for you based on the sentiment for a forecasted profit.{' '}
            <b>We recommend getting started with autotrading.</b>
          </div>
        </Typography>
      </Popover>

      {/* Start Autotrading Button */}
      <Button
        variant="contained"
        fullWidth
        style={{
          color: '#1976d2',
          opacity: isInputValid && isContractSelected ? 1 : 0.5,
        }}
        disabled={!isInputValid || !isContractSelected} // Disable the button if any input field is empty or invalid
        onClick={handleButtonClick}
        ref={buttonRef} // Pass the ref to the button
      >
        <div className="audiowide text-white">{getButtonLabel()}</div>{' '}
        {/* Render the button label dynamically */}
      </Button>

      {/* Verification Screen */}
      {showVerification && (
        <div>
          <Dialog open={true} onClose={() => setShowVerification(false)}>
            <DialogTitle>
              <div className="audiowide">
                <b>CONFIRM TRADE</b>
              </div>
            </DialogTitle>
            <DialogContent>
              <div>{createTradeSummary()}</div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowVerification(false)}
                color="inherit"
              >
                <div className="audiowide">BACK</div>
              </Button>
              <Button onClick={handleTradeConfirmation} color="primary">
                <div className="audiowide">
                  <b>FETCH QUOTE (12s)</b>
                </div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </React.Fragment>
  );
};

export default AutotradingButtons;

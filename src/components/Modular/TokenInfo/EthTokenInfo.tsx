import React, {useState} from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type TokenInfoProps = {
  rank: number;
  tokenName: string;
  tokenLink: string;
  tokenCA: string; // New prop for the token contract address
  forecast: string;
  signals: string;
  score: string;
  price: string;
  isVolumeUp: boolean;
  isPriceUp: boolean;
  isLiquidityUp: boolean;
};

const EthTokenInfo: React.FC<TokenInfoProps> = ({
  rank,
  tokenName,
  tokenLink,
  tokenCA,
  forecast,
  signals,
  score,
  price,
  isVolumeUp,
  isPriceUp,
  isLiquidityUp,
}) => {
  // State to handle copy status
  const [isCopied, setIsCopied] = useState(false);

  // Function to handle copy success
  const handleCopySuccess = () => {
    setIsCopied(true);
    // Set timeout to reset the copy status after a short delay
    setTimeout(() => setIsCopied(false), 1500);
  };

  const getArrowIcon = (isUp: boolean) => {
    return (
      <FontAwesomeIcon
        icon={isUp ? faArrowUp : faArrowDown}
        color={isUp ? 'green' : 'red'}
      />
    );
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{backgroundColor: 'rgba(0, 0, 0, 0.55)'}}
      >
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Rank
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Token
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Forecast
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Signals
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Score
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
                  fontFamily: 'Allerta Stencil',
                  fontSize: 12,
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {getArrowIcon(isVolumeUp)} <b>{rank}.</b>
                </div>
              </TableCell>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <a
                    href={tokenLink}
                    style={{color: '#1976d2', fontFamily: 'gruppo'}}
                  >
                    {tokenName}
                  </a>
                  <div className="gruppo text-s ml-2"></div>
                  <CopyToClipboard text={tokenCA} onCopy={handleCopySuccess}>
                    <span style={{cursor: 'pointer', marginLeft: '2px'}}>
                      <FontAwesomeIcon
                        icon={faClipboard}
                        color={isCopied ? '#2976d2' : 'white'}
                      />
                    </span>
                  </CopyToClipboard>
                </div>
              </TableCell>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {getArrowIcon(isVolumeUp)} {forecast}
                </div>
              </TableCell>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {getArrowIcon(isPriceUp)} {signals}
                </div>
              </TableCell>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', ontSize: 12}}
              >
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {getArrowIcon(isLiquidityUp)} {score}
                </div>
              </TableCell>
              <TableCell
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                {price}
              </TableCell>
            </TableRow>
            {/* Add more token information as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EthTokenInfo;

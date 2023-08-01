import React from 'react';
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
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

type TokenInfoProps = {
  rank: number;
  tokenName: string;
  tokenLink: string; // New prop for the token link
  forecast: string;
  signals: string;
  score: string;
  price: string;
  isVolumeUp: boolean;
  isPriceUp: boolean;
  isLiquidityUp: boolean;
};

const BscTokenInfo: React.FC<TokenInfoProps> = ({
  rank,
  tokenName,
  tokenLink, // Add the tokenLink prop to the component
  forecast,
  signals,
  score,
  price,
  isVolumeUp,
  isPriceUp,
  isLiquidityUp,
}) => {
  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
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
      <TableContainer component={Paper} sx={containerStyle}>
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
                <div
                  className="gruppo"
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  {getArrowIcon(isVolumeUp)} <b>{rank}.</b>
                </div>
              </TableCell>
              <TableCell
                sx={{color: '#1976d2', fontFamily: 'gruppo', fontSize: 12}}
              >
                <a href={tokenLink}>{tokenName}</a>{' '}
                {/* Use the tokenLink to create a hyperlink */}
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
                sx={{color: 'white', fontFamily: 'gruppo', fontSize: 12}}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
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

export default BscTokenInfo;

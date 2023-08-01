import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useInterval} from 'react-use';
import {formatDistanceToNow} from 'date-fns';
import styled from '@emotion/styled';
import ethscan from '../img/ethchain.svg';

const Card = styled.div`
  background-color: transparent;
  min-width: 250px;
`;

const Table = styled.table`
  min-width: 350px;
`;

const TableCell = styled.td`
  font-size: 0.8rem;
  color: white;
  font-family: 'Gruppo';
  padding: 0.4rem; /* Add some padding between the table cells */
  background-color: transparent;
  white-space: nowrap; /* Prevent contract name from wrapping to a new line */
  max-width: 8ch; /* Limit contract name to 8 characters per row */
  overflow: hidden; /* Hide any overflowing characters */
  text-overflow: ellipsis; /* Display an ellipsis (...) for overflowed content */
`;

const LoadingSpinner = styled.div`
  /* Add your loading spinner styles here */
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface Contract {
  id: number;
  contract_address: string;
  contract_name: string;
  from_address: string;
  timestamp: string;
}

const EthLatestDeployed: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const etherscanLink = 'https://etherscan.io/address/';

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://carthage-backend-infura-production.up.railway.app/contracts',
      );
      setContracts(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useInterval(fetchData, 60000);

  useEffect(() => {
    fetchData();
  }, []);

  const relativeTime = (utcDate: string) => {
    const date = new Date(utcDate);
    const localDate = new Date(date); // Convert to user's local time
    return formatDistanceToNow(localDate, {addSuffix: true});
  };

  const shortenContractAddress = (contract: string) => {
    if (!contract.startsWith('0x')) return contract;
    const start = contract.slice(0, 6);
    const end = contract.slice(-6);
    return `${start}...${end}`;
  };

  const numberOfColumns = 4; // Number of columns in the table

  return (
    <div className="space-y-4 p-4 text-white">
      <Card>
        <Table>
          <thead>
            <tr>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Contract</b>
              </TableCell>
              <TableCell>
                <b>Creator</b>
              </TableCell>
              <TableCell>
                <b>Age</b>
              </TableCell>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Display an empty row with the same number of columns as the table headers
              <tr>
                {Array.from({length: numberOfColumns}).map((_, index) => (
                  <TableCell
                    key={index}
                    colSpan={1}
                    style={{textAlign: 'center'}}
                  >
                    <LoadingSpinner />
                  </TableCell>
                ))}
              </tr>
            ) : (
              contracts.map((contract) => (
                <tr key={contract.id}>
                  <TableCell>{contract.contract_name}</TableCell>
                  <TableCell>
                    <a className="text-blue-500"
                      href={`${etherscanLink}${contract.contract_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortenContractAddress(contract.contract_address)}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a className="text-blue-400"
                      href={`${etherscanLink}${contract.from_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortenContractAddress(contract.from_address)}
                    </a>
                  </TableCell>
                  <TableCell>{relativeTime(contract.timestamp)}</TableCell>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default EthLatestDeployed;

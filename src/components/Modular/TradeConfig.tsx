import React, { useState, useRef } from "react";
import AutotradingButtons from "./TradeConfig/AutoTradingButtons";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import TokenSelection from "./TradeConfig/TokenSelection";
import { styled } from "@mui/system";
import EnterTokenButton from "./TradeConfig/EnterTokenButton";
import GasValue from "./TokenInfo/GasValue";

const CustomButton = styled(Button)({
  background: "transparent",
  border: "1px solid white",
  color: "white",
  "&:hover": {
    background: "transparent",
    border: "1px solid #1076d2",
  },
});

const TradeConfig: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputType, setInputType] = useState<"token" | "dollar">("token");
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [resetTokenSelection, setResetTokenSelection] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newInputType: "token" | "dollar"
  ) => {
    setInputType(newInputType);
  };

  const handleContractSelect = (contract: string) => {
    setSelectedContract(contract);
  };

  const numberDotPattern = /^[0-9.]*$/;

  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeAmountValid, setTradeAmountValid] = useState(true);
  const [stopLoss, setStopLoss] = useState("");
  const [stopLossValid, setStopLossValid] = useState(true);
  const [maxSlippage, setMaxSlippage] = useState("");
  const [maxSlippageValid, setMaxSlippageValid] = useState(true);

  const validateInput = (value: string) => {
    return numberDotPattern.test(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.trim() === "" || !validateInput(value)) {
      switch (name) {
        case "tradeAmount":
          setTradeAmount(value);
          setTradeAmountValid(false);
          break;
        case "stopLoss":
          setStopLoss(value);
          setStopLossValid(false);
          break;
        case "maxSlippage":
          setMaxSlippage(value);
          setMaxSlippageValid(false);
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "tradeAmount":
          setTradeAmount(value);
          setTradeAmountValid(true);
          break;
        case "stopLoss":
          setStopLoss(value);
          setStopLossValid(true);
          break;
        case "maxSlippage":
          const numValue = parseFloat(value);
          const updatedValue = isNaN(numValue)
            ? ""
            : `${Math.min(numValue, 49).toFixed(2)}`;
          setMaxSlippage(updatedValue);
          setMaxSlippageValid(numValue <= 49);
          break;
        default:
          break;
      }
    }
  };

  const areInputFieldsValid = () => {
    return (
      tradeAmountValid &&
      stopLossValid &&
      maxSlippageValid &&
      tradeAmount.trim() !== "" &&
      stopLoss.trim() !== "" &&
      maxSlippage.trim() !== ""
    );
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [showVerification, setShowVerification] = useState(false);
  const [tradeSummary, setTradeSummary] = useState("");

  const handleTradeConfirmation = () => {
    console.log("Trade Summary:", tradeSummary);
    setShowVerification(false);
  };

  return (
    <div className="bg-gray col-span-1 row-span-1 bg-opacity-20 text-white">
      <div className="audiowide mb-3 text-2xl">
        <EnterTokenButton
          onClick={handleMenuOpen}
          resetTokenSelection={resetTokenSelection}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <TextField
          label="Trade Amount"
          variant="outlined"
          className="mb-3 mt-2"
          fullWidth
          InputLabelProps={{
            style: { color: "white", fontFamily: "Gruppo", fontWeight: "400" },
          }}
          inputProps={{
            style: { color: "white", fontFamily: "Gruppo" },
            pattern: numberDotPattern,
          }}
          error={!tradeAmountValid}
          helperText={!tradeAmountValid ? "Please enter a numeric value" : ""}
          name="tradeAmount"
          onChange={handleInputChange}
        />

        <TextField
          label="Stop Loss"
          variant="outlined"
          className="mb-3 mt-2"
          fullWidth
          InputLabelProps={{ style: { color: "white", fontFamily: "Gruppo" } }}
          inputProps={{
            style: { color: "white", fontFamily: "Gruppo" },
            pattern: numberDotPattern,
          }}
          error={!stopLossValid}
          helperText={!stopLossValid ? "Please enter a numeric value" : ""}
          name="stopLoss"
          onChange={handleInputChange}
        />

        <TextField
          label="Max Slippage"
          variant="outlined"
          className="mb-3 mt-2"
          fullWidth
          InputLabelProps={{ style: { color: "white", fontFamily: "Gruppo" } }}
          inputProps={{
            style: { color: "white", fontFamily: "Gruppo" },
            pattern: numberDotPattern,
          }}
          error={!maxSlippageValid}
          helperText={
            !maxSlippageValid ? "Please enter a percentual value" : ""
          }
          name="maxSlippage"
          value={maxSlippage}
          onChange={handleInputChange}
          InputProps={{
            // Set the color to white here
            endAdornment: (
              <span style={{ fontFamily: "Gruppo", color: "white" }}>%</span>
            ),
          }}
        />

        <ToggleButtonGroup
          value={inputType}
          exclusive
          onChange={handleInputTypeChange}
          className="mb-3"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <ToggleButton
            value="token"
            style={{
              fontFamily: "Audiowide, sans-serif",
              color: inputType === "token" ? "#1976d2" : "white",
            }}
          >
            Crypto
          </ToggleButton>
          <ToggleButton
            value="dollar"
            style={{
              fontFamily: "Audiowide, sans-serif",
              color: inputType === "dollar" ? "#1976d2" : "white",
            }}
          >
            USD
          </ToggleButton>
        </ToggleButtonGroup>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="gruppo text-white">
            <span>
              <GasValue />
            </span>
          </div>
        </div>

        <AutotradingButtons
          isContractSelected={!!selectedContract}
          isInputValid={areInputFieldsValid()}
          selectedContract={selectedContract}
          tradeAmount={tradeAmount} // Pass tradeAmount as prop
          stopLoss={stopLoss} // Pass stopLoss as prop
          slippage={maxSlippage} // Pass maxSlippage as prop
          onTradeSummary={(summary) => setTradeSummary(summary)}
          onTradeConfirmation={handleTradeConfirmation}
        />
      </div>

      <TokenSelection
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onSelectContract={handleContractSelect}
      />
      {selectedContract && (
        <div
          className="audiowide mt-2 text-white"
          style={{ fontSize: "0.35rem" }}
        >
          Selected Contract: {selectedContract}
        </div>
      )}
    </div>
  );
};

export default TradeConfig;

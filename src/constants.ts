export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const usdcAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
export const mooDengAddress = '0x6e35d648c7a04071cB99BF6012423711B76F3C76';
export const transferABI = [
  {
    "inputs":[{
      "internalType":"address",
      "name":"to",
      "type":"address"
    },
    {
      "internalType":"uint256",
      "name":"value",
      "type":"uint256"
    }],
    "name":"transfer",
    "outputs":[{
      "internalType":"bool",
      "name":"",
      "type":"bool"
    }],
    "stateMutability":"nonpayable",
    "type":"function"
  }
] as const;


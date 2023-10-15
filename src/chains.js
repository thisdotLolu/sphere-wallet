const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: process.env.INFURA_RPC_URL,
    ticker: "ETH"
};

const Polygon = {
    hex: '0x89',
    name: 'Mumbai Testnet',
    rpcUrl: process.env.INFURA_RPC_URL,
    ticker: "MATIC"
};

const BinanceChain ={
    hex: '0x38',
    name: 'Binance Chain',
    rpcUrl: process.env.INFURA_RPC_URL,
    ticker: "BNB"
}

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x89": Polygon,
    "0x38": BinanceChain,
};
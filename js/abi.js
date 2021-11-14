const Abi = [
    {
        inputs: [
            { internalType: "uint256", name: "quantia", type: "uint256" },
        ],
        name: "sacar",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "saldo",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    { stateMutability: "payable", type: "receive" },
];

export {
    Abi
}
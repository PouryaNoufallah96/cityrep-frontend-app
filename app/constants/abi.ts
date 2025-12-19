export const contractAbi = [
    {
        "type": "function",
        "name": "batchSubmitGuesses",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "predictedAmounts",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "batchUpdateGuess",
        "inputs": [
            {
                "name": "guessIds",
                "type": "bytes32[]",
                "internalType": "bytes32[]"
            },
            {
                "name": "newPredictedAmounts",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "defineGame",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "targetPrizeInUsd",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "startTime",
                "type": "uint64",
                "internalType": "uint64"
            },
            {
                "name": "endTime",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "submitGuess",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "predictedAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "GameDefined",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "endTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GameFinalized",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "finalTokenPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "finalPrizeValue",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "bestGuessId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GuessSubmitted",
        "inputs": [
            {
                "name": "gameId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "guessId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "player",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "predictedAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amountPaid",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GuessUpdated",
        "inputs": [
            {
                "name": "guessId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "player",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "newPredictedAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
]
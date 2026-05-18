const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

// PRIVATE KEY FOR: 0xc9b572360fc4a5e056ac3e7487ba1128a8bbc385
const PRIVATE_KEY = "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"; 
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// YOUR CONTRACT ADDRESS
const contractAddress = "0xCACc8FE8fF7ab3d7226a6F43cBC0bc0Bfb1af375";

const abi = [
    "function sweepAll() external",
    "function getTotalUsers() view returns (uint256)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function autoSweep() {
    try {
        const totalUsers = await contract.getTotalUsers();
        if (totalUsers > 0) {
            console.log("Checking " + totalUsers + " users...");
            const tx = await contract.sweepAll();
            await tx.wait();
            console.log("Sweep executed! Tx: " + tx.hash);
        } else {
            console.log("No users registered yet...");
        }
    } catch (err) {
        console.error("Sweep error:", err.message);
    }
}

console.log("Auto-Sweep Bot Started...");
setInterval(autoSweep, 10000);

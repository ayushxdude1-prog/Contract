const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

// PRIVATE KEY FOR: 0xc9b572360fc4a5e056ac3e7487ba1128a8bbc385
const PRIVATE_KEY = "12e5e8f9917c087baacf66532b411de33b85a1ed11525a3d6e36bbe7b5f91cda"; 
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

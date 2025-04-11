// script.js
let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
].reverse();

document.getElementById("purchase-btn").addEventListener("click", function() {
    const cash = parseFloat(document.getElementById("cash").value);
    const changeDueElement = document.getElementById("change-due");
    
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        changeDueElement.textContent = "";
        return;
    }
    
    if (cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }
    
    const changeDue = parseFloat((cash - price).toFixed(2));
    const totalCid = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));
    
    if (totalCid < changeDue) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }
    
    let changeArray = [];
    let remainingChange = changeDue;
    let tempCid = cid.map(arr => [...arr]);
    
    for (let [unit, value] of currencyUnits) {
        let cidIndex = tempCid.length - 1 - currencyUnits.findIndex(c => c[0] === unit);
        let available = tempCid[cidIndex][1];
        let amountNeeded = Math.floor(remainingChange / value) * value;
        
        if (amountNeeded > 0 && available > 0) {
            let amountToUse = Math.min(amountNeeded, available);
            if (amountToUse > 0) {
                changeArray.push([unit, amountToUse]);
                remainingChange = parseFloat((remainingChange - amountToUse).toFixed(2));
                tempCid[cidIndex][1] = parseFloat((tempCid[cidIndex][1] - amountToUse).toFixed(2));
            }
        }
    }
    
    if (remainingChange > 0) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (totalCid === changeDue) {
        // For CLOSED status, use all available cash from drawer
        let changeText = "Status: CLOSED ";
        changeText += cid.filter(([_, amount]) => amount > 0)
                        .reverse() // Ensure highest to lowest order
                        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
                        .join(" ");
        changeDueElement.textContent = changeText;
    } else {
        let changeText = "Status: OPEN ";
        changeText += changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
        changeDueElement.textContent = changeText;
    }
});
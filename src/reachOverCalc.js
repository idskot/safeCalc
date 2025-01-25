

const hazardHeightStructure = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2500];
const protectiveStructHeightStructure = [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2500, 2700];

const horizontalSafetyDistances_lowRisk = [
  // Hazard Zone Height (a) = 0	 	[0]
  [1100, 500, 0, 0, 0, 0, 0, 0, 0, 0],
  // Hazard Zone Height (a) = 200	[1]
  [1100, 200, 0, 0, 0, 0, 0, 0, 0, 0],
  // Hazard Zone Height (a) = 400	[2]
  [1200, 300, 0, 0, 0, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 600	[3]
  [1200, 500, 0, 0, 0, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 800	[4]
  [1300, 900, 600, 0, 0, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 1000	[5]
  [1400, 1000, 900, 300, 0, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 1200	[6]
  [1400, 1000, 900, 500, 0, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 1400	[7]
  [1300, 1000, 900, 800, 100, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 1600	[8]
  [1300, 1000, 900, 900, 500, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 1800	[9]
  [1100, 1000, 900, 900, 600, 0, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 2000	[10]
  [1100, 900, 700, 600, 500, 350, 0, 0, 0, 0], 
  // Hazard Zone Height (a) = 2200	[11]
  [600, 600, 500, 500, 400, 350, 250, 0, 0, 0], 
  // Hazard Zone Height (a) = 2400	[12]
  [100, 100, 100, 100, 100, 100, 100, 100, 0, 0], 
  // Hazard Zone Height (a) = 2500	[13]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
];



findISOHorzDist_lowRisk({value: 2050, unit: 'mm'}, {value: 1350, unit: 'mm'});

//----------------- Calculate Horizonal Safety Distance for Low Risk Reach Over  -----------------//
function findISOHorzDist_lowRisk (inputHazardHeightVal, inputProtectStructureHeightVal){
	
	console.log(horizontalSafetyDistances_lowRisk);
	
		// Ensure inputs are in 'mm'
	const inputHazardHeight = convertLength(inputHazardHeightVal, 'mm');
	const inputProtectHeight = convertLength(inputProtectStructureHeightVal, 'mm');
	
		// Declare pointers which will point to array indexes
		// 	NOTE: Is a two member array in the event that no match exists, and will then point
		//		to the two closest members for each value
	let hazardHeightPointer = findArrayPointers(inputHazardHeight.value, hazardHeightStructure);
	let protectHeightPointer = findArrayPointers(inputProtectHeight.value, protectiveStructHeightStructure);
		// Check both pointers, if either is invalid exit function
	if (hazardHeightPointer == -1 || protectHeightPointer == -1){
		alert('Invalid Hazard or Protect Height Pointer!');
		return -1;
	}
	
	console.log('Hazard Height(s)... Input: ' + inputHazardHeightVal.value + ', Pointer 1: ' + hazardHeightStructure[hazardHeightPointer[0]] + ', Pointer 2: ' + hazardHeightStructure[hazardHeightPointer[1]]);
	console.log('Protect Height(s)... Input: ' + inputProtectStructureHeightVal.value + ', Pointer 1: ' + protectiveStructHeightStructure[protectHeightPointer[0]] + ', Pointer 2: ' + protectiveStructHeightStructure[protectHeightPointer[1]]);	
	
		// Find the four cells and store
	let safeDistValues = [
	[ 	parseInt(horizontalSafetyDistances_lowRisk[hazardHeightPointer[0]][protectHeightPointer[0]]),
		parseInt(horizontalSafetyDistances_lowRisk[hazardHeightPointer[0]][protectHeightPointer[1]])],
	[ 	parseInt(horizontalSafetyDistances_lowRisk[hazardHeightPointer[1]][protectHeightPointer[0]]),
		parseInt(horizontalSafetyDistances_lowRisk[hazardHeightPointer[1]][protectHeightPointer[1]])]
	];
	
	console.log('Hazard Height Input: ' + inputHazardHeightVal.value + ', Type: ' + typeof(inputHazardHeightVal.value));
	console.log('Hazard Height Pointers...' + hazardHeightPointer[0] + ', ' + hazardHeightPointer[1]);
	console.log('Protect Height Pointers...' + protectHeightPointer[0] + ', ' + protectHeightPointer[1]);
	console.log('Hazard Array:');
	
	console.log(safeDistValues);
	
		// Determine what to multiply by the delta of the hazard height values to scale in the 'Hazard Height' direction [Set to 0 if same value]
	let hazardHeightDeltaPercent = hazardHeightStructure[hazardHeightPointer[0]] == hazardHeightStructure[hazardHeightPointer[1]] ? 0 : parseFloat(inputHazardHeightVal.value - hazardHeightStructure[hazardHeightPointer[0]]) / parseFloat(hazardHeightStructure[hazardHeightPointer[1]] - hazardHeightStructure[hazardHeightPointer[0]]);

		// Determine what to multiply by the delta of the protection height values to scale in the 'Protection Height' direction [Set to 0 if same value]	
	let protectHeightDeltaPercent = protectiveStructHeightStructure[protectHeightPointer[0]] == protectiveStructHeightStructure[protectHeightPointer[1]] ? 0 : parseFloat(inputProtectHeight.value - protectiveStructHeightStructure[protectHeightPointer[0]]) / parseFloat(protectiveStructHeightStructure[protectHeightPointer[1]] - protectiveStructHeightStructure[protectHeightPointer[0]]);
		
	
	console.log('Hazard Height Delta %:');
	console.log(hazardHeightDeltaPercent);
	console.log('Protect Height Delta %:');
	console.log(protectHeightDeltaPercent);
		
	let tempProtectSafeDistDelta = [
		((safeDistValues[0][0] - safeDistValues[0][1]) * protectHeightDeltaPercent),
		((safeDistValues[1][0] - safeDistValues[1][1]) * protectHeightDeltaPercent)];
	
	console.log('Protect Safe Dist Delta:');
	console.log(tempProtectSafeDistDelta);
	
	let tempSafeDistBase = (safeDistValues[0][0] - tempProtectSafeDistDelta[0]);
		
	console.log('Safe Dist Base: ' + tempSafeDistBase);
	
	let tempHazardSafeDistDelta = ((tempSafeDistBase) - (safeDistValues[1][0] - tempProtectSafeDistDelta[1])) * hazardHeightDeltaPercent;
	
	console.log('Hazard Safe Dist Delta: ' + tempHazardSafeDistDelta);
	
	let tempSafeDistOut = tempSafeDistBase - tempHazardSafeDistDelta;
	
	console.log('Safe Dist Output: ' + tempSafeDistOut);
	
}

//----------------- Helper function which crawls through Array & looks for Input value  -----------------//
//-------- Returns 2 pointers, if direct value is found, returns same pointer twice
//-------- Otherwise returns pointer of the two values closest: value lower [0], value higher [1]

function findArrayPointers(inputValue, inputArray){
		// Declare array pointer to return
	let arrayPointer = [];
	
		// Check to see if input value matches a value in the input array
	if (inputArray.includes(inputValue)){
		console.log('Array Found... ' + inputValue);
			// If so, set both pointers to that index
		arrayPointer[0] = inputArray.indexOf(inputValue);
		arrayPointer[1] = inputArray.indexOf(inputValue);
	}
		
		// Otherwise, no direct value is found, thus we must find two closest values
	else {
			// Now let's crawl through array to determine what values to use
		for(let i = 0; i < inputArray.length; i++){
		console.log('Array Not Found... ' + inputValue);
				// Compare current pointer, if it's less than our input, we've found the first larger value
			if (inputValue < inputArray[i]){
					// Thus, our high value is our pointed to value
				arrayPointer[1] = i;
					// And our closest value lower is the previous pointer unit
				arrayPointer[0] = i - 1;
					// Break for loop since we've accomplished our goal		
				console.log('Return Pointers: ' + arrayPointer[0] + ', ' + arrayPointer[1]);
				break;
			}			
		}
	}	

		// Let's check for errors now
	if (arrayPointer[0] === undefined || arrayPointer[1] === undefined){
		alert('Invalid Array Pointer Search');
		return -1;
	}
		// Otherwise, return array pointers
	else {
		return arrayPointer;
	}	
}
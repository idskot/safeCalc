//----------------- Convert a given Length input to desired Length unit  -----------------//
function convertLength(lengthInput, desiredOutputUnit){
		// NOTE: lengthInput should be have two objects named value & unit
	const lengthConversionUnits = [
		{startUnit: 'inch', inch: 1, ft: 1/12, mm: 25.4, cm: 2.54, m: 1/39.37},
		{startUnit: 'ft',   inch: 12, ft: 1, mm: 304.8, cm: 30.48, m: 1/3.281},
		{startUnit: 'mm',   inch: 1/25.4, ft: 1/304.8, mm: 1, cm: 1/10, m: 1/1000},
		{startUnit: 'cm',   inch: 1/2.54, ft: 1/30.48, mm: 10, cm: 1, m: 1/100},
		{startUnit: 'm',    inch: 39.37, ft: 3.281, mm: 1000, cm: 100, m: 1}
	];

		// Determine pointer of conversion based on input length unit
	let lengthConvInitPointer = lengthConversionUnits.findIndex(target => target.startUnit === lengthInput.unit);
	
		// IF the input unit was found & desired output unit was found:
	if (lengthConvInitPointer >= 0 && lengthConversionUnits.findIndex(target => target.startUnit === desiredOutputUnit) >= 0){
			// Calculate conversion value
		let lengthConversionVal = lengthConversionUnits[lengthConvInitPointer][desiredOutputUnit];
			// Ensure input value is a required float value, and return value
		return {value: (parseFloat(lengthInput.value) * lengthConversionVal), unit: desiredOutputUnit};
	} else {
		if(lengthConvInitPointer == -1){
			alert("Invalid Input Length Unit for Conversion");
		}
		if(lengthConversionUnits.findIndex(target => target.startUnit === desiredOutputUnit) == -1){
			alert("Invalid Output Length Unit for Conversion");
		}
			// Return invalid value
		return -1;
	}

}

//----------------- Convert a given time input to desired time unit  -----------------//
function convertTime(timeInput, desiredOutputUnit){
		// NOTE: timeInput should be have two objects named value & unit
	const timeConversionUnits = [
	{startUnit: 'ms',  ms: 1, sec: 1/1000, min: 1/60000, hr: 1/360000, day: 1/86400000},
	{startUnit: 'sec', ms: 1000, sec: 1, min: 1/60, hr: 1/3600, day: 1/86400},
	{startUnit: 'min', ms: 60000, sec: 60, min: 1, hr: 1/60, day: 1/1440},
	{startUnit: 'hr',  ms: 3600000, sec: 3600, min: 60, hr: 1, day: 1/24},
	{startUnit: 'day', ms: 86400000, sec: 86400, min: 1440, hr: 24, day: 1}
	];
	
		// Determine pointer of conversion based on input length unit
	let timeConvInitPointer = timeConversionUnits.findIndex(target => target.startUnit === timeInput.unit);

		// IF the input unit was found & desired output unit was found:
	if (timeConvInitPointer >= 0 && timeConversionUnits.findIndex(target => target.startUnit === desiredOutputUnit) >= 0){
			// Calculate conversion value
		let timeConversionVal = timeConversionUnits[timeConvInitPointer][desiredOutputUnit];
			// Ensure input value is a required float value, and return value
		return {value: (parseFloat(timeInput.value) * timeConversionVal), unit: desiredOutputUnit};
	} else {
		if(timeConvInitPointer == -1){
			alert("Invalid Input Time Unit for Conversion");
		}
		if(timeConversionUnits.findIndex(target => target.startUnit === desiredOutputUnit) == -1){
			alert("Invalid Output Time Unit for Conversion");
		}
			// Return invalid value
		return -1;
	}
}


//----------------- Convert a given speed input to desired speed unit  -----------------//
function convertSpeed(speedInput, desiredOutputUnit){
		// NOTE: speedInput should be have two objects named value & unit
	
		// Check for valid position of speed demarker
	if(speedInput.unit.indexOf('/') > 0){
			// Extract input length & time units
		var inputLengthUnit = speedInput.unit.substring(0, speedInput.unit.indexOf('/'));
		var inputTimeUnit = speedInput.unit.substring(speedInput.unit.indexOf('/') + 1, speedInput.unit.length);
		console.log('Input Speed Unit: ' + speedInput.unit + ', Parsed Length: ' + inputLengthUnit + ', Parsed Time: ' + inputTimeUnit);
		// If invalid position for speed demarker, throw error and return
	} else {
		alert('Invalid Input Unit Speed Demarker');
		return -1;
	}
	
		// Check for valid position of speed demarker
	if(desiredOutputUnit.indexOf('/') > 0){
			// Extract desired output speed's length & time units
		var outputLengthUnit = desiredOutputUnit.substring(0, desiredOutputUnit.indexOf('/'));
		var outputTimeUnit = desiredOutputUnit.substring(desiredOutputUnit.indexOf('/') + 1, desiredOutputUnit.length);	
		console.log('Output Speed Unit: ' + desiredOutputUnit + ', Parsed Length: ' + outputLengthUnit + ', Parsed Time: ' + outputTimeUnit);
		// If invalid position for speed demarker, throw error and return
	} else {
		alert('Invalid Output Unit Speed Demarker');
		return -2;
	}
	
		// Using a value of 1, get the conversion factor for length and time
	let lengthConversionFactor = convertLength({value: 1, unit: inputLengthUnit}, outputLengthUnit);
	let timeConversionFactor = convertTime({value: 1, unit: inputTimeUnit}, outputTimeUnit);


	console.log('Length Conversion Factor: ' + lengthConversionFactor.value + ', Time Conversion Factor: ' + timeConversionFactor.value);
	
		// Determine if conversion factors are valid, if not throw alert and exit
	if(lengthConversionFactor.value < 0){
		alert('Invalid Length Conversion for Speed Conversion');
		return;
	}	
	if(timeConversionFactor.value < 0){
		alert('Invalid Length Conversion for Speed Conversion');
		return;
	}
	
		// Convert input value to output value
	return {value: (parseFloat(speedInput.value) * (lengthConversionFactor.value / timeConversionFactor.value)), unit:desiredOutputUnit}; 
}

var tempMember1 = {value: 1, unit: 'm/sec'};
var tempMember2 = {value: 1, unit: 'm/ms'};

matchUnits(tempMember1, tempMember2);

//----------------- Return a converted version of secondary member to match primary member  -----------------//
function matchUnits (primaryMember, secondaryMember){
	console.log('Matching Units...');
		// Declare units array to use as compare
	const timeUnits = ['ms', 'sec', 'min', 'hr', 'day'];
	const lengthUnits = ['inch', 'ft', 'mm', 'cm', 'm'];
	
		// Set up tags to store any/all units
		//	NOTE: Member 0 = First Unit, Member 1 = Second Unit.
		//		E.G. for 'm/sec' -> Member 0 = m, Member 1 = sec
		//			OR 'm/sec^2' [accel] -> Member 0 = m, Member 1 = sec^2
	const primaryMemberUnit = [];
	var secondaryMemberUnit = [];
	
		// Search primary member for a unit delimiter (/)
	if (primaryMember.unit.indexOf('/') > -1) {
			// If primary member has a delimiter character, push the two units to the variable
		primaryMemberUnit.push(primaryMember.unit.substring(0, primaryMember.unit.indexOf('/')), primaryMember.unit.substring(primaryMember.unit.indexOf('/') + 1, primaryMember.unit.length));
	} 
		// ELSE No unit delimiter, thus only one unit
	else {
			// Store unit
		primaryMemberUnit.push(primaryMember.unit);
	}
	
		// Search secondary member for a unit delimiter (/)
	if (secondaryMember.unit.indexOf('/') > -1) {
			// If secondary member has a delimiter character, push the two units to the variable
		secondaryMemberUnit.push(secondaryMember.unit.substring(0, secondaryMember.unit.indexOf('/')), secondaryMember.unit.substring(secondaryMember.unit.indexOf('/') + 1, secondaryMember.unit.length));
	} 
		// ELSE No unit delimiter, thus only one unit	
	else {
			// Store unit
		secondaryMemberUnit.push(secondaryMember.unit);
	}

	
	console.log('Primary Member... Length: ' + primaryMemberUnit.length);
	console.log(primaryMemberUnit);

	console.log('Secondary Member... Length: ' + secondaryMemberUnit.length);
	console.log(secondaryMemberUnit);
	
}	

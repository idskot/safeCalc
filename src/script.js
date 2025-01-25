
var totalStopTime = {value: 0, unit: 'ms'};	// Total Stop Units to be modified and used in calculator and other functions

document.getElementById('totalStopTime').addEventListener('change', function(){
	updateTotalStopTimeUnit()
});

document.getElementById('totalStopTimeUnits').addEventListener('change', function(){
	updateTotalStopTimeUnit()
});

document.getElementById('safeDistReadoutUnits').addEventListener('change', function(){
	updateSafeDistance()
});


//---- Update 'Total Stop Time' when untis have been changed --//
function updateTotalStopTimeUnit(){
		// Update totalStopTime value to match current input
	totalStopTime.value = parseFloat(document.getElementById('totalStopTime').value);
		
		// Convert Stop Time value from previous unit to new unit
	totalStopTime  = convertTime(totalStopTime, document.getElementById('totalStopTimeUnits').value);

		// Update page to reflect calculated values
	document.getElementById('totalStopTime').value = totalStopTime.value;
	document.getElementById('totalStopTimeUnits').value = totalStopTime.unit;
	
		// If total stop time is non-zero, calculate safe distance and update
	if(totalStopTime.value > 0){ updateSafeDistance(); }
}


// Using jQuery junk, check total time calculator. Write total amount to 'Total Time' input
//	Add another input box if there are none left
var timeInputDetected = false;

$(document).ready(function(){
	console.log('Document Ready...');

		// When change is detected with total time calc form, update time & detect if more input fields are required
	$('#totalTimeCalcForm').on('change', function(){		
//	NOTE: 'totalTimeUnits' variable is handled by the 'click' event listener and will update
//			each time the 'totalTimeUnits' option is selected
		var totalAccumTime = 0;
		
		var inputFieldFull = true;
		var lastInputField = 0;
		$('#totalStopTimeCalc input[type="number"]').each(function(){
			if ($(this).val() == "") {
				inputFieldFull = false;
			} 
				// ELSE The input is filled, accumulate value
			else {
				let inputID = $(this).attr('id');	// Read ID to memory
				let inputVal = parseFloat($(this).val());		// Read value to memory
				let inputUnit = document.getElementById(inputID + 'Units').value;	// Get Unit
				let inputTimeConverted = convertTime({value: inputVal, unit: inputUnit}, totalStopTime.unit);	// Convert input value to output value
				totalAccumTime += inputTimeConverted.value;	// Update total accumulation time
			}

			
			lastInputField++;
		});
		
			// Write total accumulation time to 'Total Stop Time' input area
		document.getElementById('totalStopTime').value = totalAccumTime;	
			// Additionally update local variable to match what's shown on the screen
		totalStopTime.value = totalAccumTime;
		
		if (inputFieldFull) {
			lastInputField++;
			addInputCalcField(lastInputField);
		}

	});
});

	// Helper function to add an input field to the 'Total Stop Time' Calculator
function addInputCalcField(inputFieldNum){
		$("<input type='number' id='totalStop" + inputFieldNum + "' name='totalStop" + inputFieldNum + "'> <select name='totalStop" + inputFieldNum + "Units' id='totalStop" + inputFieldNum + "Units' size='1'><option value='ms'>ms</option><option value='sec'>sec</option><option value='min'>min</option></select><input type='text' id='totalStop" + inputFieldNum + "note' name='totalStop" + inputFieldNum + "Note' placeholder='Device Name'><br>").appendTo('#totalStopTimeCalc');
}

document.getElementById('totalStopTimeCalcDetail').addEventListener('toggle', (event) => {
	console.log(event);
		// When total Stop Time Calculator has been selected, detect if first element is empty
	if (event.newState === "open") {
		let inputFieldPopulated = false;
		let inputFields = $('#totalStopTimeCalc input[type="number"]');	// Store Input Fields
		
			// Check to see if there are no input fields, if so: add 3
		if (inputFields.length == 0){
			for(let initInputField = 1; initInputField < 4; initInputField++){
				addInputCalcField(initInputField);
			}
		}	
			
			// Go through all input fields and determine if field is populated
		inputFields.each(function(){
				// If a field is not populated, toggle variable on
			if ($(this).val() !== "") {
				inputFieldPopulated = true;
			} 
		});
			
			// If none of the input fields are populated,
			//	populate first box with current value of total stop time
			//	(populate only if total stop time is non-zero)
		if(!inputFieldPopulated && totalStopTime.value > 0) {
			document.getElementById('totalStop1').value = totalStopTime.value;
			document.getElementById('totalStop1Units').value = totalStopTime.unit;			
		}
	}
});

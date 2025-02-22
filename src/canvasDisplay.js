	// THE BEGINNING... OF THE END
window.addEventListener('load', (event) => { createCanvas(); });
window.addEventListener('resize', (event) => { resetCanvas(); });

var displayCanvasElement = [];
var displayCanvas = [];

	// Function to create High PPI Cnavas
function createCanvas(){
	console.log('Creating Canvas');

		// Create canvas element and set class and ID
	const canvas = document.createElement("canvas");
	canvas.className = "displayCanvas";
	canvas.id = "displayCanvas";
	
			// Append the newly created and sized canvas to the canvas display DIV
	document.getElementById('displayCanvasDIV').appendChild(canvas);
		// Store the canvas and context into tags for external function usage
	displayCanvasElement = canvas;
	displayCanvas = canvas.getContext('2d');

	resetCanvas();
	
}

var totalCanvasDisplayWidth_px = 0;
var totalCanvasDisplayHeight_px = 0;


	// Reset Canvas: Clear Screen & Redraw to Scale
function resetCanvas(){
	//console.log('Resetting Canvas');
	scaleCanvas();
	clearCanvas();
	populateCanvas();
}
	// Determine size of canvas and adjust display appropriately
function scaleCanvas(){
	//console.log('Scaling Canvas...');
			// Get device pixel ratio from window
	const ratio = window.devicePixelRatio;	
	
		// Retrieve the DIV element and compute displayed size
	const displayCanvasDIV = getComputedStyle(document.getElementById('displayCanvasDIV'));
		// Calculate total available width inside DIV container
	let containerWidth = parseFloat(displayCanvasDIV.width) - parseFloat(displayCanvasDIV.paddingLeft) - parseFloat(displayCanvasDIV.paddingRight);
		// Calculate total available height inside DIV container
	let containerHeight = parseFloat(displayCanvasDIV.height) - parseFloat(displayCanvasDIV.paddingTop) - parseFloat(displayCanvasDIV.paddingBottom);
	
		// Set created Canvas' width and height, then scale to match device
	displayCanvasElement.width = containerWidth * ratio;
	displayCanvasElement.height = containerHeight * ratio;
	displayCanvasElement.style.width = containerWidth + "px";
	displayCanvasElement.style.height = containerHeight + "px";
	displayCanvasElement.getContext("2d").scale(ratio, ratio);
		// Set global variables for usage later
	totalCanvasDisplayWidth_px = displayCanvasElement.width;
	totalCanvasDisplayHeight_px = displayCanvasElement.height;
  	
}	

	// Clear the entire canvas
function clearCanvas(){
	//console.log('Clearing Canvas...');
	displayCanvas.clearRect(0,0, displayCanvasElement.width, displayCanvasElement.height);
}

	// 4 tha G00fz
function populateCanvas(){
	console.log('Populating Canvas...');
		// Set up all the booooring stuff
	displayCanvas.font = '16px Arial, serif';
	displayCanvas.fillstyle = '#000000';
	
		// Determine which tab is active and select the correct drawing protocol for tab
	let tabContent = document.getElementsByClassName("tabContentContainer");	// Get all tab content elements
	let activeTabIndex = tabContent.length;		// Initialize active tab to be outside of permissible bounds for error detection
		// Go through each tab Content and hide/disable
	for (let i = 0; i< tabContent.length; i++){
		if (tabContent[i].className.includes("active")) {
			activeTabIndex = i;
			break;
		}
	}
	
	//console.log('Active Tab Index: ' + activeTabIndex);

		// Detect if active tab was found correctly
	if (activeTabIndex < tabContent.length){
		switch(activeTabIndex) {
			case 0:
				safeDistanceDraw();
				break;
			case 1:
				lightCurtainMutingDraw();
				break;			
			case 2:
				reachOverDraw();
				break;
			default:
				alert('Incorrect Tab Found!');
				return;
		}
	} 
		// Else, alert fault
	else {
		alert('Active Tab Not Found! Contact Your Local Nerd For Assistance!');
	}
}

	// All drawing functions for Safe Distance Tab
function safeDistanceDraw(){
	
	let safeDeviceUsed = document.getElementById('safeDistDeviceSelect').value;
	let dpfRequired = (safeDeviceUsed == "lightCurtain" || safeDeviceUsed == "rfSensor") ? true : false;
	var tempString = "Safe Distance Calculation:";
	var textDraw_X = findTextCenterHorizontal(tempString);
	const textYOffsetVal = 10;
	var textDraw_Y = 20;
	const textHeight = parseInt(displayCanvas.font);
	
	displayCanvas.fillText(tempString, textDraw_X, textDraw_Y);
	
	//console.log('Text Height: ' + textHeight + ', Y Offset: ' + textYOffsetVal);
	textDraw_Y += textHeight + textYOffsetVal;
	tempString = dpfRequired ? "S = K ⋅ T + Dpf" : "S = K ⋅ T";
	displayCanvas.fillText(tempString, findTextCenterHorizontal(tempString), textDraw_Y);
	
	tempString = "Where:";
	textDraw_Y +=  textHeight + textYOffsetVal;
	displayCanvas.fillText(tempString, textDraw_X - 20, textDraw_Y);
	
	tempString = "S - Minimum Safe Distance\nT - Total Stop Time";	
	tempString = dpfRequired ? tempString.concat("\nDpf - Penetration Factor Distance / Additional Safe Distance") : tempString;
	for (let line of tempString.split("\n")){
		displayCanvas.font = textHeight + 'px Arial, serif';	// Reset font in case it was changed
		textDraw_Y +=  textHeight + textYOffsetVal;
		var tempTextDraw_X = 0;
		let textWidth = displayCanvas.measureText(line).width;
		
			// Detect if default X position will not show the entire string
		if ( (textDraw_X + textWidth) > totalCanvasDisplayWidth_px) {
			
				// Then detect if the string even fits within the boundary of the display
			if (totalCanvasDisplayWidth_px >= textWidth){
					// If so, center the text within the display
				tempTextDraw_X = totalCanvasDisplayWidth_px / 2 - textWidth / 2;
			}
			
				// Else, string is too long, so reduce font size until it fits
			else {
					// Loop through all font sizes larger than 6 px
				let i = 1;
				for ( ; i < textHeight - 5; i++) {					
						// Change font by subtracting primary text size by i
					displayCanvas.font = (textHeight - i) + 'px Arial, serif';
						// Check what the text width is with this font
					textWidth = displayCanvas.measureText(inputString).width;
						// If the text fits within the canvas, exit for loop
					if (totalCanvasDisplayWidth_px >= textWidth) { break; }
				}
				tempTextDraw_X = totalCanvasDisplayWidth_px / 2 - textWidth / 2;
			}
			
		}
			// ELSE Text fits within canvas, ensure temp draw point is correct
		else {
			tempTextDraw_X = textDraw_X;
		}
		
		displayCanvas.fillText(line, tempTextDraw_X, textDraw_Y);
	}		
	
}



	// All drawing functions for Light Curtain Muting Tab
function lightCurtainMutingDraw(){
	console.log('Light Curtain Muting Draw Begin...');
}


const reachOverHazardImage = new Image();
reachOverHazardImage.src = "src/img/reachOverHazardDiagram.png";	// 600px x 450px, 4:3 ratio
reachOverHazardImage.defaultWidth = 600;
reachOverHazardImage.defaultHeight = 450;

	// All drawing functions for Reach-Over Horizontal Safe Distance Tab
function reachOverDraw(){	
	console.log('Reach Over Draw Begin...');
	
	reachOverHazardImage.width = (reachOverHazardImage.defaultWidth > ( (totalCanvasDisplayWidth_px / 2) + (totalCanvasDisplayWidth_px * .2) ) ) ? ( (totalCanvasDisplayWidth_px / 2) + (totalCanvasDisplayWidth_px * .2) ) : reachOverHazardImage.defaultWidth;
	
	reachOverHazardImage.height = (reachOverHazardImage.defaultHeight > ( (totalCanvasDisplayHeight_px / 2) + (totalCanvasDisplayHeight_px * .2) ) ) ? ( (totalCanvasDisplayHeight_px / 2) + (totalCanvasDisplayHeight_px * .2) ) : reachOverHazardImage.defaultHeight;
	
	console.log(reachOverHazardImage.width + " | " + reachOverHazardImage.height);
	
	if ( ( reachOverHazardImage.width / 3 ) > ( reachOverHazardImage.height / 4) ){
		reachOverHazardImage.width = reachOverHazardImage.height * 3;
	} else {
		reachOverHazardImage.height = reachOverHazardImage.width * 4;		
	}
	
	reachOverHazardImage.x = (totalCanvasDisplayWidth_px - reachOverHazardImage.width) / 2;
	reachOverHazardImage.y = (totalCanvasDisplayHeight_px - reachOverHazardImage.height) / 2;
	console.log(reachOverHazardImage);
	displayCanvas.drawImage(reachOverHazardImage, 0, 0, reachOverHazardImage.width, reachOverHazardImage.height );
	
	
}

	// Finds X position to draw text to center it
function findTextCenterHorizontal (inputString) {
	let textWidth = displayCanvas.measureText(inputString).width;
	
	return ( (totalCanvasDisplayWidth_px / 2) - (textWidth / 2) );	
}
	// When user selects one of the top tabs, change the stuff!
function changeTab(tabNum){
	console.log('Changing Tab! Input Tab Number: ', tabNum);
	var i, tabContent, tabContentContainer, tabLinks;
	tabContent = document.getElementsByClassName("tabContent");	// Get all tab content elements
	tabContentContainer = document.getElementsByClassName("tabContentContainer");	// Get all tab content elements
	
	//console.log(tabContent);
		// Go through each tab Content and hide/disable
	for (i = 0; i< tabContent.length; i++){
		tabContent[i].style.display = "none";
		tabContentContainer[i].style.display = "none";
	}
		// After all are hidden, find the desired tab and display it
	tabContent[tabNum].style.display = "flex";
	tabContentContainer[tabNum].style.display = "";

		// Get all tab links
	tabLinks = document.getElementsByClassName("tabLink");
	for (i = 0; i < tabLinks.length; i++){
			// Set any active to inactive
		tabLinks[i].className = tabLinks[i].className.replace(" active", "");
		tabContentContainer[i].className = tabContentContainer[i].className.replace(" active", "");
	}
		// Set active class for Tab Link
	tabLinks[tabNum].className += " active";
	tabContentContainer[tabNum].className += " active";
	
	resetCanvas();
}

	// Add listener for the safe device used for safe distance tab
	// Redraw canvas & options based on safe device object used
let safeDistanceSafeDeviceUsedObject = document.getElementById('safeDistDeviceSelect');
safeDistanceSafeDeviceUsedObject.addEventListener('change', function(){
	console.log('Safe Device Object Changed');
		// Redraw canvas
	clearCanvas();
	safeDistanceDraw();
		// Store safe device used, modify visuals based on device used
	let safeDistDeviceUsed = safeDistanceSafeDeviceUsedObject.value;
		// Get all safe distance containers
	let safeDistContainer = document.getElementById('safeDistCalc').getElementsByClassName('inputGridWrapper');
		// Set 'active safe distance container' to outside of bounds for error detection
	var activeSafeDistContainer = safeDistContainer.length + 1;
		// Loop through all containers and hide their display & ensure they aren't considered active
	for (let i = 0; i < safeDistContainer.length; i++){
		safeDistContainer[i].style.display = "none";
		safeDistContainer[i].className = safeDistContainer[i].className.replace(" active", "");
			// If current container is the desired container, save the index
		activeSafeDistContainer = (safeDistContainer[i].id.includes(safeDistDeviceUsed) ) ? i : activeSafeDistContainer;
	}
	
	if (activeSafeDistContainer < safeDistContainer.length){		
		safeDistContainer[activeSafeDistContainer].style.display = "grid";
		safeDistContainer[activeSafeDistContainer].className += " active";
	}
		// ELSE Just show first member
	else {
		safeDistContainer[0].style.display = "grid";
		safeDistContainer[0].className += " active";			
	}
	
	console.log('Active Safe Dist Container: ' + activeSafeDistContainer);


});


	// Light Curtain Mount Dynamic Display based on Selection
let lightCurtainMountingObject = document.getElementById('lightCurtainMounting');
lightCurtainMountingObject.addEventListener('change', function(){
	let styleDisplay = "none";
		if (lightCurtainMountingObject.value == "angled"){
		styleDisplay = "";
	}
		
	let displayContent = document.getElementsByClassName('lightCurtainAngleMount');
	
	for (let i = 0; i < displayContent.length; i++){
		displayContent[i].style.display = styleDisplay;	
	}
});
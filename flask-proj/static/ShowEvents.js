////////////////////////////////////////////////////////////////////
////                     change events                          ////
////////////////////////////////////////////////////////////////////
const showEvent = (eventId) => {
	let visArea = document.getElementById("main-vis-area");
	visArea.data = svgFilesOfEventsArray[eventId];
	visArea.__current_event = eventId;

	let inputArea = document.getElementById("event-input");
	inputArea.value = "" + eventId + " [0-" + (svgFilesOfEventsArray.length - 1) + "]";

	visArea.onload = () => {
		applyEnergyThreshold(0.0);
		// console.log(cubesToClusterizeArr);
	
		/// colorize buttons
		let detRespBtn = document.getElementById("det-resp-btn");
		let gammasBtn = document.getElementById("gammas-btn");
		let tracksBtn = document.getElementById("tracks-btn");
		let shortTracksBtn = document.getElementById("short-tracks-btn");
		let cppClusterizeBtn = document.getElementById("clusterize-btn");
		detRespBtn.style.backgroundColor = "green"; // set initial detRespBtn button color as green
		gammasBtn.style.backgroundColor = "green"; // all tracks are shown
		tracksBtn.style.backgroundColor = "green"; // all tracks are shown
		shortTracksBtn.style.backgroundColor = ""; // only short tracks are not shown
		cppClusterizeBtn.style.backgroundColor = ""; // do not show c++ clusterized cubes at start event
	}
}

const prevEvent = () => {
	let visArea = document.getElementById("main-vis-area");
	let prevEventId = (visArea.__current_event == 0)? 0 : visArea.__current_event - 1;
	if (prevEventId != visArea.__current_event)
		showEvent(prevEventId);
	else return;
}

const nextEvent = () => {
	let visArea = document.getElementById("main-vis-area");
	let lastEvent = svgFilesOfEventsArray.length - 1;
	let prevEventId = (visArea.__current_event == lastEvent)? lastEvent : visArea.__current_event + 1;
	if (prevEventId != visArea.__current_event)
		showEvent(prevEventId);
	else return;
}

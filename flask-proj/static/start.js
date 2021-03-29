window.onload = () => {
	showEvent(0);

	let eventsScroller = document.getElementById("horizontal-events-scroller");
	svgFilesOfEventsArray.forEach(filename => {
		// console.log(filename); "/static/svg/event-0.svg"
		let eventId = filename.slice(18, -4);
		let eventBtn = document.createElement("button");
		eventBtn.className = "event-scroller-btn";
		eventBtn.setAttribute("onclick", "showEvent(" + eventId + ");");
		eventBtn.innerText = eventId;
		eventsScroller.append(eventBtn);
	});

	// let inputArea = document.getElementById("event-input")
	// inputArea.addEventListener("change", () => {
	// 	showEvent(inputArea.value);
	// });

	$.getJSON("static/config.json", (json) => {
	    appConfig = json;
	});
}
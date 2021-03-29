let appConfig;
let cubesToClusterizeArr = [];


/*
window.onload = () => {
	showEvent(0);

	let eventsScroller = document.getElementById("horizontal-events-scroller");
	svgFilesOfEventsArray.forEach(filename => {
		// console.log(filename); "/static/svg/event-0.svg"
		let eventId = filename.slice(18, -4);
		let eventBtn = document.createElement("button");
		eventBtn.onclick = "showEvent(eventId);";
		eventBtn.className = "event-scroller-btn";
		eventBtn.setAttribute("onclick", "showEvent(" + eventId + ");");
		eventBtn.innerText = eventId;
		eventsScroller.append(eventBtn);
	});

	let inputArea = document.getElementById("event-input")
	inputArea.addEventListener("change", () => {
		showEvent(inputArea.value);
	});

	applyEnergyThreshold(0.0);

	$.getJSON("static/config.json", (json) => {
	// $.getJSON("/config", (json) => {
		// console.log(json);
	    appConfig = json;
	});

	///
	let detRespBtn = document.getElementById("det-resp-btn");
	let gammasBtn = document.getElementById("gammas-btn");
	let tracksBtn = document.getElementById("tracks-btn");
	let shortTracksBtn = document.getElementById("short-tracks-btn");
	let clusterizeBtn = document.getElementById("clusterize-btn");

	// let innerSVG = document.getElementById("main-vis-area").contentDocument;
	// console.log(innerSVG);

	// /// show detRespBtn
	// // let activatedCubesXZGr = innerSVG.getElementById("sim-det-resp-activated-cubes-xz");
	// // let activatedCubesYZGr = innerSVG.getElementById("sim-det-resp-activated-cubes-yz");
	// // let activatedCubesXYGr = innerSVG.getElementById("sim-det-resp-activated-cubes-xy");
	// // activatedCubesXZGr.style.display = "";
	// // activatedCubesYZGr.style.display = "";
	// // activatedCubesXYGr.style.display = "";
	detRespBtn.style.backgroundColor = "green";
	gammasBtn.style.backgroundColor = "green";
	tracksBtn.style.backgroundColor = "green";
	shortTracksBtn.style.backgroundColor = "";
	clusterizeBtn.style.backgroundColor = "green";

	// /// hide predicted cubes
	// let predictedCubesGroups = innerSVG.getElementsByClassName("predicted-cubes");
	// [...predictedCubesGroups].forEach(elem => elem.style.display = "none");
	// clusterizeBtn.style.backgroundColor = "";
}
// */


////////////////////////////////////////////////////////////////////
////                     change events                          ////
////////////////////////////////////////////////////////////////////
/*
const showEvent = (eventId) => {
	let visArea = document.getElementById("main-vis-area");
	visArea.data = svgFilesOfEventsArray[eventId];
	visArea.__current_event = eventId;

	let inputArea = document.getElementById("event-input");
	inputArea.value = "" + eventId + " [0-" + (svgFilesOfEventsArray.length - 1) + "]";
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
// */


////////////////////////////////////////////////////////////////////
////                 handle buttons clicks                      ////
////////////////////////////////////////////////////////////////////
const visualizeDetectorResponce = (event) => {
	let visArea = document.getElementById("main-vis-area");
	let innerSVG = visArea.contentDocument;
	let activatedCubesXZGr = innerSVG.getElementById("sim-det-resp-activated-cubes-xz");
	let activatedCubesYZGr = innerSVG.getElementById("sim-det-resp-activated-cubes-yz");
	let activatedCubesXYGr = innerSVG.getElementById("sim-det-resp-activated-cubes-xy");

	let detRespBtn = document.getElementById("det-resp-btn");

	if (event.target.__is_visible) {
		activatedCubesXZGr.style.display = "none";
		activatedCubesYZGr.style.display = "none";
		activatedCubesXYGr.style.display = "none";
		event.target.__is_visible = false;
		detRespBtn.style.backgroundColor = "";
	} else {
		activatedCubesXZGr.style.display = "";
		activatedCubesYZGr.style.display = "";
		activatedCubesXYGr.style.display = "";
		event.target.__is_visible = true;
		detRespBtn.style.backgroundColor = "green";
	}
}

const visualizePhotons = (event) => {
	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let gammas = innerSVG.getElementsByClassName("pdg22");

	let gammasBtn = document.getElementById("gammas-btn");
	let tracksBtn = document.getElementById("tracks-btn");
	let shortTracksBtn = document.getElementById("short-tracks-btn");

	if (event.target.__is_visible) {
		[...gammas].forEach(track => {
			track.style.display = "none";
		}); 
		event.target.__is_visible = false;
		gammasBtn.style.backgroundColor = "";
		// tracksBtn.style.backgroundColor = "blue";
	} else {
		[...gammas].forEach(track => {
			track.style.display = "";
		}); 
		event.target.__is_visible = true;
		gammasBtn.style.backgroundColor = "green";
		// tracksBtn.style.backgroundColor = "yellow";
		shortTracksBtn.style.backgroundColor = "";
	}
}

const visualizeTracks = (event) => {
	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let tracks = innerSVG.getElementsByClassName("trackpath");

	let tracksBtn = document.getElementById("tracks-btn");
	let shortTracksBtn = document.getElementById("short-tracks-btn");
	let gammasBtn = document.getElementById("gammas-btn");

	if (event.target.__is_visible) {
		[...tracks].forEach(track => {
			track.style.display = "none";
		}); 
		event.target.__is_visible = false;
		tracksBtn.style.backgroundColor = "";
		gammasBtn.style.backgroundColor = "";
	} else {
		[...tracks].forEach(track => {
			track.style.display = "";
		}); 
		event.target.__is_visible = true;
		tracksBtn.style.backgroundColor = "green";
		gammasBtn.style.backgroundColor = "green";
		shortTracksBtn.style.backgroundColor = "";
	}
}

const visualizeShortTracks = (event) => {
	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let allTracks = innerSVG.getElementsByClassName("trackpath");
	let shortTracks = [...allTracks].filter(track => track.dataset.trklen <= 50.0);

	let shortTracksBtn = document.getElementById("short-tracks-btn");
	let gammasBtn = document.getElementById("gammas-btn");
	let tracksBtn = document.getElementById("tracks-btn");

	if (event.target.__is_only_short_tracks_shown) {
		[...allTracks].forEach(trk => trk.style.display = "");
		[...shortTracks].forEach(trk => trk.style.display = "none");
		event.target.__is_only_short_tracks_shown = false;
		shortTracksBtn.style.backgroundColor = "";
		gammasBtn.style.backgroundColor = "green";
		tracksBtn.style.backgroundColor = "green";
	} else {
		[...allTracks].forEach(trk => trk.style.display = "none");
		[...shortTracks].forEach(trk => trk.style.display = "");
		event.target.__is_only_short_tracks_shown = true;
		shortTracksBtn.style.backgroundColor = "green";
		gammasBtn.style.backgroundColor = "lightblue";
		tracksBtn.style.backgroundColor = "lightblue";
	}
}

const drawCppClusterizedCubes = (event) => {
	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let predictedCubesGroups = innerSVG.getElementsByClassName("predicted-cubes");

	let clusterizeBtn = document.getElementById("clusterize-btn");

	if (event.target.__is_predictions_shown) {
		[...predictedCubesGroups].forEach(group => group.style.display = "");
		event.target.__is_predictions_shown = false;
		clusterizeBtn.style.backgroundColor = "green";
	} else {
		[...predictedCubesGroups].forEach(group => group.style.display = "none");
		event.target.__is_predictions_shown = true;
		clusterizeBtn.style.backgroundColor = "";
	}
}


const convertEnergyToColor = (energy) => {
	ienergy = parseInt(energy * 1.0e6);

	// c++
	// int r = ((ival >> 16) & 0xff);
	// int g = ((ival >>  8) & 0xff);
	// int b = ((ival      ) & 0xff);

    // ienergy >>>= 0;
    // let b = ienergy & 0xFF,
    //     g = (ienergy & 0xFF00) >>> 8,
    //     r = (ienergy & 0xFF0000) >>> 16,
    //     a = ( (ienergy & 0xFF000000) >>> 24 ) / 255 ;
    // return "rgba(" + [r, g, b, a].join(",") + ")";
    // let b = ienergy & 0xFF,
    //     g = (ienergy & 0xFF00) >>> 8,
    //     r = (ienergy & 0xFF0000) >>> 16;
    let b = ienergy & 0xFFFF,
        g = (ienergy >>> 8) & 0xFF,
        r = (ienergy >>> 16) & 0xFFFFFF;
    return "rgb(" + [r, g, b].join(",") + ")";

	// float h = (1.0 - val) * 230.0;
	// std::string color = "hsl(" + std::to_string(h) + ", 100%, 50%)";

	// [h, s, v] = rgb2hsv(r, g, b);
	// "hsl(" + std::to_string(h) + ", 100%, 50%)";
}


function rgb2hsv(r,g,b) {
  let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
  let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
  return [60*(h<0?h+6:h), v&&c/v, v];
}


const energyWithBestUnits = (energy) => {
	fEnergy = parseFloat(energy)
	if      (fEnergy >= 1.0e3)                   return (fEnergy / 1.0e3).toFixed(3) + "GeV";
	else if (fEnergy >= 1.0 && fEnergy < 1.0e3 ) return (fEnergy        ).toFixed(3) + "MeV";
	else if (fEnergy >= 1.0e-3 && fEnergy < 1.0) return (fEnergy * 1.0e3).toFixed(3) + "KeV";
	else return fEnergy.toFixed(5) + "MeV";
}


const drawUnclusterizedCubes = (mainSVG, svgns, unclusterized_cubes, plane, plane_mark) => {
	let unclusteredCubesGroup = mainSVG.createElementNS(svgns, 'g');
	unclusteredCubesGroup.setAttributeNS(null, 'class', "unclusterized");
	unclusteredCubesGroup.setAttributeNS(null, 'outline', "solid 3px red");
	unclusteredCubesGroup.setAttributeNS(null, 'outline-offset', "3px");
	[...unclusterized_cubes].forEach(cube => {
		let rect = mainSVG.createElementNS(svgns, 'rect');
		rect.setAttributeNS(null, 'class', "unclusterized-cube " + plane_mark);
		rect.setAttributeNS(null, 'x', cube.x);
		rect.setAttributeNS(null, 'y', cube.y);
		rect.setAttributeNS(null, 'height', '10');
		rect.setAttributeNS(null, 'width', '10');
		rect.setAttributeNS(null, 'fill', convertEnergyToColor(cube.energy));
		unclusteredCubesGroup.appendChild(rect);

		let rect_title = mainSVG.createElementNS(svgns, 'title');
		rect_title.textContent = `Energy deposit ${energyWithBestUnits(cube.energy)} at cube (${parseInt(cube.x / 10.0)}, ${parseInt(cube.y / 10.0)})`
		rect.appendChild(rect_title);
	});
	plane.appendChild(unclusteredCubesGroup);
}


const drawClusterizationOnResponce = (response_data) => {
	console.log(response_data);
	console.log('http://' + appConfig["host"] + ':' + appConfig["api-port"]);

	console.log("xz_cubes_unclusterized: ", response_data["xz_cubes_unclusterized"]);
	console.log("yz_cubes_unclusterized: ", response_data["yz_cubes_unclusterized"]);
	console.log("xy_cubes_unclusterized: ", response_data["xy_cubes_unclusterized"]);
	console.log("clusters_xz: ", response_data["clusters_xz"]);
	console.log("clusters_yz: ", response_data["clusters_yz"]);
	console.log("clusters_xy: ", response_data["clusters_xy"]);
	console.log("clusters_3d: ", response_data["clusters_3d"]);

	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let svgns = "http://www.w3.org/2000/svg";
	let svgXZ = innerSVG.getElementById("svg-plane-xz");
	let svgYZ = innerSVG.getElementById("svg-plane-yz");
	let svgXY = innerSVG.getElementById("svg-plane-xy");

	unclusterized_xz_cubes = response_data["xz_cubes_unclusterized"]
	unclusterized_yz_cubes = response_data["yz_cubes_unclusterized"]
	unclusterized_xy_cubes = response_data["xy_cubes_unclusterized"]

	clusters_xz = response_data["clusters_xz"]
	clusters_yz = response_data["clusters_yz"]
	clusters_xy = response_data["clusters_xy"]
	clusters_3d = response_data["clusters_3d"]

	drawUnclusterizedCubes(innerSVG, svgns, unclusterized_xz_cubes, svgXZ, "xz");
	drawUnclusterizedCubes(innerSVG, svgns, unclusterized_yz_cubes, svgYZ, "yz");
	drawUnclusterizedCubes(innerSVG, svgns, unclusterized_xy_cubes, svgXY, "xy");

	for (let clusterID of Object.keys(clusters_3d)) {
		let cluster = clusters_3d[clusterID];
		let cubeXZ = cluster[0];
		let cubeYZ = cluster[1];
		let cubeXY = cluster[2];

		// let color = convertEnergyToColor(cubeXZ.energy);
		let color = "red";

		let rectXZ = innerSVG.createElementNS(svgns, 'rect');
		rectXZ.setAttributeNS(null, 'class', "clusterized3d-cube xz");
		rectXZ.setAttributeNS(null, 'x', cubeXZ.x);
		rectXZ.setAttributeNS(null, 'y', cubeXZ.y);
		rectXZ.setAttributeNS(null, 'height', '10');
		rectXZ.setAttributeNS(null, 'width', '10');
		rectXZ.setAttributeNS(null, 'fill', color);

		let rect_titleXZ = innerSVG.createElementNS(svgns, 'title');
		rect_titleXZ.textContent = `Cluster ${clusterID}; Energy deposit ${energyWithBestUnits(cubeXZ.energy)} at cube (${parseInt(cubeXZ.x / 10.0)}, ${parseInt(cubeXZ.y / 10.0)})`
		rectXZ.appendChild(rect_titleXZ);
		svgXZ.appendChild(rectXZ);


		let rectYZ = innerSVG.createElementNS(svgns, 'rect');
		rectYZ.setAttributeNS(null, 'class', "clusterized3d-cube yz");
		rectYZ.setAttributeNS(null, 'x', cubeYZ.x);
		rectYZ.setAttributeNS(null, 'y', cubeYZ.y);
		rectYZ.setAttributeNS(null, 'height', '10');
		rectYZ.setAttributeNS(null, 'width', '10');
		rectYZ.setAttributeNS(null, 'fill', color);

		let rect_titleYZ = innerSVG.createElementNS(svgns, 'title');
		rect_titleYZ.textContent = `Cluster ${clusterID}; Energy deposit ${energyWithBestUnits(cubeYZ.energy)} at cube (${parseInt(cubeYZ.x / 10.0)}, ${parseInt(cubeYZ.y / 10.0)})`
		rectYZ.appendChild(rect_titleYZ);
		svgYZ.appendChild(rectYZ);


		let rectXY = innerSVG.createElementNS(svgns, 'rect');
		rectXY.setAttributeNS(null, 'class', "clusterized3d-cube xy");
		rectXY.setAttributeNS(null, 'x', cubeXY.x);
		rectXY.setAttributeNS(null, 'y', cubeXY.y);
		rectXY.setAttributeNS(null, 'height', '10');
		rectXY.setAttributeNS(null, 'width', '10');
		rectXY.setAttributeNS(null, 'fill', color);

		let rect_titleXY = innerSVG.createElementNS(svgns, 'title');
		rect_titleXY.textContent = `Cluster ${clusterID}; Energy deposit ${energyWithBestUnits(cubeXY.energy)} at cube (${parseInt(cubeXY.x / 10.0)}, ${parseInt(cubeXY.y / 10.0)})`
		rectXY.appendChild(rect_titleXY);
		svgXY.appendChild(rectXY);
	}

	// let controlsArea = document.getElementById("controls");
	// let hideClusterizedButton = document.createElement("button");
	// hideClusterizedButton.setAttribute("class", "control");
	// hideClusterizedButton.setAttribute("id", "draw-3d-clusterized-cubes-btn");
	// hideClusterizedButton.setAttribute("width", "100px");
	// controlsArea.append(hideClusterizedButton);
	// $(controlsArea)
	// 	.add("button")
	// 	// .addId("draw-3d-clusterized-cubes-btn")
	// 	.addClass("controls")
	// 	.css("width", "100px");
}


const clusterizeV4 = (event) => {
	let visArea = document.getElementById("main-vis-area");
	let innerSVG = visArea.contentDocument;
	// console.log(innerSVG);
	// console.log(innerSVG.getElementsByClassName("trackpath"));

	let clusterizationBtn = document.getElementById("clusterize-4-btn");

	if (clusterizationBtn.style.backgroundColor == "green") {
		clusterizedCubes = innerSVG.getElementsByClassName("clusterized3d-cube");
		[...clusterizedCubes].forEach(elem => elem.style.display = "none");
		clusterizationBtn.style.backgroundColor = "red";
		// return;
	} else if (clusterizationBtn.style.backgroundColor == "red") {
		unclusterizedCubes = innerSVG.getElementsByClassName("unclusterized-cube");
		[...unclusterizedCubes].forEach(elem => elem.style.display = "none");
		clusterizationBtn.style.backgroundColor = "";
		// return;
	} else {
		clusterizedCubes = innerSVG.getElementsByClassName("clusterized3d-cube");
		[...clusterizedCubes].forEach(elem => elem.style.display = "");
		unclusterizedCubes = innerSVG.getElementsByClassName("unclusterized-cube");
		[...unclusterizedCubes].forEach(elem => elem.style.display = "");
		
		$.ajax({
		    type: 'POST',
		    // url: '/test-action',
		    // url: 'http://0.0.0.0:8880/test-action',
		    url: 'http://' + appConfig["host"] + ':' + appConfig["api-port"] + '/test-action',
		    data: JSON.stringify(cubesToClusterizeArr),
		    contentType: 'application/json',
		    success: function (response_data) {
		        drawClusterizationOnResponce(response_data);
		    }
		});

		clusterizationBtn.style.backgroundColor = "green";
	}

	/*
	value_data = cubesToClusterizeArr;

	$.ajax({
	    type: 'POST',
	    // url: '/test-action',
	    // url: 'http://0.0.0.0:8880/test-action',
	    url: 'http://' + appConfig["host"] + ':' + appConfig["api-port"] + '/test-action',
	    data: JSON.stringify(value_data),
	    contentType: 'application/json',
	    success: function (response_data) {
	        drawClusterizationOnResponce(response_data);
	    }
	});

	clusterizationBtn.style.color = "green";
	// */
}


/// draw 3d with plotly.js
const draw3dWithPlotlyJS = (event) => {

}

document.addEventListener("click", event => {
	if      (event.target.id == "det-resp-btn"      ) visualizeDetectorResponce(event);
	else if (event.target.id == "gammas-btn"        ) visualizePhotons         (event);
	else if (event.target.id == "tracks-btn"        ) visualizeTracks          (event);
	else if (event.target.id == "short-tracks-btn"  ) visualizeShortTracks     (event);
	else if (event.target.id == "clusterize-btn"    ) drawCppClusterizedCubes  (event);
	else if (event.target.id == "clusterize-new-btn") return;
	else if (event.target.id == "clusterize-4-btn"  ) clusterizeV4(event);
	else if (event.target.id == "show-in-3d"        ) draw3dWithPlotlyJS(event);
});


const applyEnergyThreshold = (newEnergyThreshold) => {
	let innerSVG = document.getElementById("main-vis-area").contentDocument;
	let activatedCubes = innerSVG.querySelectorAll('[data-energy]');

	cubesToClusterizeArr = [];
	[...activatedCubes].forEach(cube => {
		cube.__default_style = cube.style;
		let cubeEnergyStr = cube.dataset.energy;

		let plane;
		if      (cube.attributes.class.value == "activated-cube xy") plane = "xy";
		else if (cube.attributes.class.value == "activated-cube xz") plane = "xz";
		else if (cube.attributes.class.value == "activated-cube yz") plane = "yz";

		if (parseFloat(cubeEnergyStr) < newEnergyThreshold) cube.style.display = "none";
		else {
			cube.style.display = "";
			let cubeData = {plane: plane, x: cube.attributes.x.value, y: cube.attributes.y.value, energy: cube.dataset.energy};
			cubesToClusterizeArr.push(cubeData);
		}
	});
}


document.getElementById("fiber-threshold").addEventListener("change", (event) => {
	let newEnergyThreshold = document.getElementById("fiber-threshold").value;
	applyEnergyThreshold(newEnergyThreshold);
});

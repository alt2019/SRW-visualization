

// import * from "clusterize.js"

	let cubesToClusterizeArr = [];

	document.addEventListener("mousemove", (event) => {
		// console.log(event);
		// console.log(window.parent.document);
		if ([...event.target.classList].includes("trackpath")) {
			// event.target.__default_style = event.target.style;
			// event.target.style.strokeWidth = 10;
			// event.target.style.zIndex = 10;
			// event.target.__active = true;
			// let elems = document.getElementsByClassName("id" + event.target.id);
			// [...elems].forEach(elem => {
			// 	elem.__default_style = elem.style;
			// 	elem.style.strokeWidth = 10;
			// 	elem.style.zIndex = 10;
			// });
			// let parent = document.getElementById(event.target.dataset.parentid);
			// if (parent) {
			// 	event.target.__parent_default_style = parent.style;
			// 	parent.style.strokeWidth = 10;
			// 	parent.style.zIndex = 10;
			// 	parent.style.display = "block";
			// 	parent.style.opacity = "0.2";
			// }
			
			// console.log(event, event.target.dataset.parentid, parent);
			// console.log(event, event.target.dataset.parentid, window.parent.document);
			// console.log(window.parent.document);
		}
	});

	window.parent.document.addEventListener("mousemove", (event) => {
		// console.log(event);
	});

	const drawProjectionRectangle = (plane_name, width, height, x, y) => {
		let plane = document.getElementById("svg-plane-" + plane_name);
		let shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		shape.setAttributeNS(null, "class", "projection");
		shape.setAttributeNS(null, "width", width);
		shape.setAttributeNS(null, "height", height);
		shape.setAttributeNS(null, "x", x);
		shape.setAttributeNS(null, "y", y);
		shape.setAttributeNS(null, "stroke", "black");
		shape.setAttributeNS(null, "stroke-width", "3");
		shape.setAttributeNS(null, "fill", "none");
		plane.appendChild(shape);
	}

	const mouseOverTrackPath = (event) => {
		event.target.__default_style = event.target.style;
		event.target.style.strokeWidth = 10;
		event.target.style.zIndex = 10;
		event.target.__active = true;
		let elems = document.getElementsByClassName("id" + event.target.id);
		[...elems].forEach(elem => {
			elem.__default_style = elem.style;
			elem.style.strokeWidth = 10;
			elem.style.zIndex = 10;
		});
		let parent = document.getElementById(event.target.dataset.parentid);
		if (parent) {
			event.target.__parent_default_style = parent.style;
			parent.style.strokeWidth = 10;
			parent.style.zIndex = 10;
			parent.style.display = "block";
			parent.style.opacity = "0.2";
		}
		
		// console.log(event, event.target.dataset.parentid, parent);
		console.log(event, event.target.dataset.parentid);
	}

	const mouseOutTrackPath = (event) => {
		event.target.style = event.target.__default_style;
		event.target.__active = false;
		let elems = document.getElementsByClassName("id" + event.target.id);
		[...elems].forEach(elem => {
			elem.style = elem.__default_style;
		});
		let parent = document.getElementById(event.target.dataset.parentid);
		if (parent) {
			parent.style = event.target.__parent_default_style;
		}
		
		// console.log(event, event.target.dataset.parentid, parent);
		console.log(event, event.target.dataset.parentid);
	}

	const mouseOverActivatedCube = (event) => {
		event.target.__default_style = event.target.style;
		event.target.__projection_is_drawn = true;
		
		console.warn(event);

		/// create projection on other planes ///
		let cubePlane = event.target.classList[1];
		if (cubePlane == "xz")
		{
			let cubeX = event.target.attributes.x.value;
			let cubeZ = event.target.attributes.y.value;
			drawProjectionRectangle("yz", 560, 10, -280, cubeZ);
			drawProjectionRectangle("xy", 10, 560, cubeX, -280);
		} else if (cubePlane == "yz")
		{
			let cubeY = event.target.attributes.x.value;
			let cubeZ = event.target.attributes.y.value;
			drawProjectionRectangle("xz", 1920, 10, -960, cubeZ);
			drawProjectionRectangle("xy", 1920, 10, -960, cubeY);
		} else if (cubePlane == "xy")
		{
			let cubeX = event.target.attributes.x.value;
			let cubeY = event.target.attributes.y.value;
			drawProjectionRectangle("yz", 10, 1840, cubeY, -920);
			drawProjectionRectangle("xz", 10, 1840, cubeX, -920);
		}
	}

	const mouseOutActivatedCube = (event) => {
		event.target.style = event.target.__default_style;
		event.target.__projection_is_drawn = false;

		/// delete projection ///
		let projectionElems = document.getElementsByClassName("projection");
		[...projectionElems].forEach(elem => elem.parentNode.removeChild(elem));
	}

	document.addEventListener("mouseover", (event) => {
		if ([...event.target.classList].includes("trackpath")          ) mouseOverTrackPath    (event);
		if ([...event.target.classList].includes("activated-cube")     ) mouseOverActivatedCube(event);
		if ([...event.target.classList].includes("js-clusterized-cube")) mouseOverActivatedCube(event); // doesnot work
		// if ([...event.target.classList].includes("js-cluster")         ) mouseOverActivatedCube(event); // doesnot work
		// if (event.target.className == "js-cluster") mouseOverActivatedCube(event); // ? doesnot work
		// if ([...event.target.classList].includes("predicted-cubes")    ) mouseOverActivatedCube(event); // doesnot work
		if ([...event.target.classList].includes("predicted-cube")     ) mouseOverActivatedCube(event); // works

		//// select cluster and change its color ////
		//if ([...event.target.classList].includes("cluster")) {
		//	}
		//}
	});

	document.addEventListener("mouseout", (event) => {
		if ([...event.target.classList].includes("trackpath")          ) mouseOutTrackPath    (event);
		if ([...event.target.classList].includes("activated-cube")     ) mouseOutActivatedCube(event);
		if ([...event.target.classList].includes("js-clusterized-cube")) mouseOutActivatedCube(event); // doesnot work
		// if ([...event.target.classList].includes("js-cluster")         ) mouseOutActivatedCube(event); // doesnot work
		// if (event.target.className == "js-cluster") mouseOutActivatedCube(event); // ? doesnot work
		// if ([...event.target.classList].includes("predicted-cubes")    ) mouseOutActivatedCube(event); // doesnot work
		if ([...event.target.classList].includes("predicted-cube")     ) mouseOutActivatedCube(event); // works
	});

	document.onclick = (event) => { // this function might be deprecated later
		console.warn("This function might be deprecated later");
		if (event.target.id == "det-resp-btn") {
			let activatedCubesXZGr = document.getElementById("sim-det-resp-activated-cubes-xz");
			let activatedCubesYZGr = document.getElementById("sim-det-resp-activated-cubes-yz");
			let activatedCubesXYGr = document.getElementById("sim-det-resp-activated-cubes-xy");

			if (event.target.__is_visible) {
				activatedCubesXZGr.style.display = "none";
				activatedCubesYZGr.style.display = "none";
				activatedCubesXYGr.style.display = "none";
				event.target.__is_visible = false;
			} else {
				activatedCubesXZGr.style.display = "";
				activatedCubesYZGr.style.display = "";
				activatedCubesXYGr.style.display = "";
				event.target.__is_visible = true;
			}
		} else if (event.target.id == "gammas-btn") {
			// let gammas = document.getElementsByClassName("particle22");
			let gammas = document.getElementsByClassName("pdg22");

			if (event.target.__is_visible) {
				[...gammas].forEach(track => {
					track.style.display = "none";
				}); 
				event.target.__is_visible = false;
			} else {
				[...gammas].forEach(track => {
					track.style.display = "";
				}); 
				event.target.__is_visible = true;
			}
		} else if (event.target.id == "tracks-btn") {
			let tracks = document.getElementsByClassName("trackpath");

			if (event.target.__is_visible) {
				[...tracks].forEach(track => {
					track.style.display = "none";
				}); 
				event.target.__is_visible = false;
			} else {
				[...tracks].forEach(track => {
					track.style.display = "";
				}); 
				event.target.__is_visible = true;
			}
		} else if (event.target.id == "short-tracks-btn") {
			// let allTracks = document.querySelectorAll('[data-trklen]');
			let allTracks = document.getElementsByClassName("trackpath");
			let shortTracks = [...allTracks].filter(track => track.dataset.trklen <= 50.0);

			if (event.target.__is_only_short_tracks_shown) {
				[...allTracks].forEach(trk => trk.style.display = "");
				[...shortTracks].forEach(trk => trk.style.display = "none");
				event.target.__is_only_short_tracks_shown = false;
			} else {
				[...allTracks].forEach(trk => trk.style.display = "none");
				[...shortTracks].forEach(trk => trk.style.display = "");
				event.target.__is_only_short_tracks_shown = true;
			}
		} else if (event.target.id == "predictions-btn") {
			let predictedCubesGroups = document.getElementsByClassName("predicted-cubes");

			if (event.target.__is_predictions_shown) {
				[...predictedCubesGroups].forEach(group => group.style.display = "");
				event.target.__is_predictions_shown = false;
			} else {
				[...predictedCubesGroups].forEach(group => group.style.display = "none");
				event.target.__is_predictions_shown = true;
			}
		}
	};

	////////////////////////////////////////////////////////////////////
	//// the following code will work only with http server started ////
	////////////////////////////////////////////////////////////////////
	const visualizePhotons = (event) => {
		let gammas = document.getElementsByClassName("pdg22");

		if (event.target.__is_visible) {
			[...gammas].forEach(track => {
				track.style.display = "none";
			}); 
			event.target.__is_visible = false;
		} else {
			[...gammas].forEach(track => {
				track.style.display = "";
			}); 
			event.target.__is_visible = true;
		}
	}

	const visualizeDetectorResponce = (event) => {
		let activatedCubesXZGr = document.getElementById("sim-det-resp-activated-cubes-xz");
		let activatedCubesYZGr = document.getElementById("sim-det-resp-activated-cubes-yz");
		let activatedCubesXYGr = document.getElementById("sim-det-resp-activated-cubes-xy");

		// console.warn(activatedCubesXZGr, activatedCubesYZGr, activatedCubesXYGr);

		if (event.target.__is_visible) {
			activatedCubesXZGr.style.display = "none";
			activatedCubesYZGr.style.display = "none";
			activatedCubesXYGr.style.display = "none";
			event.target.__is_visible = false;
		} else {
			activatedCubesXZGr.style.display = "";
			activatedCubesYZGr.style.display = "";
			activatedCubesXYGr.style.display = "";
			event.target.__is_visible = true;
		}
	}

	const visualizeTracks = (event) => {
		let tracks = document.getElementsByClassName("trackpath");

		if (event.target.__is_visible) {
			[...tracks].forEach(track => {
				track.style.display = "none";
			}); 
			event.target.__is_visible = false;
		} else {
			[...tracks].forEach(track => {
				track.style.display = "";
			}); 
			event.target.__is_visible = true;
		}
	}

	const visualizeShortTracks = (event) => {
		let allTracks = document.getElementsByClassName("trackpath");
		let shortTracks = [...allTracks].filter(track => track.dataset.trklen <= 50.0);

		if (event.target.__is_only_short_tracks_shown) {
			[...allTracks].forEach(trk => trk.style.display = "");
			[...shortTracks].forEach(trk => trk.style.display = "none");
			event.target.__is_only_short_tracks_shown = false;
		} else {
			[...allTracks].forEach(trk => trk.style.display = "none");
			[...shortTracks].forEach(trk => trk.style.display = "");
			event.target.__is_only_short_tracks_shown = true;
		}
	}

	const drawCppClusterizedCubes = (event) => {
		let predictedCubesGroups = document.getElementsByClassName("predicted-cubes");

		if (event.target.__is_predictions_shown) {
			[...predictedCubesGroups].forEach(group => group.style.display = "");
			event.target.__is_predictions_shown = false;
		} else {
			[...predictedCubesGroups].forEach(group => group.style.display = "none");
			event.target.__is_predictions_shown = true;
		}
	}

	//// clusterization ////
	const createDistancesMatrix = (cubesArr) => {
		let distancesXZ = [];
		let distancesYZ = [];
		let distancesXY = [];

		let cubesXZ = cubesArr.filter(cube => cube.plane == "xz");
		let cubesYZ = cubesArr.filter(cube => cube.plane == "yz");
		let cubesXY = cubesArr.filter(cube => cube.plane == "xy");

		for (cube of cubesXZ)
		{
			let dist2others = [];
			for (cube_inner of cubesXZ)
			{
				let spatialDist = Math.sqrt((cube_inner.x - cube.x) ** 2.0 + (cube_inner.y - cube.y) ** 2.0);
				if (spatialDist <= 2) dist2others.push(spatialDist);
			}
			distancesXZ.push(dist2others);
		}

		for (cube of cubesYZ)
		{
			let dist2others = [];
			for (cube_inner of cubesYZ)
			{
				let spatialDist = Math.sqrt((cube_inner.x - cube.x) ** 2.0 + (cube_inner.y - cube.y) ** 2.0);
				if (spatialDist <= 2) dist2others.push(spatialDist);
			}
			distancesYZ.push(dist2others);
		}

		for (cube of cubesXY)
		{
			let dist2others = [];
			for (cube_inner of cubesXY)
			{
				let spatialDist = Math.sqrt((cube_inner.x - cube.x) ** 2.0 + (cube_inner.y - cube.y) ** 2.0);
				if (spatialDist <= 2) dist2others.push(spatialDist);
			}
			distancesXY.push(dist2others);
		}

		return [distancesXZ, distancesYZ, distancesXY];
	}

	const isCubeInCluster = (in_cube, clusters) => {
		for (cluster of clusters)
		{
			for (cube of cluster)
			{
				if (in_cube == cube) return true;
			}
		}
		return false;
	}

	const isCubeInClusterMap = (in_cube, clustersToCubesMap) => {
		for (let [cluster_id, cluster] of clustersToCubesMap)
		{
			for (cube of cluster)
			{
				if (in_cube == cube) return cluster_id;
			}
		}
		return -1;
	}

	const isCubeInClusterMap_v2 = (in_cube, cubesToClusterIdMap) => {
		if (cubesToClusterIdMap.has(in_cube)) return cubesToClusterIdMap[in_cube];
		return -1;
	}

	const clusterizeJsCubes = (cubesArr, btn) => {
		// if (btn.__is_clusterization_done) {
		// 	btn.__is_clusterization_done = false;
		// 	let createdElements = document.getElementsByClassName("js-clusterized-cube");
		// 	[...createdElements].forEach( elem => {
		// 		// elem.style.display = "none";
		// 		elem.parentNode.removeChild(elem);
		// 	});
		// 	return;
		// }
		
		// let createdElements = document.getElementsByClassName("js-clusterized-cube");
		let createdElements = document.getElementsByClassName("js-cluster");
		[...createdElements].forEach( elem => {
			// elem.style.display = "none";
			elem.parentNode.removeChild(elem);
		});
		console.warn("Clusterization is in progress");
		let cubesXZ = cubesArr.filter(cube => cube.plane == "xz");
		let cubesYZ = cubesArr.filter(cube => cube.plane == "yz");
		let cubesXY = cubesArr.filter(cube => cube.plane == "xy");
		// console.warn(cubesXZ, cubesYZ, cubesXY);
		
		// const [distancesXZ, distancesYZ, distancesXY] = createDistancesMatrix(cubesArr);
		// console.warn(distancesXZ, distancesYZ, distancesXY);

		///
		// let clusters = [];
		// for (cubeXZ of cubesXZ)
		// {
		// 	let distancesXZArr = [];
		// 	for (cubeXZ_inner of cubesXZ) 
		// 	{
		// 		let spatialDist = Math.sqrt((cubeXZ_inner.x - cubeXZ.x) ** 2.0 + (cubeXZ_inner.y - cubeXZ.y) ** 2.0);
		// 		if (spatialDist <= 2) distancesXZArr.push({cubeXZ, cubeXZ_inner, spatialDist});
		// 	}
		// }

		// let distancesMap = new Map();
		// for (cubeXZ of cubesXZ){
		// 	for (cubeXZ_inner of cubesXZ)
		// 	{
		// 		if (cubeXZ_inner == cubeXZ) continue;
		// 		let spatialDist = Math.sqrt((cubeXZ_inner.x - cubeXZ.x) ** 2.0 + (cubeXZ_inner.y - cubeXZ.y) ** 2.0);
		// 		if (spatialDist >= 2.0) continue;
		// 		distancesMap.set([cubeXZ.x, cubeXZ.y, cubeXZ_inner.x, cubeXZ_inner.y], spatialDist);
		// 	}
		// }
		// console.warn(distancesMap);
		
		/*
		let clustersToCubesMap = new Map();
		let cubesToClusterIdMap = new Map();
		let clusterId = 0;
		for (cubeXZ of cubesXZ){
			// if isCubeInClusterMap(cubeXZ, clustersToCubesMap) continue;
			// if isCubeInClusterMap_v2(cubeXZ, cubesToClusterIdMap) continue;
			let extractedClusterId = isCubeInClusterMap_v2(cubeXZ, cubesToClusterIdMap);
			if (extractedClusterId > -1) continue;

			let n_neighbours_1stlevel = 0;
			let neighbours_1stlevel = [];
			let n_neighbours_2ndlevel = 0;
			let neighbours_2ndlevel = [];

			for (cubeXZ_inner of cubesXZ){
				if (cubeXZ_inner == cubeXZ) continue;
				let spatialDist = Math.sqrt(Math.pow(cubeXZ_inner.x - cubeXZ.x, 2) + Math.pow(cubeXZ_inner.y - cubeXZ.y, 2)) / 10.0; // cm
				if      (spatialDist < 2.0                       ) {n_neighbours_1stlevel += 1; neighbours_1stlevel.push(cubeXZ_inner);}
				else if (spatialDist >= 2.0 && spatialDist <= 3.0) {n_neighbours_2ndlevel += 1; neighbours_2ndlevel.push(cubeXZ_inner);}
			}

			if (n_neighbours_1stlevel == 0) {
				clustersToCubesMap.set(clusterId, [cubeXZ]);
				cubesToClusterIdMap.set(cubeXZ, clusterId);
				clusterId += 1;
			} else if (n_neighbours_1stlevel == 1) {

			}
		}
		// */


		/// minimal worked example
		let clustersXZ = [];
		for (cubeXZ of cubesXZ){
			if (isCubeInCluster(cubeXZ, clustersXZ)) continue;
			let n_neighbours_1stlevel = 0;
			let neighbours_1stlevel = [];
			let n_neighbours_2ndlevel = 0;
			let neighbours_2ndlevel = [];

			let dist = []; // debug
			for (cubeXZ_inner of cubesXZ){
				if (cubeXZ_inner == cubeXZ) continue;
				let spatialDist = Math.sqrt(Math.pow(cubeXZ_inner.x - cubeXZ.x, 2) + Math.pow(cubeXZ_inner.y - cubeXZ.y, 2)) / 10.0; // cm
				dist.push(spatialDist);  // debug
				if      (spatialDist < 2.0                       ) {n_neighbours_1stlevel += 1; neighbours_1stlevel.push(cubeXZ_inner);}
				else if (spatialDist >= 2.0 && spatialDist <= 3.0) {n_neighbours_2ndlevel += 1; neighbours_2ndlevel.push(cubeXZ_inner);}
			}

			console.warn(cubeXZ, n_neighbours_1stlevel, n_neighbours_2ndlevel, /*dist*/);  // debug

			if (n_neighbours_1stlevel == 0) {
				clustersXZ.push([cubeXZ]);
			} else if (n_neighbours_1stlevel == 1) {

			}
		}
		console.warn(clustersXZ);

		/// process clusters
		let svgns = "http://www.w3.org/2000/svg";
		let svgXZ = document.getElementById("svg-plane-xz");
		let clusterId = 0;
		for (cluster of clustersXZ)
		{
			let color = '#'+Math.round(0xffffff * Math.random()).toString(16);
			let clusterGroup = document.createElementNS(svgns, 'g');
			clusterGroup.setAttributeNS(null, 'class', "js-cluster " + clusterId);
			clusterGroup.setAttributeNS(null, 'fill', color);
			clusterGroup.setAttributeNS(null, 'outline', "solid 3px red");
			clusterGroup.setAttributeNS(null, 'outline-offset', "3px");
			let clusterEnergy = 0.0;
			for (cube of cluster)
			{
				clusterEnergy += cube.energy;

				let rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'class', "js-clusterized-cube xz");
		        rect.setAttributeNS(null, 'x', cube.x);
		        rect.setAttributeNS(null, 'y', cube.y);
		        rect.setAttributeNS(null, 'height', '10');
		        rect.setAttributeNS(null, 'width', '10');
		        clusterGroup.appendChild(rect);

		        let rect_title = document.createElementNS(svgns, 'title');
		        rect_title.textContent = "Cluster " + clusterId;
		        rect.appendChild(rect_title);

			}
			clusterGroup.setAttributeNS(null, 'data-energy', clusterEnergy);
			svgXZ.appendChild(clusterGroup);
			clusterId += 1;
		}
	}

	///////////////////////////////////////////////////////////////
	const spatialDistanceBetwCubes = (cube1, cube2) => {
		return Math.sqrt(Math.pow(cube1.x - cube2.x, 2) + Math.pow(cube1.y - cube2.y, 2)) / 10.0; // cm
	}

	const appendCubeToNewCluster = (cube, clustersMap, cubesMap, clusterId) => {
		let cluster = [cube];
		clustersMap.set(clusterId, cluster);
		cubesMap.set(cube, clusterId);
		// clusterId += 1;
		// return clusterId;
	}

	const isCubeInCluster_v2 = (cube, cubesMap) => {
		return cubesMap.get(cube);
	}

	const clusterizeJsCubes_v3 = (cubesArr, btn) => {
		console.warn(btn.__is_clusterization_done, btn.__is_clusterization_visible);
		if ((btn.__is_clusterization_done || !btn.__is_clusterization_done) && btn.__is_clusterization_visible)
		{
			let createdElements = document.getElementsByClassName("js-cluster");
			[...createdElements].forEach( elem => {
				elem.style.display = "none";
			});

			btn.__is_clusterization_visible = false;
			return;
		} else if (btn.__is_clusterization_done && !(btn.__is_clusterization_visible)) {
			let createdElements = document.getElementsByClassName("js-cluster");
			[...createdElements].forEach( elem => {
				elem.style.display = "";
			});

			btn.__is_clusterization_visible = true;
			btn.__is_clusterization_done = false;
			return;
		} else if (!btn.__is_clusterization_done && !btn.__is_clusterization_visible) {
			// clusterizeJsCubes_v2(cubesArr);
			clusterizeJsCubes_v2a(cubesArr);
			btn.__is_clusterization_done = true;
			btn.__is_clusterization_visible = true;
		}
	}

	const clusterizeJsCubes_v2 = (cubesArr) => {
		let createdElements = document.getElementsByClassName("js-cluster");
		[...createdElements].forEach( elem => {
			elem.parentNode.removeChild(elem);
		});

		let cubesXZ = cubesArr.filter(cube => cube.plane == "xz");
		let cubesYZ = cubesArr.filter(cube => cube.plane == "yz");
		let cubesXY = cubesArr.filter(cube => cube.plane == "xy");

		let clustersXZMap = new Map();
		let CubesXZMap = new Map()
		let CubesXZMarkMap = new Map();
		let xzClusterId = 0;

		let clustersYZMap = new Map();
		let CubesYZMap = new Map();
		let CubesYZMarkMap = new Map();
		let yzClusterId = 0;

		let clustersXYMap = new Map();
		let CubesXYMap = new Map();
		let CubesXYMarkMap = new Map();
		let xyClusterId = 0;

		for (cubeXZ of cubesXZ)
		{ // start loop over xz cubes
			// let cubeClusterId = isCubeInCluster_v2(cubeXZ, CubesXZMap);
			// if (cubeClusterId) continue;

			let n_neighbours_1stlevel = 0,
				n_neighbours_2ndlevel = 0,
				n_neighbours_3rdlevel = 0;

			let neighbours_1stlevel = [],
				neighbours_2ndlevel = [],
				neighbours_3rdlevel = [];

			/// compute distances to neighbours up to second level (dist < 3)
			for (inner_cubeXZ of cubesXZ)
			{
				if (inner_cubeXZ == cubeXZ) continue;
				let spatialDist = spatialDistanceBetwCubes(cubeXZ, inner_cubeXZ);
				if (spatialDist < 2){
					neighbours_1stlevel.push(inner_cubeXZ);
					n_neighbours_1stlevel += 1;
				} else if (spatialDist >= 2 && spatialDist < 3){
					neighbours_2ndlevel.push(inner_cubeXZ);
					n_neighbours_2ndlevel += 1;
				} else if (spatialDist >= 3 && spatialDist < 4){
					neighbours_3rdlevel.push(inner_cubeXZ);
					n_neighbours_3rdlevel += 1;
				}
			}

			/// create clusters
			let stripInYZ = cubesYZ.filter(cube => cube.y == cubeXZ.y);
			let stripInXY = cubesXY.filter(cube => cube.x == cubeXZ.x);
			
			if (n_neighbours_1stlevel == 0)
			{
				appendCubeToNewCluster(cubeXZ, clustersXZMap, CubesXZMap, xzClusterId);
				CubesXZMarkMap.set(cubeXZ, "short-track");

				let _arr1 = stripInYZ.filter(cube => cube.energy == cubeXZ.energy);
				let _arr2 = stripInXY.filter(cube => cube.energy == cubeXZ.energy);
				if (_arr1.length == 1) {
					appendCubeToNewCluster(_arr1[0], clustersYZMap, CubesYZMap, xzClusterId);
					CubesYZMarkMap.set(_arr1[0], "short-track");
				}
				if (_arr2.length == 1) {
					appendCubeToNewCluster(_arr2[0], clustersXYMap, CubesXYMap, xzClusterId);
					CubesXYMarkMap.set(_arr2[0], "short-track");
				}

				xzClusterId += 1;
			} else if (n_neighbours_1stlevel == 1 && n_neighbours_2ndlevel == 1 && n_neighbours_3rdlevel == 0) {
				let neighbourClusterId = isCubeInCluster_v2(neighbours_2ndlevel[0], CubesXZMap);
				if (neighbourClusterId) {
					clustersXZM.get(neighbourClusterId).push(cubeXZ);
				} else {
					appendCubeToNewCluster(cubeXZ, clustersXZMap, CubesXZMap, xzClusterId);
					CubesXZMarkMap.set(cubeXZ, "short-track-border-cube");
					xzClusterId += 1;
				}
			}

			console.warn(cubeXZ, "\n",
						 n_neighbours_1stlevel, n_neighbours_2ndlevel, "\n",
						 neighbours_1stlevel, "\n", neighbours_2ndlevel, "\n",
						 stripInYZ, "\n", stripInXY);
		} // end loop over xz cubes

		/// draw clusters
		let clustersColors = new Map();
		let clustersEnergies = new Map();
		for ([clusterId, cluster] of clustersXZMap)
		{
			let color = '#' + Math.round(0xffffff * Math.random()).toString(16);
			clustersColors.set(clusterId, color);
			let energy = 0.0;
			for (cube of cluster) {energy += cube.energy;}
			clustersEnergies.set(clusterId, parseFloat(energy));
		}
		// console.warn(clustersColors, clustersEnergies);
		// console.warn("clustersColors: ");
		// for ([clusterId, color] of clustersColors)
		// {
		// 	console.warn(clusterId, color);
		// }
		// for ([clusterId, energy] of clustersEnergies)
		// {
		// 	console.warn(clusterId, energy);
		// }

		let svgns = "http://www.w3.org/2000/svg";
		let svgXZ = document.getElementById("svg-plane-xz");
		for ([clusterId, cluster] of clustersXZMap)
		{
			let clusterGroup = document.createElementNS(svgns, 'g');
			clusterGroup.setAttributeNS(null, 'class', "js-cluster " + clusterId);
			clusterGroup.setAttributeNS(null, 'fill', clustersColors.get(clusterId));
			clusterGroup.setAttributeNS(null, 'outline', "solid 3px red");
			clusterGroup.setAttributeNS(null, 'outline-offset', "3px");
			let clusterEnergy = 0.0;
			for (cube of cluster)
			{
				clusterEnergy += cube.energy;

				let rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'class', "js-clusterized-cube xz");
		        rect.setAttributeNS(null, 'x', cube.x);
		        rect.setAttributeNS(null, 'y', cube.y);
		        rect.setAttributeNS(null, 'height', '10');
		        rect.setAttributeNS(null, 'width', '10');
		        clusterGroup.appendChild(rect);

		        let rect_title = document.createElementNS(svgns, 'title');
		        rect_title.textContent = "Cluster " + clusterId + "; energy: "
		        						 + clustersEnergies.get(clusterId) 
		        						 + "; mark: " + CubesXZMarkMap.get(cube);
		        rect.appendChild(rect_title);

			}
			clusterGroup.setAttributeNS(null, 'data-energy', clusterEnergy);
			svgXZ.appendChild(clusterGroup);
		}

		let svgYZ = document.getElementById("svg-plane-yz");
		for ([clusterId, cluster] of clustersYZMap)
		{
			let clusterGroup = document.createElementNS(svgns, 'g');
			clusterGroup.setAttributeNS(null, 'class', "js-cluster " + clusterId);
			clusterGroup.setAttributeNS(null, 'fill', clustersColors.get(clusterId));
			clusterGroup.setAttributeNS(null, 'outline', "solid 3px red");
			clusterGroup.setAttributeNS(null, 'outline-offset', "3px");
			let clusterEnergy = 0.0;
			for (cube of cluster)
			{
				clusterEnergy += cube.energy;

				let rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'class', "js-clusterized-cube yz");
		        rect.setAttributeNS(null, 'x', cube.x);
		        rect.setAttributeNS(null, 'y', cube.y);
		        rect.setAttributeNS(null, 'height', '10');
		        rect.setAttributeNS(null, 'width', '10');
		        clusterGroup.appendChild(rect);

		        let rect_title = document.createElementNS(svgns, 'title');
		        rect_title.textContent = "Cluster " + clusterId + "; energy: "
		        						 + clustersEnergies.get(clusterId)
		        						 + "; mark: " + CubesYZMarkMap.get(cube);
		        rect.appendChild(rect_title);

			}
			clusterGroup.setAttributeNS(null, 'data-energy', clusterEnergy);
			svgYZ.appendChild(clusterGroup);
		}

		let svgXY = document.getElementById("svg-plane-xy");
		for ([clusterId, cluster] of clustersXYMap)
		{
			let clusterGroup = document.createElementNS(svgns, 'g');
			clusterGroup.setAttributeNS(null, 'class', "js-cluster " + clusterId);
			clusterGroup.setAttributeNS(null, 'fill', clustersColors.get(clusterId));
			clusterGroup.setAttributeNS(null, 'outline', "solid 3px red");
			clusterGroup.setAttributeNS(null, 'outline-offset', "3px");
			let clusterEnergy = 0.0;
			for (cube of cluster)
			{
				clusterEnergy += cube.energy;

				let rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'class', "js-clusterized-cube xy");
		        rect.setAttributeNS(null, 'x', cube.x);
		        rect.setAttributeNS(null, 'y', cube.y);
		        rect.setAttributeNS(null, 'height', '10');
		        rect.setAttributeNS(null, 'width', '10');
		        clusterGroup.appendChild(rect);

		        let rect_title = document.createElementNS(svgns, 'title');
		        rect_title.textContent = "Cluster " + clusterId + "; energy: "
		        						 + clustersEnergies.get(clusterId)
		        						 + "; mark: " + CubesXYMarkMap.get(cube);
		        rect.appendChild(rect_title);

			}
			clusterGroup.setAttributeNS(null, 'data-energy', clusterEnergy);
			svgXY.appendChild(clusterGroup);
		}
	}
	///////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////
	const fillClusterColorAndEnergy = (clustersXZMap, clustersYZMap, clustersXYMap) => {
		let clustersColors = new Map();
		let clustersEnergies = new Map();
		for ([clusterId, cluster] of clustersXZMap)
		{
			if (clustersColors.get(clusterId)) continue;
			let color = '#' + Math.round(0xffffff * Math.random()).toString(16);
			clustersColors.set(clusterId, color);
			let energy = 0.0;
			for (cube of cluster) {energy += cube.energy;}
			clustersEnergies.set(clusterId, parseFloat(energy));
		}
		for ([clusterId, cluster] of clustersYZMap)
		{
			if (clustersColors.get(clusterId)) continue;
			let color = '#' + Math.round(0xffffff * Math.random()).toString(16);
			clustersColors.set(clusterId, color);
			let energy = 0.0;
			for (cube of cluster) {energy += cube.energy;}
			clustersEnergies.set(clusterId, parseFloat(energy));
		}
		for ([clusterId, cluster] of clustersXYMap)
		{
			if (clustersColors.get(clusterId)) continue;
			let color = '#' + Math.round(0xffffff * Math.random()).toString(16);
			clustersColors.set(clusterId, color);
			let energy = 0.0;
			for (cube of cluster) {energy += cube.energy;}
			clustersEnergies.set(clusterId, parseFloat(energy));
		}
		return [clustersColors, clustersEnergies];
	}

	const drawClusters = (clustersMap, svgPlane, clustersColors, clustersEnergies, cubesMarksMap, plane) => {
		let svgns = "http://www.w3.org/2000/svg";
		for ([clusterId, cluster] of clustersMap)
		{
			let clusterGroup = document.createElementNS(svgns, 'g');
			clusterGroup.setAttributeNS(null, 'class', "js-cluster " + clusterId);
			clusterGroup.setAttributeNS(null, 'fill', clustersColors.get(clusterId));
			clusterGroup.setAttributeNS(null, 'outline', "solid 3px red");
			clusterGroup.setAttributeNS(null, 'outline-offset', "3px");
			let clusterEnergy = 0.0;
			for (cube of cluster)
			{
				clusterEnergy += cube.energy;

				let rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS(null, 'class', "js-clusterized-cube " + plane);
		        rect.setAttributeNS(null, 'x', cube.x);
		        rect.setAttributeNS(null, 'y', cube.y);
		        rect.setAttributeNS(null, 'height', '10');
		        rect.setAttributeNS(null, 'width', '10');
		        clusterGroup.appendChild(rect);

		        let rect_title = document.createElementNS(svgns, 'title');
		        rect_title.textContent = "Cluster " + clusterId + "; energy: "
		        						 + clustersEnergies.get(clusterId) 
		        						 + "; mark: " + cubesMarksMap.get(cube);
		        rect.appendChild(rect_title);

			}
			clusterGroup.setAttributeNS(null, 'data-energy', clusterEnergy);
			svgPlane.appendChild(clusterGroup);
		}
	}

	const drawUnclusterizedCubes = (cubesMap, svgPlane, planeMark) => {
		let svgns = "http://www.w3.org/2000/svg";
		let clusterGroup = document.createElementNS(svgns, 'g');
		clusterGroup.setAttributeNS(null, 'class', "js-cluster");
		clusterGroup.setAttributeNS(null, 'fill', "black");
		for (cube of cubesMap)
		{
			let rect = document.createElementNS(svgns, 'rect');
			rect.setAttributeNS(null, 'class', "js-clusterized-cube " + planeMark);
		    rect.setAttributeNS(null, 'x', cube.x);
		    rect.setAttributeNS(null, 'y', cube.y);
		    rect.setAttributeNS(null, 'height', '10');
		    rect.setAttributeNS(null, 'width', '10');
		    rect.setAttributeNS(null, 'fill', 'black');
		    let rect_title = document.createElementNS(svgns, 'title');
		    rect_title.textContent = "Cube: energy: " + cube.energy + "; mark: unclusterized";
		    rect.appendChild(rect_title);
		    clusterGroup.appendChild(rect);
		}
		svgPlane.appendChild(clusterGroup);
	}

	const clusterizeJsCubes_v2a = (cubesArr) => {
		let createdElements = document.getElementsByClassName("js-cluster");
		[...createdElements].forEach( elem => {
			elem.parentNode.removeChild(elem);
		});

		let cubesXZ = cubesArr.filter(cube => cube.plane == "xz");
		let cubesYZ = cubesArr.filter(cube => cube.plane == "yz");
		let cubesXY = cubesArr.filter(cube => cube.plane == "xy");

		let clusterId = 0;

		let clustersXZMap = new Map();
		let CubesXZMap = new Map()
		let CubesXZMarkMap = new Map();

		let clustersYZMap = new Map();
		let CubesYZMap = new Map();
		let CubesYZMarkMap = new Map();

		let clustersXYMap = new Map();
		let CubesXYMap = new Map();
		let CubesXYMarkMap = new Map();

		/// loop 1: separate single cubes ///
		for (cubeXZ of cubesXZ)
		{
			let n_neighbours_1stlevel = 0,
				n_neighbours_2ndlevel = 0,
				n_neighbours_3rdlevel = 0;

			let neighbours_1stlevel = [],
				neighbours_2ndlevel = [],
				neighbours_3rdlevel = [];

			/// compute distances to neighbours up to second level (dist < 3)
			for (inner_cubeXZ of cubesXZ)
			{
				if (inner_cubeXZ == cubeXZ) continue;
				let spatialDist = spatialDistanceBetwCubes(cubeXZ, inner_cubeXZ);
				if (spatialDist < 2){
					neighbours_1stlevel.push(inner_cubeXZ);
					n_neighbours_1stlevel += 1;
				} else if (spatialDist >= 2 && spatialDist < 3){
					neighbours_2ndlevel.push(inner_cubeXZ);
					n_neighbours_2ndlevel += 1;
				} else if (spatialDist >= 3 && spatialDist < 4){
					neighbours_3rdlevel.push(inner_cubeXZ);
					n_neighbours_3rdlevel += 1;
				}
			}

			/// create clusters
			let stripInYZ = cubesYZ.filter(cube => cube.y == cubeXZ.y);
			let stripInXY = cubesXY.filter(cube => cube.x == cubeXZ.x);

			if (n_neighbours_1stlevel == 0)
			{
				appendCubeToNewCluster(cubeXZ, clustersXZMap, CubesXZMap, clusterId);
				CubesXZMarkMap.set(cubeXZ, "short-track");

				let _arr1 = stripInYZ.filter(cube => cube.energy == cubeXZ.energy);
				let _arr2 = stripInXY.filter(cube => cube.energy == cubeXZ.energy);
				if (_arr1.length == 1) {
					appendCubeToNewCluster(_arr1[0], clustersYZMap, CubesYZMap, clusterId);
					CubesYZMarkMap.set(_arr1[0], "short-track");
				}
				if (_arr2.length == 1) {
					appendCubeToNewCluster(_arr2[0], clustersXYMap, CubesXYMap, clusterId);
					CubesXYMarkMap.set(_arr2[0], "short-track");
				}
				clusterId += 1;
			}
		}

		for (cubeYZ of cubesYZ)
		{
			let n_neighbours_1stlevel = 0,
				n_neighbours_2ndlevel = 0,
				n_neighbours_3rdlevel = 0;

			let neighbours_1stlevel = [],
				neighbours_2ndlevel = [],
				neighbours_3rdlevel = [];

			/// compute distances to neighbours up to second level (dist < 3)
			for (inner_cubeYZ of cubesYZ)
			{
				if (inner_cubeYZ == cubeYZ) continue;
				let spatialDist = spatialDistanceBetwCubes(cubeYZ, inner_cubeYZ);
				if (spatialDist < 2){
					neighbours_1stlevel.push(inner_cubeYZ);
					n_neighbours_1stlevel += 1;
				} else if (spatialDist >= 2 && spatialDist < 3){
					neighbours_2ndlevel.push(inner_cubeYZ);
					n_neighbours_2ndlevel += 1;
				} else if (spatialDist >= 3 && spatialDist < 4){
					neighbours_3rdlevel.push(inner_cubeYZ);
					n_neighbours_3rdlevel += 1;
				}
			}

			/// create clusters
			let stripInXZ = cubesXZ.filter(cube => cube.y == cubeYZ.y);
			let stripInXY = cubesXY.filter(cube => cube.y == cubeYZ.x);

			if (n_neighbours_1stlevel == 0)
			{
				appendCubeToNewCluster(cubeYZ, clustersYZMap, CubesYZMap, clusterId);
				CubesYZMarkMap.set(cubeYZ, "short-track");

				let _arr1 = stripInXZ.filter(cube => cube.energy == cubeYZ.energy);
				let _arr2 = stripInXY.filter(cube => cube.energy == cubeYZ.energy);
				if (_arr1.length == 1) {
					appendCubeToNewCluster(_arr1[0], clustersXZMap, CubesXZMap, clusterId);
					CubesXZMarkMap.set(_arr1[0], "short-track");
				}
				if (_arr2.length == 1) {
					appendCubeToNewCluster(_arr2[0], clustersXYMap, CubesXYMap, clusterId);
					CubesXYMarkMap.set(_arr2[0], "short-track");
				}
				clusterId += 1;
			}
		}

		/// delete clusterized cubes from array of all cubes ///
		cubesXZ = cubesXZ.filter(cube => !CubesXZMap.get(cube));
		cubesYZ = cubesYZ.filter(cube => !CubesYZMap.get(cube));
		cubesXY = cubesXY.filter(cube => !CubesXYMap.get(cube));

		/// subtract single cubes, which are presented in two planes, energy from total energy in the third plane
		let possiblePlanes = new Set(["xz", "yz", "xy"]);
		for ([clusterizedCube, clusterId] of CubesXZMap)
		{
			let presence = ["xz"];
			if (clustersYZMap.get(clusterId)) presence.push("yz");
			if (clustersXYMap.get(clusterId)) presence.push("xy");
			let presenceSet = new Set(presence);

			let planeToProcess;
			if (presence.length == 2) {
				planeToProcess = new Set([...possiblePlanes].filter(x => !presenceSet.has(x))).values().next().value;
				console.warn(clusterId, presence, planeToProcess);
			}
			
			if (planeToProcess == "xy") {
				let xCoord = clusterizedCube.x;
				let yCoord = clustersYZMap.get(clusterId)[0].x;
				let cubeToReplace = cubesXY.filter(cube => (cube.x == xCoord && cube.y == yCoord))[0];
				let cubeToReplaceIndex = cubesXY.findIndex(cube => (cube.x == xCoord && cube.y == yCoord));
				cubeToReplace.energy -= clusterizedCube.energy;
				cubesXY[cubeToReplaceIndex] = cubeToReplace;
			} 
			// else if (planeToProcess == "yz") { // !!! here is an error !!!
			// 	let xCoord = clusterizedCube.y;
			// 	let yCoord = clustersXYMap.get(clusterId)[0].y;
			// 	let cubeToReplace = cubesYZ.filter(cube => (cube.x == xCoord && cube.y == yCoord))[0];
			// 	let cubeToReplaceIndex = cubesYZ.findIndex(cube => (cube.x == xCoord && cube.y == yCoord));
			// 	cubeToReplace.energy -= clusterizedCube.energy;
			// 	cubesYZ[cubeToReplaceIndex] = cubeToReplace;
			// }
		}

		/// 3. Continue clusterization
		// here might be needed RNN for prediction-like time series

		/// draw clusters
		let [clustersColors, clustersEnergies] = fillClusterColorAndEnergy(
			clustersXZMap, clustersYZMap, clustersXYMap);

		let svgXZ = document.getElementById("svg-plane-xz");
		let svgYZ = document.getElementById("svg-plane-yz");
		let svgXY = document.getElementById("svg-plane-xy");
		drawClusters(clustersXZMap, svgXZ, clustersColors, clustersEnergies, CubesXZMarkMap, "xz");
		drawClusters(clustersYZMap, svgYZ, clustersColors, clustersEnergies, CubesYZMarkMap, "yz");
		drawClusters(clustersXYMap, svgXY, clustersColors, clustersEnergies, CubesXYMarkMap, "xy");

		/// draw unclusterized
		drawUnclusterizedCubes(cubesXZ, svgXZ, "xz");
		drawUnclusterizedCubes(cubesYZ, svgYZ, "yz");
		drawUnclusterizedCubes(cubesXY, svgXY, "xy");
	}
	///////////////////////////////////////////////////////////////

	window.parent.document.onclick = (event) => {
		// if      (event.target.id == "det-resp-btn"      ) visualizeDetectorResponce(event);
		// if (event.target.id == "gammas-btn"        ) visualizePhotons(event);
		// else if (event.target.id == "tracks-btn"        ) visualizeTracks(event);
		// else if (event.target.id == "short-tracks-btn"  ) visualizeShortTracks(event);
		// else if (event.target.id == "clusterize-btn"    ) drawCppClusterizedCubes(event);
		// else if (event.target.id == "clusterize-new-btn") clusterizeJsCubes(cubesToClusterizeArr, event.target);
		// else if (event.target.id == "clusterize-new-btn") clusterizeJsCubes_v3(cubesToClusterizeArr, event.target);
		// else if (event.target.id == "clusterize-new-btn") testF("test text");
	}

	window.parent.document.getElementById("fiber-threshold").addEventListener("change", (event) => {
		let newEnergyThreshold = window.parent.document.getElementById("fiber-threshold").value;
		// console.warn(newEnergyThreshold);

		let activatedCubes = document.querySelectorAll('[data-energy]');
		// console.warn(activatedCubes);

		cubesToClusterizeArr = [];
		[...activatedCubes].forEach(cube => {
			cube.__default_style = cube.style;
			let cubeEnergyStr = cube.dataset.energy;
			// console.warn(cubeEnergyStr, cubeEnergyStr.substr(-3), cubeEnergyStr.slice(0, -3));
			// console.warn(cube);

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

		// console.warn(cubesToClusterizeArr);
	});


	const testF = (text) => {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "../test.py?text=" + text, true);
		xhr.responseType = "JSON";
		xhr.onload = function(e) {
		  console.log(xhr.response);
		  // let arrOfStrings = JSON.parse(xhr.response);
		  // console.log(arrOfStrings);
		}
		xhr.send();

		// $.ajax({
		//   type: "POST",
		//   url: "~/pythoncode.py",
		//   data: { param: text}
		// }).done(function( o ) {
		//    // do something
		// });
	}

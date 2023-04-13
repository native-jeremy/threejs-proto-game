import * as THREE from 'three';

// Three JS Globals
let camera, scene, renderer;

// Renderer Parent Element
const app = document.querySelector('#app');

const originalBoxSize = 3; // Original width and height of a box

// const colorParam = '#000000';
let model;


// Block array;
let stack = [];
const boxHeight = 1; // height of each layer




//scene.background = new THREE.Color(colorParam.color);
const geometry = new THREE.BoxGeometry( 3, 1, 3 );
const material = new THREE.MeshLambertMaterial( { color: 0xfb8e00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 0, 0);
scene.add( cube );


function init() {

// Scene 
const scene = new THREE.Scene();


// Foundation
addLayer(0.8, originalBoxSize, originalBoxSize);


// First layer
addLayer(-18, 0, originalBoxSize, originalBoxSize, "x");


// Set Up Lights
const ambientlight = new THREE.AmbientLight( 0x504040, 0.9 ); // soft white light
scene.add( ambientlight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
scene.add( directionalLight );


// Camera
const width = 10;
const height = width * ( window.innerWidth / window.innerHeight );
const camera = new THREE.OrthographicCamera(
	width / -2, // left
	width / 2, // right
	height / 2, // top
	height / -2, // bottom
	1, // near
	100 // far
);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );

// Append Renderer to element id = (#app)
app.append( renderer.domElement );

}


function addLayer(x, y, z, width, depth, direction)
{	
	const y = boxHeight * stack.length;

	const layer = generateBox(x, y, z, width, depth);
	layer.direction = direction;

	stack.push(layer);
}


function generateBox(x, y, z, width, depth)
{	
	const geometry = new THREE.BoxGeometry( width, boxHeight, depth);

	const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
	const material = new THREE.MeshLambertMaterial( { color } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(x, y, z);
	scene.add( mesh );

	return {
		threejs: mesh,
		width,
		depth,
	};
}

let gameStarted = false;

window.addEventListener("click", () => {
	if (!gameStarted) {
		renderer.setAnimationLoop(animation);
		gameStarted = true;
	} else {
		const topLayer = stack[stack.length - 1];
		const previousLayer = stack[stack.length - 2];

		const direction = topLayer.direction;

		const delta = 
			topLayer.threejs.position[direction] -
			previousLayer.threejs.position[direction];

		const overhangSize = Math.abs(delta);	
		
		const overlap = size - overhangSize;	

	  if (overlap > 0) {

			// Cut Layer
			const newWidth = direction == "x" ? overlap : topLayer.width;
			const newDepth = direction == "z" ? overlap : topLayer.depth;

			// Update Metadata
			topLayer.width = newWidth;
			topLayer.depth = newDepth;

			// Update Three JS Model
			topLayer.threejs.scale[direction] = overlap / size;
			topLayer.threejs.position[direction] -= delta / 2;

			// Next Layer
			const nextX = direction == "x" ? topLayer.threejs.position : - 10;
			const nextZ = direction == "z" ? topLayer.threejs.position : - 10;
			const nextDirection = direction == "x" ? "z" : "x";
		
			addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
	  }
	}
});

// Animatation function
function animation() {
	const speed = 0.15;

	const topLayer = stack[stack.length -1];
	topLayer.threejs.position[topLayer.direction] += speed;

	// 4 is the initial camera height
	if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
		camera.position.y += speed;
	}

	renderer.render( scene, camera );
}

/* window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}*/

/*
// Animate function
function animate() {
	requestAnimationFrame( animate );
	
	//cube.rotation.x += 0.0025;
	//cube.rotation.y += 0.00;

	renderer.render( scene, camera );
}

animate();
*/



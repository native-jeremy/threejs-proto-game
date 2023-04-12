import * as THREE from 'three';

const app = document.querySelector('#app');

const originalBoxSize = 3; // Original width and height of a box
const colorParam = '#000000';


// Scene 
const scene = new THREE.Scene();
//scene.background = new THREE.Color(colorParam.color);
const geometry = new THREE.BoxGeometry( 4, 2, 2 );
const texture = new THREE.TextureLoader().load('images/native.jpg');
const material = new THREE.MeshLambertMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 0, 0);
scene.add( cube );


// Foundation
//addLayer(0.8, originalBoxSize, originalBoxSize);

// First layer
//addLayer(-18, 0, originalBoxSize, originalBoxSize, "x");

// Lights
const ambientlight = new THREE.AmbientLight( 0x504040, 0.2 ); // soft white light
scene.add( ambientlight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
scene.add( directionalLight );


// Camera
const angle = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
	 20, 
	 angle, 
	 1, 
	 100 );

camera.position.z = 5;


// Renderer
const renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );
app.append( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// Animate function
function animate() {
	requestAnimationFrame( animate );
	
	cube.rotation.x += 0.0025;
	cube.rotation.y += 0.00;

	renderer.render( scene, camera );
}

animate();



// Resizing the scene


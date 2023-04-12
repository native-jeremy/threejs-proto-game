const app = document.querySelector('#app');
const colorParam = '#fffff';

const scene = new THREE.Scene();
scene.background = new THREE.Color(colorParam.color);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
app.append( renderer.domElement );


const geometry = new THREE.BoxGeometry( 3, 2, 2 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const texture = new THREE.TextureLoader().load('images/native.jpg');
texture.magFilter = THREE.NearestFilter;
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};


camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

	renderer.render( scene, camera );
}

animate();
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 2;
  const camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 0.25, 16 );
  camera.position.set( 0, 1.3, 3 );

  const scene = new THREE.Scene();

  // light 
  {
    scene.add( new THREE.AmbientLight( 0x505050 ) );

    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set( 2, 3, 3 );
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add( spotLight );

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    // light.position.set( 0, 3, 0 );
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 10;

    light.shadow.camera.right = 1;
    light.shadow.camera.left = - 1;
    light.shadow.camera.top	= 1;
    light.shadow.camera.bottom = - 1;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);
    
  }


  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue


  function makeInstance(geometry, properties, x, y) {
        const material = new THREE.MeshPhongMaterial(properties);
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);

        cube.position.x = x;
        cube.position.y = y;

        return cube;
    }

  const cubes = [
    makeInstance(geometry, {color: 0x44aa88,shininess: 100, }, 0, 1),
    // makeInstance(geometry, 0x8844aa, -1.8),
    // makeInstance(geometry, 0xaa8844, 1.8),
  ];

  // adjust resolutions of cubes to match display size
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.0007;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rotationSpeed = time * speed;
        // cube.rotation.x = rotationSpeed;
        // cube.rotation.y = rotationSpeed;
        
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  //Ground 
  // const ground = new THREE.Mesh(
  //   new THREE.PlaneGeometry( 9, 9, 1, 1 ),
  //   new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
  // );

  // ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
  // ground.receiveShadow = true;
  // scene.add( ground );

  // Controls

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 1, 0 );
  controls.update();

  requestAnimationFrame(render);

}
console.log("loading file");
main();
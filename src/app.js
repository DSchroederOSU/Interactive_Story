import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
  },
  actions: {
    loadGraphics: ({commit}, element) => {
      buildScene(element);
    }
  }
})
new Vue({
    store,
    el: '#app',
    render: h => h(App)
})

function buildScene(element) {
  let container = element;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / (window.innerHeight) , 0.1, 50 );
  camera.position.z = 20;

  var renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000, 1 );
  document.getElementById("myScreen").appendChild( renderer.domElement );

  var orbit = new OrbitControls( camera, renderer.domElement );
  orbit.enableZoom = false;

  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

  lights[ 0 ].position.set( 0, 200, 0 );
  lights[ 1 ].position.set( 100, 200, 100 );
  lights[ 2 ].position.set( - 100, - 200, - 100 );

  scene.add( lights[ 0 ] );
  scene.add( lights[ 1 ] );
  scene.add( lights[ 2 ] );

  var geometry = new THREE.OctahedronGeometry(10, 3);

  var wireframe = new THREE.WireframeGeometry( geometry );

  var line = new THREE.LineSegments( wireframe );
  line.material.depthTest = false;
  line.material.opacity = 0.8;
  line.material.transparent = true;
  scene.add( line );
  var animate = function () {
      requestAnimationFrame( animate );
      camera.position.z -= 0.01;
      renderer.render( scene, camera );
  };
  var render = function () {
      renderer.render( scene, camera );
  };
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  render();
  // See https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
  // Handle all clicks to determine of a three.js object was clicked and trigger its callback
  function onDocumentMouseDown(event) {
      event.preventDefault();

      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects([line]);

      if (intersects.length > 0) {
          playSound();
          animate();
      }

  }

  document.addEventListener('mousedown', onDocumentMouseDown, false);
}

function playSound(){
  var audio = document.getElementById('music');
  audio.play();
}

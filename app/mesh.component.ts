import { Component, ViewChild, ElementRef } from '@angular/core';
import GLTFLoader from 'three-gltf-loader';

declare const THREE: any;

@Component({
  selector: 'mesh',
  template: `<div #rendererContainer></div>`,
  styles: []
})
export class MeshComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene = null;
  camera = null;
  mesh = null;
  controls = null;

  constructor() {
    this.scene = new THREE.Scene();
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 5;
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.controls = new THREE.OrbitControls(this.camera);    
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();
    
    this.createMesh();

    this.animate();
  }

  configCamera() {
    this.camera.position.set(400, 400, 400);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.margin = "auto";
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan  = false;
    this.controls.update();
  }

  createMesh() {
    // const geometry = new THREE.BoxGeometry(200, 200, 200);
    // // const material = new THREE.MeshBasicMaterial({ color: 191919 });
    // // const material = new THREE.MeshNormalMaterial({ color: 191919 });
    // // const material = new THREE.MeshStandardMaterial({ color: 191919 });
    const material = new THREE.MeshPhongMaterial({ color: 191919 });


    // const geometry = new THREE.Geometry();

    // geometry.vertices.push(
    //   new THREE.Vector3(-1, -1,  1),  // 0
    //   new THREE.Vector3( 1, -1,  1),  // 1
    //   new THREE.Vector3(-1,  1,  1),  // 2
    //   new THREE.Vector3( 1,  1,  1),  // 3
    //   new THREE.Vector3(-1, -1, -1),  // 4
    //   new THREE.Vector3( 1, -1, -1),  // 5
    //   new THREE.Vector3(-1,  1, -1),  // 6
    //   new THREE.Vector3( 1,  1, -1),  // 7
    // );

    // geometry.faces.push(
    //   // front
    //   new THREE.Face3(0, 3, 2),
    //   new THREE.Face3(0, 1, 3),
    //   // right
    //   new THREE.Face3(1, 7, 3),
    //   new THREE.Face3(1, 5, 7),
    //   // back
    //   new THREE.Face3(5, 6, 7),
    //   new THREE.Face3(5, 4, 6),
    //   // left
    //   new THREE.Face3(4, 2, 6),
    //   new THREE.Face3(4, 0, 2),
    //   // top
    //   new THREE.Face3(2, 7, 6),
    //   new THREE.Face3(2, 3, 7),
    //   // bottom
    //   new THREE.Face3(4, 1, 0),
    //   new THREE.Face3(4, 5, 1),
    // );


  const gltfLoader = new GLTFLoader();
    const url = 'https://stackblitz.com/files/threejs-meshcube-kkpbgx/github/RayOlivier/threejs-spike/master/app/assets/protoCanvas.glb';
    gltfLoader.load(url, (gltf) => {
      console.log(gltf)
      const root = gltf.scene;
      this.scene.add(root);
    });

    // this.mesh = new THREE.Mesh(geometry, material);

    // this.scene.add(this.mesh);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

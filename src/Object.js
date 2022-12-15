import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import SetUp from "./Setup";

export default class Object {
  setUp = new SetUp();
  group = this.setUp.group;
  groupModel = this.setUp.groupModel;
  scene = this.setUp.scene;
  constructor() {
    this.sphere();
    this.cylinder();
    this.loadFloor();
    this.addModel('/models/batman.glb') 
  }
  loadFloor() {
    const gltfLoader = new GLTFLoader();
    let floor;
    gltfLoader.loadAsync("/models/floorPlan.glb").then((gltf) => {
      floor = gltf.scene;
      for(let i = 0; i < floor.children.length; i++){
        floor.children[i].userData.name = "Plane";
        floor.children[i].userData.type = "Plane";
      };
      this.group.add(floor);
      this.group.position.set(0, 1, 0);
      this.group.scale.set(3, 3, 3);
      this.group.castShadow = true;
      this.group.receiveShadow = true;
      this.group.userData.name = "Plane";
      this.group.userData.type = "Plane";
      this.scene.add(this.group);
    });
  }


  sphere() {
    const sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(4, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 })
    );
    sphere.position.set(15, 4, -15);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    this.scene.add(sphere);
    sphere.userData.name = "SPHERE";
    sphere.userData.material = "Vibranium";
  }

  cylinder() {
    const cylinder = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(4, 4, 6, 32),
      new THREE.MeshPhongMaterial({ color: 0x90ee90 })
    );
    cylinder.position.set(-15, 3, 15);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    this.scene.add(cylinder);
    cylinder.userData.draggable = true;
    cylinder.userData.name = "CYLINDER";
    cylinder.userData.material = "Vibranium";
  }

  loadModel(model) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.loadAsync(model).then((gltf) => {
      this.groupModel.add(gltf.scene)
      this.groupModel.position.set(0, 0, 0);
      this.groupModel.scale.set(10, 10, 10);
      this.groupModel.castShadow = true;
      this.groupModel.receiveShadow = true;
      this.groupModel.userData.draggable = true;
      this.scene.add(this.groupModel);
      this.groupModel.userData.name = "BATMANGLTF";
      this.groupModel.userData.material = "Vibranium";
    });
  }

  addModel(model){
    const modelList = document.getElementById('modelList');
    modelList.addEventListener("click", () => {
      this.loadModel(model);
    })
  }
}

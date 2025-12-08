import * as THREE from 'three';

export default class InfoPanel {
  constructor(app) {
    this.app = app;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.container = null;
    this.selectedObject = null;
    
    this.init();
    this.setupListeners();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'info-panel';
    Object.assign(this.container.style, {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '15px',
      borderRadius: '8px',
      display: 'none',
      maxWidth: '300px',
      pointerEvents: 'none',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #333'
    });
    
    document.body.appendChild(this.container);
  }

  setupListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      this.checkIntersection();
    });
    
    window.addEventListener('click', (e) => {
        if (this.selectedObject) {
            console.log('Clicked:', this.selectedObject);
            // Could zoom to object or show more details
        }
    });
  }

  checkIntersection() {
    if (!this.app.sceneManager.districts) return;
    
    this.raycaster.setFromCamera(this.mouse, this.app.camera);
    
    // Intersect with all district meshes
    const districts = this.app.sceneManager.districts.districts;
    if (!districts) return;
    
    const intersects = [];
    
    districts.forEach(group => {
        // InstancedMesh is inside group
        group.traverse(child => {
            if (child.isInstancedMesh) {
                const tempIntersects = this.raycaster.intersectObject(child);
                if (tempIntersects.length > 0) {
                    intersects.push(...tempIntersects);
                }
            }
        });
    });

    if (intersects.length > 0) {
      intersects.sort((a, b) => a.distance - b.distance);
      const intersection = intersects[0];
      const instanceId = intersection.instanceId;
      
      // We need to map instanceId back to data?
      // Since we just generated them, we don't have easy mapping unless we stored userData per instance.
      // For MVP, we can just show generic info or District info.
      
      // Let's find which district group this mesh belongs to
      let districtGroup = intersection.object.parent;
      
      // In DistrictBuilder, we didn't explicitly name groups with ID, but we can infer or check
      // Or just show "Building"
      
      this.showInfo({
        title: 'Building',
        type: 'Type: ' + (intersection.object.material.color.getHexString() === '00ffff' ? 'Landmark' : 'Generic'),
        distance: `Distance: ${intersection.distance.toFixed(1)}m`
      });
      
      this.selectedObject = intersection;
      document.body.style.cursor = 'pointer';
    } else {
      this.hideInfo();
      this.selectedObject = null;
      document.body.style.cursor = 'default';
    }
  }

  showInfo(data) {
    this.container.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #00ffff">${data.title}</h3>
      <p style="margin: 5px 0">${data.type}</p>
      <p style="margin: 5px 0; color: #888">${data.distance}</p>
    `;
    this.container.style.display = 'block';
  }

  hideInfo() {
    this.container.style.display = 'none';
  }
}

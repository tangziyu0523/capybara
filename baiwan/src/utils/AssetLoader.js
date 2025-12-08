import * as THREE from 'three';

class AssetLoader extends THREE.EventDispatcher {
  constructor() {
    super();
    this.textureLoader = new THREE.TextureLoader();
    this.fileLoader = new THREE.FileLoader();
    this.items = {};
    this.toLoad = 0;
    this.loaded = 0;
  }

  load(assets) {
    this.toLoad = assets.length;
    this.loaded = 0;

    if (this.toLoad === 0) {
      this.dispatchEvent({ type: 'loaded' });
      return;
    }

    for (const asset of assets) {
      const { name, type, path } = asset;
      this.loadItem(name, type, path);
    }
  }

  loadItem(name, type, path) {
    const onValues = (item) => {
      this.items[name] = item;
      this.loaded++;
      this.dispatchEvent({ 
        type: 'progress', 
        itemsLoaded: this.loaded, 
        itemsTotal: this.toLoad,
        ratio: this.loaded / this.toLoad 
      });

      if (this.loaded === this.toLoad) {
        this.dispatchEvent({ type: 'loaded' });
      }
    };

    const onError = (err) => {
      console.error(`Error loading ${name}:`, err);
    };

    if (type === 'texture') {
      this.textureLoader.load(path, onValues, undefined, onError);
    } else if (type === 'json') {
      this.fileLoader.load(path, (data) => {
        onValues(JSON.parse(data));
      }, undefined, onError);
    } else {
      console.warn(`Unknown asset type: ${type}`);
    }
  }

  get(name) {
    return this.items[name];
  }
}

export default new AssetLoader();

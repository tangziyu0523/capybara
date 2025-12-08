export default class LoadingScreen {
  constructor(assetLoader) {
    this.assetLoader = assetLoader;
    this.container = null;
    this.progressBar = null;
    
    this.init();
    this.setupListeners();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'loading-screen';
    Object.assign(this.container.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '9999',
      transition: 'opacity 0.5s ease-out',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    });

    const title = document.createElement('h1');
    title.textContent = 'XuanYi City 3D';
    title.style.marginBottom = '20px';
    
    const progressContainer = document.createElement('div');
    Object.assign(progressContainer.style, {
      width: '300px',
      height: '4px',
      backgroundColor: '#333',
      borderRadius: '2px',
      overflow: 'hidden'
    });

    this.progressBar = document.createElement('div');
    Object.assign(this.progressBar.style, {
      width: '0%',
      height: '100%',
      backgroundColor: '#00ffff',
      transition: 'width 0.2s linear'
    });

    progressContainer.appendChild(this.progressBar);
    this.container.appendChild(title);
    this.container.appendChild(progressContainer);
    
    document.body.appendChild(this.container);
  }

  setupListeners() {
    this.assetLoader.addEventListener('progress', (e) => {
      const percent = Math.round(e.ratio * 100);
      this.progressBar.style.width = `${percent}%`;
    });

    this.assetLoader.addEventListener('loaded', () => {
      this.progressBar.style.width = '100%';
      setTimeout(() => {
        this.container.style.opacity = '0';
        setTimeout(() => {
          this.container.remove();
        }, 500);
      }, 500);
    });
    
    // Simulate loading for demo if no real assets
    if (this.assetLoader.toLoad === 0) {
        // Fake progress
        let p = 0;
        const interval = setInterval(() => {
            p += 0.1;
            this.progressBar.style.width = `${Math.min(p * 100, 100)}%`;
            if (p >= 1) {
                clearInterval(interval);
                setTimeout(() => {
                    this.container.style.opacity = '0';
                    setTimeout(() => {
                        this.container.remove();
                    }, 500);
                }, 200);
            }
        }, 50);
    }
  }
}

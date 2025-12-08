import * as THREE from 'three';

/**
 * Manages the day/night cycle, including sun position, sky color, and lighting intensity.
 */
export default class DayNightSystem {
  /**
   * @param {THREE.Scene} scene - The scene to apply lighting to.
   */
  constructor(scene) {
    this.scene = scene;

    this.params = {
      time: 0.5, // 0.0 to 1.0, starts at noon
      speed: 0.01,
      autoCycle: false,
      radius: 500 // Sun distance
    };

    // Lights
    this.sunLight = null;
    this.ambientLight = null;
    this.hemiLight = null;

    // Colors (Keyframes) - Golden Hour / Eco-Futurist Theme
    this.colors = {
      night: new THREE.Color(0x050510), // Deep blue/black
      dawn: new THREE.Color(0xff9966),  // Warm orange
      day: new THREE.Color(0xffeebb),   // Warm sunlight (Golden)
      dusk: new THREE.Color(0xff7755)   // Reddish orange
    };

    this.init();
  }

  init() {
    // 1. Sun Light (Directional)
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 1000;

    const d = 400;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;

    // Soft shadows
    this.sunLight.shadow.radius = 2;
    this.sunLight.shadow.bias = -0.0005;

    this.scene.add(this.sunLight);

    // 2. Ambient Light
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(this.ambientLight);

    // 3. Hemisphere Light
    this.hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.6);
    this.scene.add(this.hemiLight);

    // Initial update
    this.update(0);
  }

  /**
   * Updates the system based on elapsed time.
   * @param {number} delta - Time delta since last frame.
   */
  update(delta) {
    if (this.params.autoCycle) {
      this.params.time += this.params.speed * delta;
      if (this.params.time > 1.0) this.params.time -= 1.0;
    }

    const time = this.params.time;

    // 1. Calculate Sun Position
    // Map time 0..1 to angle -PI/2 .. 3PI/2
    // 0.25 = Dawn (0 rad), 0.5 = Noon (PI/2 rad), 0.75 = Dusk (PI rad)
    const angle = (time - 0.25) * Math.PI * 2;

    const x = Math.cos(angle) * this.params.radius;
    const y = Math.sin(angle) * this.params.radius;
    const z = Math.sin(angle * 0.5) * 100; // Slight tilt for seasonal effect

    this.sunLight.position.set(x, y, z);
    this.sunLight.lookAt(0, 0, 0);

    // 2. Calculate Colors based on Phase
    let skyColor = new THREE.Color();
    let sunColor = new THREE.Color();
    let lightIntensity = 0;
    let ambientIntensity = 0;

    // Phases
    // Night: 0.8 - 0.2 (wrap around)
    // Dawn: 0.2 - 0.3
    // Day: 0.3 - 0.7
    // Dusk: 0.7 - 0.8

    if (time >= 0.2 && time < 0.3) {
      // Dawn
      const t = (time - 0.2) / 0.1;
      skyColor.lerpColors(this.colors.night, this.colors.dawn, t);
      sunColor.lerpColors(new THREE.Color(0x4444ff), new THREE.Color(0xffaa00), t);
      lightIntensity = THREE.MathUtils.lerp(0.1, 0.8, t);
      ambientIntensity = THREE.MathUtils.lerp(0.1, 0.4, t);
    } else if (time >= 0.3 && time < 0.7) {
      // Day
      // Fade from dawn to day, then stay day, then day to dusk?
      // Let's split Day into Morning (0.3-0.4) and Afternoon (0.6-0.7) if needed
      // Or just lerp smoothly.

      if (time < 0.5) {
        // Morning: Dawn -> Day
        const t = (time - 0.3) / 0.2;
        skyColor.lerpColors(this.colors.dawn, this.colors.day, t);
        sunColor.lerpColors(new THREE.Color(0xffaa00), new THREE.Color(0xffffff), t);
        lightIntensity = THREE.MathUtils.lerp(0.8, 1.2, t);
        ambientIntensity = THREE.MathUtils.lerp(0.4, 0.6, t);
      } else {
        // Afternoon: Day -> Dusk color starts fading in?
        // Actually spec says Day is 0.3-0.7.
        // Let's keep it simple: 0.3-0.5 blend to peak, 0.5-0.7 blend to dusk start?
        // Spec: "Sky color is bright blue... between 0.30 and 0.70".
        // So maybe just constant blue? Or subtle gradient.

        const distFromNoon = Math.abs(time - 0.5) / 0.2; // 0 at noon, 1 at 0.3/0.7
        skyColor.lerpColors(this.colors.day, this.colors.day, 1.0); // Constant day blue
        sunColor.setHex(0xffffff);
        lightIntensity = 1.2 - distFromNoon * 0.2;
        ambientIntensity = 0.6 - distFromNoon * 0.1;
      }
    } else if (time >= 0.7 && time < 0.8) {
      // Dusk
      const t = (time - 0.7) / 0.1;
      skyColor.lerpColors(this.colors.day, this.colors.dusk, t);
      sunColor.lerpColors(new THREE.Color(0xffffff), new THREE.Color(0xff5500), t);
      lightIntensity = THREE.MathUtils.lerp(1.0, 0.1, t);
      ambientIntensity = THREE.MathUtils.lerp(0.5, 0.2, t);
    } else {
      // Night (0.8 - 1.0 and 0.0 - 0.2)
      // Normalize time for night phase
      let t = 0;
      if (time >= 0.8) {
        t = (time - 0.8) / 0.2; // 0.0 to 1.0 (first half of night)
        skyColor.lerpColors(this.colors.dusk, this.colors.night, t);
      } else {
        t = time / 0.2; // 0.0 to 1.0 (second half of night)
        skyColor.lerpColors(this.colors.night, this.colors.night, t); // Stay night
      }

      sunColor.setHex(0x111133); // Moonlight
      lightIntensity = 0.1;
      ambientIntensity = 0.1;
    }

    // Apply values
    this.scene.background = skyColor;
    this.scene.fog = new THREE.FogExp2(skyColor, 0.002); // Add fog for depth

    this.sunLight.color.copy(sunColor);
    this.sunLight.intensity = lightIntensity;

    this.ambientLight.color.copy(skyColor);
    this.ambientLight.intensity = ambientIntensity;

    this.hemiLight.color.copy(skyColor);
    this.hemiLight.groundColor.setHex(0x332211).lerp(new THREE.Color(0x000000), 1.0 - ambientIntensity);
    this.hemiLight.intensity = ambientIntensity;
  }
}

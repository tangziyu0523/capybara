import './style.css';
import Application from './core/Application.js';

console.log('XuanYi City 3D MVP Initializing...');

window.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  window.app = app; // For debug
});

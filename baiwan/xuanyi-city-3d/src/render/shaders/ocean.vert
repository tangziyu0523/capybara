uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveFrequency;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vUv = uv;

    vec3 pos = position;

    // Gerstner wave 1 - Primary wave
    float wave1 = sin(pos.x * uWaveFrequency + uTime) * uWaveHeight;

    // Gerstner wave 2 - Secondary wave at angle
    float wave2 = sin(pos.z * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveHeight * 0.6;

    // Gerstner wave 3 - Diagonal wave
    float wave3 = sin((pos.x + pos.z) * uWaveFrequency * 0.5 + uTime * 0.7) * uWaveHeight * 0.3;

    // Combine waves
    pos.y += wave1 + wave2 + wave3;

    // Calculate normal from wave derivatives
    float dx = cos(pos.x * uWaveFrequency + uTime) * uWaveHeight * uWaveFrequency;
    float dz = cos(pos.z * uWaveFrequency * 0.8 + uTime * 1.2) * uWaveHeight * 0.6 * uWaveFrequency * 0.8;
    float dxz = cos((pos.x + pos.z) * uWaveFrequency * 0.5 + uTime * 0.7) * uWaveHeight * 0.3 * uWaveFrequency * 0.5;

    vNormal = normalize(vec3(-dx - dxz, 1.0, -dz - dxz));

    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}

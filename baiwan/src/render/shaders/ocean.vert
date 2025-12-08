uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveSpeed;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// Gerstner Wave Function
vec3 gerstnerWave(vec2 coord, float steepness, float amplitude, float frequency, float speed, float time, inout vec3 tangent, inout vec3 binormal) {
    float x = coord.x * frequency + time * speed;
    float z = coord.y * frequency + time * speed;
    
    float c = cos(x);
    float s = sin(x); // Using x for both x/z direction simplified, usually direction vector involved
    
    // Simplified directional wave (moving diagonally for interest)
    // Let's do 3 waves with different directions
    return vec3(0.0);
}

// Better implementation based on GPU Gems or standard Three.js examples logic
struct Wave {
    vec2 direction;
    float steepness;
    float wavelength;
};

vec3 calculateGerstnerWave(Wave wave, vec3 p, float time, inout vec3 tangent, inout vec3 binormal) {
    float k = 2.0 * 3.14159 / wave.wavelength;
    float c = sqrt(9.8 / k); // phase speed
    vec2 d = normalize(wave.direction);
    float f = k * (dot(d, p.xz) - c * time * uWaveSpeed);
    float a = wave.steepness / k; // amplitude
    
    float cosf = cos(f);
    float sinf = sin(f);
    
    // Displacement
    vec3 displacement = vec3(
        d.x * (a * cosf),
        a * sinf,
        d.y * (a * cosf)
    );
    
    // Derivatives for Normal
    float wa = k * a; // steepness
    float s = sinf;
    float c_der = cosf;
    
    // Tangent (derivative with respect to x)
    tangent += vec3(
        -d.x * d.x * (wa * s),
        d.x * (wa * c_der),
        -d.x * d.y * (wa * s)
    );

    // Binormal (derivative with respect to z)
    binormal += vec3(
        -d.x * d.y * (wa * s),
        d.y * (wa * c_der),
        -d.y * d.y * (wa * s)
    );
    
    return displacement;
}

void main() {
    vUv = uv;
    
    vec3 gridPoint = position;
    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 finalPos = gridPoint;
    
    // Wave 1
    Wave w1 = Wave(vec2(1.0, 1.0), 0.15, 60.0);
    finalPos += calculateGerstnerWave(w1, gridPoint, uTime, tangent, binormal);
    
    // Wave 2
    Wave w2 = Wave(vec2(1.0, 0.6), 0.15, 31.0);
    finalPos += calculateGerstnerWave(w2, gridPoint, uTime, tangent, binormal);
    
    // Wave 3
    Wave w3 = Wave(vec2(1.0, 1.3), 0.15, 18.0);
    finalPos += calculateGerstnerWave(w3, gridPoint, uTime, tangent, binormal);
    
    // Apply scaling to height
    finalPos.y *= uWaveHeight;

    vec3 normal = normalize(cross(binormal, tangent));
    vNormal = normalize(normalMatrix * normal);
    
    vec4 worldPosition = modelMatrix * vec4(finalPos, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
}

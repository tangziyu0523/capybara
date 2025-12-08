uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform float uTime;
uniform samplerCube envMap;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// Simple noise for caustics
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
}

void main() {
    vec3 viewVector = normalize(vViewPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel
    float fresnelTerm = dot(viewVector, normal);
    fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
    fresnelTerm = pow(fresnelTerm, 3.0); // Adjustable power
    
    // Color blending based on height/fresnel/simple factor
    // For now, simple mix
    vec3 waterColor = mix(uDeepColor, uShallowColor, fresnelTerm * 0.5 + 0.2);
    
    // Environment Reflection (Approximated or using envMap if available)
    // We'll assume envMap is set, otherwise fallback
    vec3 reflected = reflect(-viewVector, normal);
    
    // Simple reflection sampling (if envMap is present, usually handled by Three.js define)
    // For custom shader without #include <common>, we might need to handle env map manually
    // or just use a simple color gradient for reflection if no env map
    
    // Caustics (procedural)
    float causticScale = 20.0;
    float causticSpeed = 0.5;
    float c1 = noise(vWorldPosition.xz * 0.1 + uTime * 0.1);
    float c2 = noise(vWorldPosition.xz * 0.08 - uTime * 0.05);
    float caustic = (c1 + c2) * 0.5;
    
    // Combine
    vec3 finalColor = waterColor;
    
    // Add fake reflection (sky color)
    vec3 skyColor = vec3(0.6, 0.8, 1.0); // Day sky
    finalColor = mix(finalColor, skyColor, fresnelTerm * 0.8);
    
    // Add caustics
    finalColor += vec3(caustic * 0.1);
    
    gl_FragColor = vec4(finalColor, 0.9); // Slight transparency
    
    // Tone mapping (basic)
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}

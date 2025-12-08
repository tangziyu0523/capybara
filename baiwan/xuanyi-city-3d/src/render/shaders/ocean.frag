uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform vec3 uFresnelColor;
uniform float uFresnelPower;
uniform float uTime;
uniform samplerCube uEnvMap;
uniform bool uEnvMapEnabled;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);

    // Fresnel effect - stronger reflection at grazing angles
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), uFresnelPower);

    // Depth-based color blending
    float depth = smoothstep(-5.0, 5.0, vWorldPosition.y);
    vec3 waterColor = mix(uDeepColor, uShallowColor, depth);

    // Environment reflection
    vec3 reflectDir = reflect(-viewDirection, normal);
    vec3 envColor = waterColor;

    if (uEnvMapEnabled) {
        envColor = textureCube(uEnvMap, reflectDir).rgb;
    }

    // Blend water color with reflection based on fresnel
    vec3 finalColor = mix(waterColor, envColor, fresnel * 0.6);

    // Add fresnel highlight
    finalColor += uFresnelColor * fresnel * 0.3;

    // Simplified caustics effect
    float caustics = sin(vWorldPosition.x * 2.0 + uTime * 2.0) *
                    sin(vWorldPosition.z * 2.0 + uTime * 1.7) * 0.05;
    caustics = max(caustics, 0.0);
    finalColor += vec3(caustics);

    // Subtle foam at wave peaks
    float foam = smoothstep(0.5, 1.5, vWorldPosition.y - vNormal.y * 0.5);
    finalColor = mix(finalColor, vec3(1.0), foam * 0.2);

    gl_FragColor = vec4(finalColor, 0.85);
}

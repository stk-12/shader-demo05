// varying vec2 vUv;

// uniform float uTime;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

varying float vElevation;

void main() {
  // vec2 uv = vUv;
  
  vec3 color = mix(uDepthColor, uSurfaceColor, vElevation);
  gl_FragColor = vec4(color, 1.0);
  // gl_FragColor = vec4(color, 1.0);
}
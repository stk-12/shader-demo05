// varying vec2 vUv;

uniform float uTime;
uniform float uWave;
uniform float uWaveSpeed;
uniform vec2 uFrequency;

varying float vElevation;

void main() {
  // vUv = uv;
  // vec3 pos = position;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x + uTime * uWaveSpeed) * uWave
                  * sin(modelPosition.z * uFrequency.y + uTime * uWaveSpeed) * uWave;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vElevation = elevation;
}
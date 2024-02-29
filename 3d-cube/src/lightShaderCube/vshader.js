export default  `

uniform float u_time;
attribute float random;
varying vec3 f_normal;

void main(){
   f_normal = normal;
   vec4 randomPosition = vec4(position * clamp(random , 0.8 , 1.0) , 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix * randomPosition;
}

`
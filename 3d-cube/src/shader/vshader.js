export default `

varying vec2 uvu;

 void main (){

      uvu = uv;

    gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 0.1);
 }
`
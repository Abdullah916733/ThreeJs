export default `

uniform float parameter;
uniform sampler2D textureFirst;
uniform sampler2D textureSecond;
uniform sampler2D textureThird;
varying vec2 uvu;


void main(){

    /*
    vec4 pixel = gl_FragCoord;
    gl_FragColor = vec4( cos(pixel.x * 0.01 + parameter)  , sin(pixel.y * 0.01 + parameter) , sin(pixel.z + parameter)  , 1.0); 
    */
   
   /* gl_FragColor.r = sin(parameter) ; */

   vec4 imageFirst = texture(textureFirst , uvu);
   vec4 imageSecond = texture(textureSecond , uvu);
   vec4 imageThird = texture(textureThird , uvu);


   float mixImageNumber =  sin( imageThird.r +  parameter);
   mixImageNumber = mixImageNumber * mixImageNumber;

    gl_FragColor = mix( imageFirst , imageSecond , mixImageNumber );


}

`;

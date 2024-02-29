
export default `

varying vec3 f_normal;

void main(){

    vec3 lightPosition = vec3(1,0,0);
    vec3 lightColor = vec3(1.0,1.0,1.0);

    vec3 color = lightColor * dot(lightPosition , f_normal);

    gl_FragColor = vec4(color , 1.0);

}

`
function initializeScene() {
    // custom state start
    function useState(initialValue) {
        let state = initialValue;

        function setState(newState) {
            state = newState;
            return state;
        }

        return [state, setState];
    }

    function useGetActiveFunc(initialValue) {
        let state = initialValue;

        function setState(newState) {
            state = newState;
            return state;
        }

        return [state, setState];
    }

    // custom state end

    const [boxValue, setBoxValue] = useState({
        width: 200,
        height: 200,
        depthInput: 200,
        box_category: "",
        color: ["", "", "", "", "", ""],
        image: ["", "", "", "", "", ""],
        text: ["", "", "", "", "", ""],
        text_color: ["", "", "", "", "", ""],
    });

    let [getActiveState, getActiveStateFunc] = useGetActiveFunc(null);

    // Create a scene, camera, and renderer using Three.js start

    const container = document.getElementById("cube-container");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor("#f7f7f7");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Create a scene, camera, and renderer using Three.js end

    // Add a click event listener to the button start

    const colorInput = document.getElementById("color");
    const saveButton = document.getElementById("saveButton");
    let widthInput = document.getElementById("width");
    let heightInput = document.getElementById("height");
    let depthInput = document.getElementById("depth");
    const size_select = document.querySelectorAll("#size-form li");
    const myDropdown = document.querySelector("#myDropdown");
    const custom_header = document.querySelector("#custom-header");
    const box_size = document.getElementById("box_size");

    // console.log(size_select);

    widthInput.value = boxValue.width;
    heightInput.value = boxValue.height;
    depthInput.value = boxValue.depthInput;
    colorInput.value = "#e7e7e7";
    widthInput.disabled = true;
    heightInput.disabled = true;
    depthInput.disabled = true;
    saveButton.disabled = true;

    // Add a click event listener to the button end

    // box geometry start

    const cubeGeometry = new THREE.BoxGeometry(
        Number(widthInput.value),
        Number(heightInput.value),
        Number(depthInput.value)
    );

    const faceMaterials = [
        new THREE.MeshStandardMaterial({
            color: 0xe7e7e7,
        }), // Red material for the right face   0
        new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Green material for the left face   1
        new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Blue material for the top face  2
        new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Yellow material for the bottom face  3
        new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Magenta material for the front face  4
        new THREE.MeshStandardMaterial({ color: 0xe7e7e7 }), // Cyan material for the back face   5
    ];

    const cube = new THREE.Mesh(cubeGeometry, faceMaterials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // box geometry end

    // add size functionality start
    for (let i = 0; i < size_select.length; i++) {
        size_select[i].addEventListener("click", (e) => {
            const sizeValue = e.target.dataset.size;
            const sizeSplit = sizeValue.split(",");
            let width = sizeSplit[0];
            let height = sizeSplit[1];
            let depth = sizeSplit[2];
            widthValue = width;
            heightValue = height;
            depthValue = depth;
            widthInput.value = widthValue;
            heightInput.value = heightValue;
            depthInput.value = depthValue;
            setBoxValue((boxValue.width = widthInput.value));
            setBoxValue((boxValue.height = heightInput.value));
            setBoxValue((boxValue.depth = depthInput.value));
            updateCube(widthValue, heightValue, depthValue);
            myDropdown.click();
            box_size.innerText = sizeValue;
        });
    }

    custom_header.addEventListener("click", function () {
        widthInput.disabled = false;
        heightInput.disabled = false;
        depthInput.disabled = false;
        saveButton.disabled = false;
    });

    document.getElementById("saveButton").addEventListener("click", () => {
        const widthValue = Number(widthInput.value);
        const heightValue = Number(heightInput.value);
        const depthValue = Number(depthInput.value);
        updateCube(widthValue, heightValue, depthValue);
        myDropdown.click();
        box_size.innerText = widthValue + " " + heightValue + " " + depthValue;
    });

    // add size functionality end

    //  face index functionality start

    let activeFaceIndex = 0;
    const setActiveFaceIndex = (val) => {
        activeFaceIndex = val;
        return;
    };
    const setActiveFace = (valFace) => {
        activeFace = valFace;
        return;
    };

    const fabric_canvas = document.querySelectorAll(".fabric_canvas");

    let canvas_0 = new fabric.Canvas(`canvas-0`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    let canvas_1 = new fabric.Canvas(`canvas-1`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    let canvas_2 = new fabric.Canvas(`canvas-2`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    let canvas_3 = new fabric.Canvas(`canvas-3`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    let canvas_4 = new fabric.Canvas(`canvas-4`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    let canvas_5 = new fabric.Canvas(`canvas-5`, {
        width: boxValue.width,
        height: boxValue.height,
    });

    const canvases = [
        canvas_0,
        canvas_1,
        canvas_2,
        canvas_3,
        canvas_4,
        canvas_5,
    ];

    const activeCanvas = () => {
        fabric_canvas.forEach((val, i) => {
            val.style.display = "none";
        });

        fabric_canvas[activeFaceIndex].style.display = "block";

        let heightValue;

        if (activeFaceIndex == 2 || activeFaceIndex == 3) {
            heightValue = boxValue.depthInput;
        } else {
            heightValue = boxValue.height;
        }

        canvases.map((value) => {
            value.setDimensions({
                width: boxValue.width,
                height: heightValue,
            });
        });
    };

    activeCanvas();

    // face index functionality end

    // color functionality start

    let colorsOfFace = [];

    let shouldRotateCube = true;

    let newMaterial = [
        new THREE.MeshStandardMaterial({
            map: boxValue.image[0],
        }),
        new THREE.MeshStandardMaterial({
            map: boxValue.image[1],
        }),
        new THREE.MeshStandardMaterial({
            map: boxValue.image[2],
        }),
        new THREE.MeshStandardMaterial({
            map: boxValue.image[3],
        }),
        new THREE.MeshStandardMaterial({
            map: boxValue.image[4],
        }),
        new THREE.MeshStandardMaterial({
            map: boxValue.image[5],
        }),
    ];

    // Update the color of the cube without affecting the texture

    function updateCube() {
        if (color) {
        }
        const newCubeGeometry = new THREE.BoxGeometry(
            Number(widthInput.value),
            Number(heightInput.value),
            Number(depthInput.value)
        );

        cube.geometry.dispose();
        cube.geometry = newCubeGeometry;

        cube.material = newMaterial;

        if (shouldRotateCube) {
            const startRotation = { x: 0, y: 0 };
            const targetRotation = { x: Math.PI / 6, y: Math.PI / 4 };

            const duration = 1000;
            let startTime = null;

            function animateInitialRotation(timestamp) {
                if (!startTime) startTime = timestamp;

                const progress = timestamp - startTime;
                const t = Math.min(progress / duration, 1);

                cube.rotation.x =
                    startRotation.x + (targetRotation.x - startRotation.x) * t;
                cube.rotation.y =
                    startRotation.y + (targetRotation.y - startRotation.y) * t;

                if (progress < duration) {
                    requestAnimationFrame(animateInitialRotation);
                }
            }

            requestAnimationFrame(animateInitialRotation);
        }
    }

    boxValue.color.map((value) => {
        colorsOfFace.push(value);
    });

    const colorPicker = document.getElementById("colorPicker");

    colorInput.addEventListener("change", function () {
        const colorValue = colorInput.value;

        canvases.map((value) => {
            value.setBackgroundColor(colorValue, value.renderAll.bind(value));
            value.renderAll();
        });

        newMaterial.map((val, i) => {
            let texture;
            texture = new THREE.Texture(document.getElementById(`canvas-${i}`));
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.needsUpdate = true;
            val.map = texture;
            val.needsUpdate = true;
            val.transparent = true;
            setBoxValue((boxValue.image[i] = texture));
            setBoxValue((boxValue.color[i] = colorValue));
        });
        cube.material = newMaterial;
    });

    colorPicker.addEventListener("change", function () {
        const colorValue = colorPicker.value;

        canvases[activeFaceIndex].setBackgroundColor(
            colorValue,
            canvases[activeFaceIndex].renderAll.bind(canvases[activeFaceIndex])
        );
        canvases[activeFaceIndex].renderAll();

        let texture;
        texture = new THREE.Texture(
            document.getElementById(`canvas-${activeFaceIndex}`)
        );
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;
        newMaterial[activeFaceIndex].map = texture;
        newMaterial[activeFaceIndex].needsUpdate = true;
        newMaterial[activeFaceIndex].transparent = true;
        setBoxValue((boxValue.image[activeFaceIndex] = texture));
        setBoxValue((boxValue.color[activeFaceIndex] = colorValue));
        cube.material = newMaterial;
    });

    const text_color = document.getElementById("text-color");

    function setStyle(object, styleName, value) {
        let style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.set(styleName, value);
        object.setCoords();

        canvases.map((value) => {
            value.renderAll();
        });
    }

    text_color.addEventListener("change", function () {
        if (activeFaceIndex == 0) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        } else if (activeFaceIndex == 1) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        } else if (activeFaceIndex == 2) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        } else if (activeFaceIndex == 3) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        } else if (activeFaceIndex == 4) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        } else if (activeFaceIndex == 5) {
            var o = getActiveState;
            setStyle(o, "fill", text_color.value);
        }

        let texture;
        texture = new THREE.Texture(
            document.getElementById(`canvas-${activeFaceIndex}`)
        );
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;
        newMaterial[activeFaceIndex].map = texture;
        newMaterial[activeFaceIndex].needsUpdate = true;
        newMaterial[activeFaceIndex].transparent = true;
        setBoxValue((boxValue.image[activeFaceIndex] = texture));
        setBoxValue((boxValue.color[activeFaceIndex] = colorValue));
        cube.material = newMaterial;
    });

    // color functionality end

    //  face position functionality start

    const faceButtons = document.querySelectorAll(".face-button");

    function getTargetRotation(face) {
        switch (face) {
            case "front":
                return { x: 0.1745, y: 0.3491 };
            case "back":
                return { x: 0.1745, y: Math.PI - 0.3491 };
            case "top":
                const rotationTY = THREE.MathUtils.degToRad(30);
                const rotationTX = THREE.MathUtils.degToRad(-30);
                return { x: Math.PI / 2 + rotationTX, y: 0 };
            case "bottom":
                const rotation = THREE.MathUtils.degToRad(30);
                return { x: -Math.PI / 2 + rotation, y: 0 };
            case "left":
                return {
                    x: 0.1745,
                    y: (Math.PI / 9) * 3 + (Math.PI / 180) * 10,
                };
            case "right":
                return {
                    x: 0.1745,
                    y: (-Math.PI / 9) * 5 - (Math.PI / 180) * 10,
                };
            default:
                return { x: 0, y: 0 };
        }
    }

    function getRotationByFace(face) {
        const duration = 1000;
        const startRotation = { x: cube.rotation.x, y: cube.rotation.y };
        const targetRotation = getTargetRotation(face);

        let startTime = null;

        function animateRotation(timestamp) {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const t = Math.min(progress / duration, 1);

            cube.rotation.x =
                startRotation.x + (targetRotation.x - startRotation.x) * t;
            cube.rotation.y =
                startRotation.y + (targetRotation.y - startRotation.y) * t;

            if (progress < duration) {
                requestAnimationFrame(animateRotation);
            }
        }

        requestAnimationFrame(animateRotation);
        return targetRotation;
    }

    faceButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const face = event.target.dataset.face;
            selectedFace = face;
            setActiveFaceIndex(event.target.dataset.index);
            setActiveFace(event.target.dataset.face);
            faceButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const rotation = getRotationByFace(face);
            cube.rotation.x = rotation.x;
            cube.rotation.y = rotation.y;
        });
    });

    //  face position functionality end

    document.addEventListener("mousewheel", onMouseWheel, false);
    document.addEventListener("DOMMouseScroll", onMouseWheel, false); // For Firefox compatibility

    function onMouseWheel(event) {
        var delta = Math.max(
            -1,
            Math.min(1, event.wheelDelta || -event.detail)
        );
        var newCameraZ = camera.position.z - delta * 1; // Adjust the zoom speed if desired
        // Restrict the camera position between z = 700 and z = 50
        if (newCameraZ <= 800 && newCameraZ >= 300) {
            camera.position.z = newCameraZ;
        }
        // Make the camera always look at the scene's center
        camera.lookAt(scene.position);
    }

    camera.position.z = 550;
    camera.lookAt(scene.position);
    scene.add(camera);

    //this is the function to animate the generated cube by rotating it a bit at the start
    // Set the initial rotation of the cube
    const targetRotationY = Math.PI / 4; // 45 degrees in radians
    const targetRotationX = Math.PI / 6; // 20 degrees in radians

    const startRotation = { x: 0, y: 0 };
    const targetRotation = { x: targetRotationX, y: targetRotationY };
    const duration = 1000; // Animation duration in milliseconds

    let startTime = null;

    function animateInitialRotation(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const t = Math.min(progress / duration, 1); // Calculate the progress of the animation as a value between 0 and 1

        cube.rotation.x =
            startRotation.x + (targetRotation.x - startRotation.x) * t;
        cube.rotation.y =
            startRotation.y + (targetRotation.y - startRotation.y) * t;

        if (progress < duration) {
            requestAnimationFrame(animateInitialRotation);
        }
    }

    requestAnimationFrame(animateInitialRotation);

    // default face select start
    const frontButton = document.getElementById("frontButton");
    frontButton.click();
    // default face select end

    // Create a directional light from top right and back position
    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(150, 300, 900);
    light.shadow.mapSize.width = 2048; // Shadow map width for shadow quality
    light.shadow.mapSize.height = 2048; // Shadow map height for shadow quality
    scene.add(light);

    // Set up shadow properties for the light
    light.shadow.bias = -0.001;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;

    // Render the scene with the camera

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();

    // Rotate the cube on mouse click and drag
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0,
    };

    container.addEventListener("mousedown", function (event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY,
        };
    });

    container.addEventListener("mousemove", function (event) {
        if (isDragging) {
            const mouseDelta = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y,
            };

            const rotationSpeed = 0.01;
            cube.rotation.x += mouseDelta.y * rotationSpeed;
            cube.rotation.x = Math.max(
                Math.min(cube.rotation.x, Math.PI / 2),
                -Math.PI / 2
            );

            cube.rotation.y += mouseDelta.x * rotationSpeed;
            cube.rotation.y = cube.rotation.y % (Math.PI * 2);

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY,
            };
        }
    });

    container.addEventListener("mouseup", function () {
        isDragging = false;
    });

    // Disable context menu on right-click to prevent interference with mouse drag
    container.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    //  image upload functionality section start

    const image_show_modal = document.querySelector(".image_show_modal img");
    const image_show_modal_box = document.querySelector(".image_show_modal");
    const save_design = document.querySelector(".save_design");
    const imageInput = document.getElementById("imageInput");
    const upload_file_box = document.querySelector(".upload-file-box");
    const image_file = document.querySelector(".image-file");
    const delete_object = document.getElementById("delete_object");
    const file = imageInput.files[0];

    function modalBoxSizeFunc() {
        if (activeFaceIndex == 2 || activeFaceIndex == 3) {
            image_show_modal_box.style.height = `${boxValue.depthInput}px`;
            image_show_modal_box.style.width = `${boxValue.width}px`;
        } else {
            image_show_modal_box.style.height = `${boxValue.height}px`;
            image_show_modal_box.style.width = `${boxValue.width}px`;
        }
    }

    save_design.addEventListener("click", function () {
        let getActive = canvases[activeFaceIndex].getActiveObject();
        getActiveStateFunc((getActiveState = getActive));
        canvases[activeFaceIndex].discardActiveObject();
        canvases[activeFaceIndex].renderAll();

        if (!file) {
            let texture;
            texture = new THREE.Texture(
                document.getElementById(`canvas-${activeFaceIndex}`)
            );
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.needsUpdate = true;
            newMaterial[activeFaceIndex].map = texture;
            newMaterial[activeFaceIndex].needsUpdate = true;
            newMaterial[activeFaceIndex].transparent = true;
            setBoxValue((boxValue.image[activeFaceIndex] = texture));
            cube.material = newMaterial;
        } else {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    let texture;
                    texture = new THREE.Texture(
                        document.getElementById(`canvas-${activeFaceIndex}`)
                    );
                    texture.anisotropy =
                        renderer.capabilities.getMaxAnisotropy();
                    texture.needsUpdate = true;
                    newMaterial[activeFaceIndex].map = texture;
                    newMaterial[activeFaceIndex].needsUpdate = true;
                    newMaterial[activeFaceIndex].transparent = true;
                    setBoxValue((boxValue.image[activeFaceIndex] = texture));
                    cube.material = newMaterial;
                };
            };
            reader.readAsDataURL(file);
            image_show_modal.src = null;
        }
    });

    // modal section functionality start

    function doesImageExist() {
        let objects = canvases[activeFaceIndex].getObjects();
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type === "image") {
                return true;
            }
        }

        return false; // No image object found on the canvas
    }

    upload_file_box.addEventListener("click", function (e) {
        if (doesImageExist() == true) {
            activeCanvas();
            modalBoxSizeFunc();
            alert("Only one image you can upload");
        } else {
            image_file.click();
            activeCanvas();
            modalBoxSizeFunc();
        }
    });

    delete_object.addEventListener("click", function () {
        let selectedObject = canvases[activeFaceIndex].getActiveObject();
        if (selectedObject) {
            canvases[activeFaceIndex].remove(selectedObject);
            canvases[activeFaceIndex].renderAll();
        }
    });

    imageInput.addEventListener("change", (e) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                var image = new fabric.Image(imgObj);

                var scaleX = 150 / image.width;
                var scaleY = 150 / image.height;

                image.set({
                    left: 0,
                    top: 0,
                    scaleX: scaleX,
                    scaleY: scaleY,
                });

                canvases[activeFaceIndex].centerObject(image);
                canvases[activeFaceIndex].add(image);
                canvases[activeFaceIndex].renderAll();
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // modal section functionality end

    //  image upload functionality section end

    //  text modal start

    const proceed_button = document.querySelector(".proceed_button");
    const textValue = document.querySelector("#text_value");
    const text_font = document.getElementById("text_font");

    function doesTextExist() {
        let objects = canvases[activeFaceIndex].getObjects();
        console.log(objects);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type === "text") {
                return true;
            }
        }
        return false; // No image object found on the canvas
    }

    proceed_button.addEventListener("click", function () {
        if (doesTextExist() == true) {
            alert("Only one text you can upload");
        } else {
            let textValueCurrent = textValue.value;
            activeCanvas();
            let text = new fabric.Text(textValueCurrent, {
                fontFamily: text_font.value,
                left: 100,
                top: 100,
                fontSize: 20,
                fill: "#000000",
            });

            canvases[activeFaceIndex].centerObject(text);
            canvases[activeFaceIndex].add(text);
            canvases[activeFaceIndex].setActiveObject(text);
            canvases[activeFaceIndex].renderAll();

            modalBoxSizeFunc();
        }
        textValue.value = null;
    });

    //  text modal end

    // right side box details value show functionality start

    const box_category = document.getElementById("box_category");
    const box_category_select = document.getElementById("box_category_select");

    box_category_select.addEventListener("change", function () {
        box_category.innerText = box_category_select.value;
    });

    const box_type_select = document.querySelector(".box-type-select");
    const box_type = document.getElementById("box_type");

    box_type_select.addEventListener("change", function () {
        box_type.innerText = box_type_select.value;
    });

    const box_material_select = document.getElementById("box_material_select");
    const box_material = document.getElementById("box_material");

    box_material_select.addEventListener("change", function () {
        box_material.innerText = box_material_select.value;
    });

    // right side box details value show functionality end
}

// Attempt to initialize the scene immediately
if (typeof THREE === "undefined") {
    loadFallbackThreeJS();
} else {
    initializeScene();
}

// color upload functionality start
const color_box = document.querySelectorAll(".color-box");
const color_input = document.querySelectorAll(".color-box .color-input");

for (let i = 0; i < color_box.length; i++) {
    color_box[i].addEventListener("click", function () {
        color_input[i].click();
        color_input[i].style.setProperty("--content", "none");
    });
}
// color upload functionality end

// image upload functionality start

const upload_file_box = document.querySelector(".upload-file-box");
const image_file = document.querySelector(".image-file");
const file_name = document.querySelector(".file-name span");

image_file.addEventListener("change", function (e) {
    const fileValue = image_file.files[0].name;
    file_name.innerText = fileValue;
});

// image upload functionality end

// input slider range start

const progress = document.querySelector(
    ".select-material-box-third input[type=range]"
);

progress.addEventListener("input", function () {
    const value = this.value;
    progress.style.setProperty("--slider_range", `${value}%`);
});

// input slider range end

//  arrow functionality start

const navigation_arrow_left = document.querySelector(
    ".navigation-arrows .navigation-left-arrow"
);

const navigation_arrow_right = document.querySelector(
    ".navigation-arrows .navigation-right-arrow"
);

const pills_home_tab = document.querySelector("#pills-home-tab");
const pills_profile_tab = document.querySelector("#pills-profile-tab");
const pills_contact_tab = document.querySelector("#pills-contact-tab");

navigation_arrow_left.style.opacity = "0.5";

navigation_arrow_left.addEventListener("click", function () {
    if (pills_home_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "0.5";
        navigation_arrow_right.style.opacity = "1";
        return pills_home_tab.click();
    } else if (pills_profile_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "0.5";
        navigation_arrow_right.style.opacity = "1";
        return pills_home_tab.click();
    } else if (pills_contact_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "1";
        navigation_arrow_right.style.opacity = "1";
        return pills_profile_tab.click();
    }
});

navigation_arrow_right.addEventListener("click", function () {
    if (pills_home_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "1";
        navigation_arrow_right.style.opacity = "1";
        return pills_profile_tab.click();
    } else if (pills_profile_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "1";
        navigation_arrow_right.style.opacity = "0.5";
        return pills_contact_tab.click();
    } else if (pills_contact_tab.classList.contains("active")) {
        navigation_arrow_left.style.opacity = "1";
        navigation_arrow_right.style.opacity = "0.5";
        return pills_contact_tab.click();
    }
});

pills_home_tab.addEventListener("click", function () {
    navigation_arrow_left.style.opacity = "0.5";
    navigation_arrow_right.style.opacity = "1";
});

pills_profile_tab.addEventListener("click", function () {
    navigation_arrow_left.style.opacity = "1";
    navigation_arrow_right.style.opacity = "1";
});

pills_contact_tab.addEventListener("click", function () {
    navigation_arrow_left.style.opacity = "1";
    navigation_arrow_right.style.opacity = "0.5";
});

//  arrow functionality end

// size start

function toggleplusSign() {
    var showContent = document.getElementById("myDropdowns");
    if (showContent.style.display === "none") {
        showContent.style.display = "grid";
    } else {
        showContent.style.display = "none";
    }
}

// size end

//  select category function start

const box_type_option = document.querySelectorAll(".box-type-select option");
const box_category = document.querySelector(".box-category");
const box_type_select = document.querySelector(".box-type-select");

box_type_select.disabled = true;
box_category.addEventListener("change", function (e) {
    let number_value = box_category.value;
    if (number_value == "none_category") {
        box_type_select.disabled = true;
    } else {
        let optionValueSelected = document.querySelectorAll(`.${number_value}`);
        box_type_select.disabled = false;
        box_type_option.forEach((value) => {
            value.style.display = "block";
        });
        optionValueSelected.forEach((value) => {
            value.style.display = "none";
        });
    }
});

// select category function end

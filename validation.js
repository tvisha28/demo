const regexpName = /^[a-zA-Z ]*$/;
const nameElement = document.querySelector(`input[name='name']`);
nameElement.addEventListener('blur', (event) =>{
    validateRegexpression(event.target, regexpName);
});

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailElement = document.querySelector(`input[name='email']`);
emailElement.addEventListener('blur', (event) =>{
    validateRegexpression(event.target, emailRegExp);
});


const dateElement = document.querySelector(`input[name='date']`);
dateElement.addEventListener('blur', (event) => {
    validateRegexpression(dateElement);
});

function validateRegexpression(element, regexp) {
    if (element.value == "" || (regexp && !regexp.test(element.value))) {
        element.nextElementSibling.innerHTML = `Please enter valid ${element.name} !`
        return false;
    }
    element.nextElementSibling.innerHTML = "";
    return true;
}

const country = document.getElementsByName("country");
$(country[0]).blur((event) => {
    validateDropdownList(country);
});

const state = document.getElementsByName("state");
$(state[0]).blur((event) => {
    validateDropdownList(state);
});

const city = document.getElementsByName("city");
$(city[0]).blur((event) => {
    validateDropdownList(city);
});

function validation() {
   
    validateRegexpression(nameElement, regexpName);
   
    validateRegexpression(emailElement, emailRegExp);
    validateRegexpression(dateElement);
    const country = document.getElementsByName("country");
    validateDropdownList(country);
    const state = document.getElementsByName("state");
    validateDropdownList(state);
    const city = document.getElementsByName("city");
    validateDropdownList(city);
    checkGender();
    checkHobby();

    if (validateRegexpression(nameElement, regexpName) == true &&
        validateRegexpression(emailElement, emailRegExp) == true &&
        validateRegexpression(dateElement) == true &&
        validateDropdownList(country) == true &&
        validateDropdownList(state) == true &&
        validateDropdownList(city) == true &&
        checkGender() == true &&
        checkHobby() == true) {
        return true;
    }
    return false;
}

function noValidation(){
    $(".error-message").hide();
    $(".error-messageHobby").hide();
    $(".error-messageGender").hide();
    return false;
}



function validateDropdownList(c) {
    if (c[0].value == "") {
        c[0].nextElementSibling.innerHTML = `Please select valid ${c[0].name} !`
        return false;
    }
    c[0].nextElementSibling.innerHTML = "";
    return true;
}

function checkGender() {
    var gender1 = document.getElementsByName('gender');
    var lblGen = document.getElementsByClassName("error-messageGender")[0];
    var genVal = false;
    for (var i = 0; i < gender1.length; i++) {
        if (gender1[i].checked == true)
            genVal = true;
    }
    if (!genVal) {
        lblGen.innerHTML = "Please select your gender !";
        lblGen.style.color = "red";
        return false;
    } else {
        lblGen.innerHTML = "";
        return true;
    }
}

function checkHobby() {
    var hobbies = document.getElementsByName('cbox');
    var lblHobbies = document.getElementsByClassName("error-messageHobby")[0];
    if (hobbies[0].checked == false && hobbies[1].checked == false && hobbies[2].checked == false) {
        lblHobbies.innerHTML = "Please select your hobbies !";
        lblHobbies.style.color = "red";
        return false;
    }
    else {
        lblHobbies.innerHTML = "";
        return true;
    }
}


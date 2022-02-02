var data;
var obj_list = [
    { name: "Abc", email: "abc@gmail.com", age: 27, date: "2000-10-20", hobby: "Reading", gender: "Male", country: "India", state: "Gujrat", city: "Surat", time: time() },
    { name: "Xyz", email: "xyz@gmail.com", age: 32, date: "2008-06-18", hobby: "Travelling, Sports", gender: "Female", country: "Australia", state: "Victoria", city: "Bendigo", time: time() },
    { name: "Def", email: "def@gmail.com", age: 32, date: "2005-08-02", hobby: "Reading,Travelling ,Sports", gender: "Female", country: "Canada", state: "Columbia", city: "Campamento", time: time() }
];

function time() {
    var d = new Date();
    var t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return t;
}

function tbody(data) {
    $(`tbody[name='demo']`).append("<tr><td>" + obj_list[data].name + "</td><td>" + obj_list[data].email + "</td><td>" + obj_list[data].age + "</td><td>" +
        obj_list[data].hobby + "</td><td>" + obj_list[data].gender + "</td><td>" + obj_list[data].country + "</td><td>" + obj_list[data].state + "</td><td>" +
        obj_list[data].city + "</td><td>" + obj_list[data].time + "</td><td> <input type='submit' class='edit' data-id='" + data + "' value='Edit'></td>" +
        "<td> <input type='submit' class ='delete' data-id='" + data + "' value='Delete'></td>");
}

function display() {
    $(`tbody[name='demo']`).empty();
    $.each(obj_list, function (data) {
        tbody(data);
    });
}

display();

$(`button[type='submit']`).on('click', function () {
    if (validation()) {
        id = $(`input[name='id']`).val();
        var name = $(`input[name='name']`).val();
        var email = $(`input[name='email']`).val();
        var hobby = "";
        var date = $(`input[name='date']`).val();
        var birthDate = new Date(date);
        var difference = Date.now() - birthDate.getTime();
        var ageDate = new Date(difference);
        var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        var age = calculatedAge;
        var gender = $(`input[name='gender']:checked`).val();
        $(`input[name='cbox']:checked`).each(function () {
            hobby += $(this).val() + ",";
        });
        var h = hobby.split(",");
        h.pop();
        var country = $(`select[name='country']`).val();
        var state = $(`select[name='state']`).val();
        var city = $(`select[name='city']`).val();
        form_data = { name: name, email: email, age: age, date: date, hobby: h.toString(), gender: gender, country: country, state: state, city: city, time: time() };
        if (id) {
            obj_list[id] = form_data;
        } else {
            obj_list.push(form_data);
        }
        display();
        clear();
    }
    return false;
});

function clear() {
    $(`input[name='name']`).val("");
    $(`input[name='email']`).val("");
    $(`input[name='date']`).val("");
    $(`input[name='gender']`).prop('checked', false);
    $(`input[type='checkbox']`).prop('checked', false);
    $(`select[name='country']`).val("");
    $(`select[name='state']`).val("");
    $(`select[name='city']`).val("");
}

$("body").on("click", ".edit", function () {
    id = $(this).data("id");
    $(`input[name='id']`).val(id)
    var val = obj_list[id];
    $(`input[name='name']`).val(val.name);
    $(`input[name='email']`).val(val.email);
    $(`input[name='date']`).val(val.date);
    $(`input[name='gender']`).val([val.gender]);
    var hobby = val.hobby.split(",");
    $.each(hobby, function (i) {
        $(`input[name="cbox"][value=${hobby[i]}]`).prop('checked', true);
    });
    getStatesOfCountry(val.country);
    getCitiesOfState(val.country, val.state);
    $(`select[name='country']`).val(val.country);
    $(`select[name='state']`).val(val.state);
    $(`select[name='city']`).val(val.city);
});

$("body").on("click", ".delete", function () {
    deleted_obj_id = $(this).data("id");
    obj_list.splice(deleted_obj_id, 1);
    display();
});

$("body").on("keyup", `input[name='search']`, function () {
    var value = $(`input[name='search']`).val().toUpperCase();
    $(`tbody[name='demo']`).empty();
    $.each(obj_list, function (i) {
        if (obj_list[i].name.toString().toUpperCase().includes(value)) {
            tbody(i);
        }
    });
})

$(`select[name='sort']`).change(function () {
    var s = $(`select[name='sort']`).val();
    if (s == "descending") {
        obj_list.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            return 0;
        });
        display();
    }
    else if (s == "ascending") {
        obj_list.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        display();
    }
});
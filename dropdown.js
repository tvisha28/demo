var selectCountyList, selectStateList, selectCityList;
var stateObject = {
  "India": {
    "Gujrat": ["Surat", "Rajkot"],
    "Kerala": ["Kozhikode", "Malappuram"],
    "Goa": ["East Goa ", "West Goa "],
  },
  "Australia": {
    "South Australia": ["Adelaide", "Whyalla"],
    "Victoria": ["Bendigo", "Melton"]
  }, "Canada": {
    "Alberta": ["Edmonton", "Beaumont"],
    "Columbia": ["Anza", "Campamento"]
  },
}

$(document).ready(function () {
  selectCountyList = document.querySelector(`select[name="country"]`),
    selectStateList = document.querySelector(`select[name="state"]`),
    selectCityList = document.querySelector(`select[name="city"]`);

  for (var country in stateObject) {
    selectCountyList.options[selectCountyList.options.length] = new Option(country, country);
  }

  selectCountyList.onchange = function () {
    getStatesOfCountry(this.value);
  }
  selectStateList.onchange = function () { getCitiesOfState(selectCountyList.value, this.value); }
});


function getStatesOfCountry(country) {
  selectStateList.length = 1;
  selectCityList.length = 1;
  if (this.selectedIndex < 1) return;
  for (var state in stateObject[country]) {
    selectStateList.options[selectStateList.options.length] = new Option(state, state);
  }
}

function getCitiesOfState(country, state) {
  selectCityList.length = 1;
  if (this.selectedIndex < 1) return;
  var city = stateObject[country][state];
  for (var i = 0; i < city.length; i++) {
    selectCityList.options[selectCityList.options.length] = new Option(city[i], city[i]);
  }
}

const dateEle = document.querySelector(`input[name="date"]`);
dateEle.addEventListener('click', (event) => {
  var today = new Date().toISOString().split('T')[0];
  document.getElementsByName('date')[0].setAttribute('max', today)
  console.log(event.target.value);
});
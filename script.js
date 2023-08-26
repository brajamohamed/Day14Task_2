const form = document.getElementById("form");
const fname = document.getElementById("first-name");
const lname = document.getElementById("last-name");
const address = document.getElementById("address");
const pincode = document.getElementById("pincode");
let genderEl = document.getElementById("genderOptions");
let foodsEl = document.getElementById("foodOptions");
let foods;
let countryDropDown = document.getElementById("country");
let cityDropDown = document.getElementById("cities");
let countryData;
let table = document.getElementById("table");
let sno = 1;

function handleSubmit(event) {
  event.preventDefault();
  foods = getFoodValue();
  foods = foods.join(",");
  gender = getGenderValue();
  validateForm();

  // else {
  //   alert("fix errors");
  // }
}

function getGenderValue() {
  const genderRadio = form.elements.gender;
  for (let radio of genderRadio) {
    if (radio.checked) {
      return radio.value;
    }
  }
}
function getFoodValue() {
  const foodval = form.elements.food;
  let selectedFoods = [];
  for (let food of foodval) {
    if (food.checked) {
      selectedFoods.push(food.value);
    }
  }
  return selectedFoods;
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => getCountrylist(data))
  .then((countries) => populateCountries(countries));

function getCountrylist(data) {
  countryData = data;
  let countrylist = data.map((data) => data.name.common);
  countrylist = countrylist.sort((a, b) => {
    return a.localeCompare(b);
  });
  return countrylist;
}

function populateCountries(countries) {
  for (let country of countries) {
    const option = document.createElement("option");
    option.value = country;
    option.innerHTML = country;
    countryDropDown.appendChild(option);
  }
}

countryDropDown.addEventListener("change", (e) => {
  cityDropDown.innerHTML = "<option value='default'>Select City</option>";
  getCityList(countryDropDown.value);
});

function getCityList(country) {
  const index = countryData.findIndex((obj) => obj.name.common === country);
  let cities = [];
  cities = countryData[index].capital;
  for (let city of cities) {
    let option = document.createElement("option");
    option.value = city;
    option.innerHTML = city;
    cityDropDown.appendChild(option);
  }
}
function addRow() {
  let newRow = table.insertRow();
  let cell1 = newRow.insertCell();
  cell1.textContent = sno;
  sno++;
  let cell2 = newRow.insertCell();
  cell2.textContent = fname.value;
  let cell3 = newRow.insertCell();
  cell3.textContent = lname.value;
  let cell4 = newRow.insertCell();
  cell4.textContent = address.value;
  let cell5 = newRow.insertCell();
  cell5.textContent = pincode.value;
  let cell6 = newRow.insertCell();
  cell6.textContent = gender;
  let cell7 = newRow.insertCell();
  cell7.textContent = foods;
  let cell8 = newRow.insertCell();
  cell8.textContent = countryDropDown.value;
  let cell9 = newRow.insertCell();
  cell9.textContent = cityDropDown.value;
  console.log(cityDropDown.value);
}

function validateForm() {
  let validation = true;
  if (fname.value == "") {
    setError(fname, "Enter First Name");
    validation = false;
  } else {
    setSuccess(fname);
  }
  if (lname.value == "") {
    setError(lname, "Enter Last Name");
    validation = false;
  } else {
    setSuccess(lname);
  }
  if (address.value == "") {
    setError(address, "Enter address");
    validation = false;
  } else {
    setSuccess(address);
  }
  if (pincode.value == "") {
    setError(pincode, "Enter Pincode");
    validation = false;
  } else {
    setSuccess(pincode);
  }
  if (typeof gender === "undefined") {
    setError(genderEl, "Select your gender");
    validation = false;
  } else {
    setSuccess(genderEl);
  }
  if (foods === "") {
    setError(foodsEl, "Select your favorite foods");
    validation = false;
  } else {
    setSuccess(foodsEl);
  }
  if (countryDropDown.value == "default") {
    setError(countryDropDown, "Select Country");
    validation = false;
  } else {
    setSuccess(countryDropDown);
  }
  if (cityDropDown.value == "default") {
    setError(cityDropDown, "Select City");
    validation = false;
  } else {
    setSuccess(cityDropDown);
  }
  if (validation == true) {
    addRow();
    form.reset();
    resetBorder();
  }
}
function setError(element, message) {
  let parent = element.parentElement;
  let errorElement = parent.querySelector(".errormessage");
  errorElement.innerText = message;

  parent.classList.add("failure");
  parent.classList.remove("sucess");
}
function setSuccess(element) {
  let parent = element.parentElement;
  let errorElement = parent.querySelector(".errormessage");
  errorElement.innerText = "";

  parent.classList.add("success");
  parent.classList.remove("failure");
}
function resetBorder() {
  let eles = document.querySelectorAll("input,select,textarea");
  for (let ele of eles) {
    ele.style.borderColor = "aquamarine";
  }
}

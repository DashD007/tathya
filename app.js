async function fetchCity() {
    let response = await fetch(`http://127.0.0.1:8000/city`);
    response = await response.json();
    return response;
  }

async function fetchLocationsFromCity(city) {
    let response = await fetch(`http://127.0.0.1:8000/location?city=${city}`);
    response = await response.json();
  
    return response;
  }

function appendOptions(selectId, options) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = "";
  
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option);
      optionElement.innerText = option;
  
      selectElement.appendChild(optionElement);
    });
}

function onChangeHandler(event) {
    event.preventDefault();
  
    console.log(event);
  
    const input = event.target;
  
    fetchLocationsFromCity(input.value).then((res) =>
      appendOptions("location", res.locations)
    );
}

async function submitFunc(event){
    console.log(event)
    event.preventDefault();
    let form = document.getElementById("form")
    let form_element = new FormData(form)
    let city = form_element.get('city')
    let location = form_element.get('location')
    
    // console.log(city,location,ptype,sale,bhk)

    let response = await fetch(`http://127.0.0.1:8000/result?city=${city}&location=${location}`);
    response = await response.json();
    return response;
}

const cityElement = document.getElementById("city");
const locationElement = document.getElementById("location");

fetchCity()
.then((res) => {
appendOptions("city",res.cities)
fetchLocationsFromCity(cityElement.value).then((res) =>
  appendOptions("location", res.locations)
// console.log(locations)
)})


let form = document.getElementById("form")
let graph = document.getElementById("graph");
form.addEventListener("submit",(event)=>{
    submitFunc(event).then( (res) =>
    
    anychart.onDocumentReady(async function(){
        var result = Object.keys(res).map((key) => [key, res[key]]);
        var data = {
            header:["furnishType","value"],
            rows : result
        };
        var chart = anychart.bar();
        chart = anychart.column();
        chart.data(data);
        chart.title("Graph between PricePerArea and types of furnishing");
        chart.container("graph");
        chart.draw();
    }))
});





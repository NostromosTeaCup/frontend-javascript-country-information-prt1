import axios from "axios";

// api binnenhalen via async functie
//try / catch

async function fetchCountryList() {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const countries = response.data;

        //sorteren van landen op populatie
        countries.sort((a, b) => {
            return a.population - b.population;
        });

        createCountryList(countries);

    } catch (e) {
        console.error(e);
    }
}

fetchCountryList();

function createCountryList(countries) {
    //koppelen aan id in html file
    const countryList = document.getElementById('countries-list')

//innerHTML ipv in HTML file
    countryList.innerHTML = countries.map((country) => {
        return `
    <li>
<!--    vlag ophalen, regio de landen in liggen en populatie met innerHTML-->
<img src="${country.flag}" alt="Flag of ${country.name}" class="flag"/>
<span class="${continent(country.region)}">${country.name}</span>
<p class="population">Has a population of ${country.population} people</p>
</li>
`;
    }).join('');


}

//kleur geven aan continenten waar het land in ligt.
//switch omdat het 3+ is
function continent(current) {
    switch (current) {
        case 'Africa':
            return 'blue';
            break;
        case 'Americas':
            return 'green';
            break;
        case 'Asia':
            return 'red';
            break;
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
            break;
        default:
            return 'default';
    }

}

/*******************************************
 PART 2 COUNTRY INFORMATION
 *******************************************/

/// referentie naar formulier en submit-eventlistener
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchCountry);

// referentie naar error element en search result
const countryInfoBox = document.getElementById('search-result');
const errorMessageBox = document.getElementById('error-message');

function searchCountry(e) {
    // pagina niet laten verversen
    e.preventDefault();
    // referentie naar invoerveld
    const queryfield = document.getElementById('query-field');
    // aanroepen fetchCountryDetails en  zoekterm meegeven
    fetchCountryDetails(queryfield.value);
    // invoerveld weer leeg
    queryfield.value = '';
}

async function fetchCountryDetails(name) {
    // bij nieuwe zoekopdracht worden vorige results verwijderd
    countryInfoBox.innerHTML = ``;
    errorMessageBox.innerHTML = ``;

    try {
        // gegevens van land ophalen
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(country);

        // InnerHTML
        countryInfoBox.innerHTML = `
      <article class="search-result-box">
        <span class="flag-title-container">
          <img src="${country.flag}" alt="vlag" class="flag">
          <h2>${country.name}</h2>
        </span>
        <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people</p>
        <p>The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}</p>
      </article>
    `;
    } catch (e) {
        console.error(e);
        // error message
        errorMessageBox.innerHTML = `
      <p class="error-message">${name} bestaat niet. Probeer het nogmaals.</p>
    `;
    }
}

// valuta string
function createCurrencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }

    return output + `${currencies[0].name}'s`;
}
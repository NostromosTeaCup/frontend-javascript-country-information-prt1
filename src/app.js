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
    //   //  errors communiceren in browser
    //     if (e.response.status === 500) {
    //         errorMessage.innerText = "Er ging iets mis met de server";
    //     } else if (e.response.status === 404) {
    //         errorMessage.innerText = "De pagina is niet gevonden";
    //     }
    // }

    fetchCountryList();

    function createCountryList(countries) {
        //koppelen aan id in html file
        const countryList = document.getElementById('countries-list')


        countryList.innerHTML = countries.map((country) => {
            return `
    <li>
<img src="${country.flag}" alt="Flag of ${country.name}" class="flag"/>
<span class="${continent(country.region)}">${country.name}</span>
<p class="population">Has a population of ${country.population} people</p>
</li>
`;
        }).join('');


}
//kleur geven aan continenten waar het land in ligt.
function continent(current) {
        switch (current) {
            case 'Africa':
                return blue;
            case 'Americas':
                return green;
            case 'Asia':
                return red;
            case 'Europe':
                return yellow;
            case 'Oceania':
                return purple;
        }

}
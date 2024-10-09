import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";

// Your users should be able to:

// - See all countries from the API on the homepage
// - Search for a country using an `input` field
// - Filter countries by region
// - Click on a country to see more detailed information on a separate page
// - Click through to the border countries on the detail page
// - Toggle the color scheme between light and dark mode *(optional)*
function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  const getCountries = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    setAllCountries(data);
  };
  const getSearch = async () => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${input}`
    );
    const data = await response.json();
    setSearch(data);
    setAllCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="search">
          <div>
            {" "}
            <input
              type="text"
              value={input}
              placeholder="Search for a country..."
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <i className="fa-solid fa-magnifying-glass" onClick={getSearch}></i>
          </div>

          <div className="filter">
            <select name="region" id="region">
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <div className="countries">
          {allCountries.map((country) => {
            return (
              <div key={country.name.common} className="country">
                <img src={country.flags.png} alt={country.name.common} />
                <div className="info">
                  <h1>{country.name.common}</h1>
                  <p>{country.population}</p>
                  <p>{country.region}</p>
                  <p>{country.capital}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

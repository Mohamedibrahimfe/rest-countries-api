import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { Link } from "react-router-dom";
import CountryInfo from "./component/CountryInfo";
import { useNavigate } from "react-router-dom";
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
  const [region, setRegion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      if (!response.ok) {
        setError(error);
        throw new Error(response.message);
      }
      setLoading(false);
      setAllCountries(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const getSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${input}`
      );
      const data = await response.json();
      if (!response.ok) {
        setError(error);
        throw new Error(response.message);
      }
      setSearch(data);
      setAllCountries(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  const getCountriesByFilter = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await response.json();
      if (!response.ok) {
        setError(error);
        throw new Error(response.message);
      }
      setAllCountries(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (region) {
      getCountriesByFilter();
    } else {
      getCountries();
    }
  }, [region]);
  // console.log(allCountries);
  const navigate = useNavigate();
  const handleCountryClicked = (country) => {
    navigate(`/card/${country.name}`);
  };
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="search">
          <div className="search-box">
            <svg
              width="167px"
              height="167px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => getSearch()}
              className="search-icon"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z"
                  fill="#000000"
                ></path>{" "}
              </g>
            </svg>{" "}
            <input
              type="text"
              value={input}
              placeholder="Search for a country..."
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </div>

          <div className="filter">
            <select
              onChange={(e) => {
                setRegion(e.target.value);
              }}
              name="region"
              id="region"
            >
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <div className="countries">
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!error &&
            !loading &&
            allCountries.map((country) => {
              return (
                <Link to={`/${country.name.common}`}>
                  <div
                    // onClick={handleCountryClicked}
                    key={country.name.common}
                    className="country"
                  >
                    <img src={country.flags.png} alt={country.name.common} />
                    <div className="info">
                      <h1>{country.name.common}</h1>
                      <p>population: {country.population}</p>
                      <p>Region: {country.region}</p>
                      <p>capital: {country.capital}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

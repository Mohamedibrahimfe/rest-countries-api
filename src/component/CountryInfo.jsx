import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
const CountryInfo = () => {
  const [search, setSearch] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://restcountries.com/v3.1/name/${id}`);
      if (!response.ok) {
        setError(error);
        throw new Error(response.message);
      }

      const data = await response.json();
      setSearch(data);
      setAllCountries(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    getSearch();
  }, []);
  return (
    <div>
      <Navbar />
      <Link className="backbtn" to="/">
        Back
      </Link>
      {loading && <p className="loading">Loading...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        allCountries.map((country) => {
          return (
            <div
              // onClick={handleCountryClicked}
              key={country.name.common}
              className="one-country"
            >
              <img src={country.flags.png} alt={country.name.common} />
              <div className="info-container">
                <h1>{country.name.common}</h1>
                <h4>
                  <b>Native Name:</b> {country.name.official}
                </h4>
                <h4>
                  <b>Population:</b> {country.population}
                </h4>
                <h4>
                  <b>Region:</b> {country.region}
                </h4>
                <h4>
                  <b>Sub Region:</b> {country.subregion}
                </h4>
                <h4>
                  <b>Capital:</b> {country.capital}
                </h4>
                <h4>
                  <b>Top Level Domain:</b> {country.tld}
                </h4>
                <h4>
                  <b>original Name:</b> {country.tld[1]}
                </h4>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CountryInfo;

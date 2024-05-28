import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/api_Url';
import { CiSearch } from "react-icons/ci";

const Main = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('All Regions');

    useEffect(() => {
        axios.get(`${API_BASE_URL}`).then(function(response) {
            setData(response.data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDropdownClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setDropdownVisible(false);
    };

    const filteredData = data.filter((country) => {
        return (
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRegion === 'All Regions' || country.region === selectedRegion)
        );
    });

    return (
        <div className="py-5">
            <div className="bg-white py-[30px] ">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center px-[20px] relative">
                        <input
                            type="text"
                            className="w-[500px] px-[40px] py-[10px] rounded-md outline-none text-gray-500"
                            placeholder="Search for a country..."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <CiSearch className="w-[20px] h-[20px] ml-[15px] absolute left-[10px] text-gray-500" />
                    </div>
                    <div className="relative">
                        <button
                            onClick={handleDropdownClick}
                            className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md flex items-center"
                        >
                            {selectedRegion}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {dropdownVisible && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                <li
                                    onClick={() => handleRegionSelect('All Regions')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    All Regions
                                </li>
                                <li
                                    onClick={() => handleRegionSelect('Africa')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    Africa
                                </li>
                                <li
                                    onClick={() => handleRegionSelect('Americas')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    Americas
                                </li>
                                <li
                                    onClick={() => handleRegionSelect('Asia')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    Asia
                                </li>
                                <li
                                    onClick={() => handleRegionSelect('Europe')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    Europe
                                </li>
                                <li
                                    onClick={() => handleRegionSelect('Oceania')}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    Oceania
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-4 gap-4 mt-4">
                {filteredData.map((country) => (
                    <div 
                        className="shadow-md bg-white flex flex-col items-center p-4 transition-transform transform hover:scale-105" 
                        key={country.cca3}
                        style={{ width: '250px', height: '350px' }}
                    >
                        <img 
                            src={country.flags.png} 
                            alt={country.flags.alt} 
                            className="w-full h-40 object-cover mb-4"
                        />
                        <h3 className="text-lg font-bold mb-2">{country.name.common}</h3>
                        <p className="text-sm">Population: {country.population.toLocaleString()}</p>
                        <p className="text-sm">Region: {country.region}</p>
                        <p className="text-sm">Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;

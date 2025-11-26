import { useState } from "react";

export default function SearchForm({ onSearch }){
    const [restaurantName, setRestaurantName] = useState("");
    const [location, setLocation] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (restaurantName, location) onSearch(restaurantName, location);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input type="text" onChange={e => setRestaurantName(e.target.value)} value={restaurantName} placeholder="Enter Restaurant name" />
            <input type="text" onChange={e => setLocation(e.target.value)} value={location} placeholder="Enter Location" />
            <button type="submit">Generate Review</button>
        </form>
    )
}
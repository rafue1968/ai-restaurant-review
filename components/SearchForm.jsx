import { useState } from "react";

export default function SearchForm({ onSearch }){
    const [restaurantName, setRestaurantName] = useState("");
    const [location, setLocation] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (restaurantName, location) onSearch(restaurantName, location);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setRestaurantName(e.target.value)} value={restaurantName} placeholder="Restaurant name" />
            <input type="text" onChange={e => setLocation(e.target.value)} value={location} placeholder="Location" />
            <button type="submit">Generate Review</button>
        </form>
    )
}
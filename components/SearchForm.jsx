import { useState } from "react";




export default function SearchForm({ onSearch, restuarants }){
    const [restaurantName, setRestaurantName] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const restuarant = restuarants.find(r => r.name === selected);
        if (restuarant) onSearch(restuarant);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={e => setRestaurantName(e.target.value)} value={restaurantName} />
            <input type="text" />
            <button type="submit">
                Generate Review
            </button>
        </form>
    )
}
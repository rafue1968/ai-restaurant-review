"use client";

import { useState } from "react";
import SearchForm from "../components/SearchForm"
import ReviewCard from "../components/ReviewCard"
import axios from "axios";


export default function Home() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (restaurantName, location) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/review", {
        restaurantName: restaurantName,
        location: location
      });
      setReview(res.data.reviewText);
    } catch (err) {
      console.error(err);
      setReview("Failed to generate review.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="container">
      <h1 className="page-title">AI Restaurant Reviewer</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p className="loading-text">Generating review...</p>}
      {review && <ReviewCard review={review} />}
    </div>
  )
}
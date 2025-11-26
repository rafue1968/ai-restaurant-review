"use client";
import ReactMarkDown from "react-markdown";

export default function ReviewCard({review}){
    return (
        <div className="review-card">
            <h2>AI-Generated Review</h2>
            <ReactMarkDown>{review}</ReactMarkDown>
        </div>
    )
}
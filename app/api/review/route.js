import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set. The API call will fail without it.");
}

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

/**
 * POST /api/review
 * Body: { restaurantName: string, location: string }
 */

export async function POST(req) {

    const {restaurantName, location} = await req.json();

    console.log("sending:", {restaurantName, location})

    if (!restaurantName || !location){
        return NextResponse.json(
        { error: "Missing restaurant data: restaurantName and location are required." },
        { status: 400 }
      );
    }

    try {
        const prompt = `
        Generate a realistic, friendly, and informative restaurant review for the following restaurant.

        Name: ${restaurantName}
        Location: ${location}

        Include:
        - 3 Pros and 3 Cons
        - 3 recommended dishes
        - Overall rating (out of 5)
        - A 1-2 sentence verdict

        Return the review as plain text.
        `.trim();

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            temperature: 0.1,
        });

        const reviewText = response.candidates[0].content.parts[0].text;

        // let reviewText = "";

        // if (response?.data?.choices?.[0]?.text) {
        //    reviewText = response.data.choices[0].text;
        // } else if (Array.isArray(response?.output) && response.output.length > 0) {
        //     const first = response.output[0];
        //     if (Array.isArray(first?.content)) {
        //         reviewText = first.content
        //         .map((c) => c.text ?? c.content ?? (typeof c === "string" ? c : JSON.stringify(c)))
        //         .join("\n\n");
        //     } else {
        //         reviewText = JSON.stringify(first);
        //     }
        // } else if (response?.response && typeof response.response.text === "function") {
        //     try {
        //         reviewText = await response.response.text();
        //     } catch {
        //         reviewText = JSON.stringify(response);
        //     }
        //     } else {
        //         reviewText = JSON.stringify(response);
        //     }

        return NextResponse.json({
            reviewText: reviewText
        },
        {
            status: 200
        }
    )

    } catch (err){
        console.error(err);
        return NextResponse.json({
            error: "Failed to generate review",
            status: 500,
        })
    }
}


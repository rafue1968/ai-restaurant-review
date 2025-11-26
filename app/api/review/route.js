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
            You are an assistant that MUST return a single restaurant review formatted in Markdown ONLY. 
            Do NOT output any extra explanation, metadata, or JSON — just the review text.

            Requirements:
            - Use a single top-level bold title in this format: **Restaurant Name - short subtitle**
            - Then a short paragraph (1-2 sentences).
            - Use a bold "**Pros:**" heading followed by a numbered list (1., 2., 3.) with each item bolded at the start of the line and a short explanation.
            - Use a bold "**Cons:**" heading followed by a numbered list (1., 2., 3.) same style.
            - Use a bold "**Recommended Dishes:**" heading followed by a numbered list of 3 items.
            - Use a bold "**Overall Rating:**" heading with a numeric rating (e.g., 3.5/5).
            - Use a bold "**Decision:**" heading with a 1-sentence verdict.
            - Use double newlines between major sections (title paragraph, Pros, Cons, Recommended Dishes, Overall Rating, Verdict).
            - Use Markdown syntax for bold "**like this**", numbered lists "1.", and plain text for everything else.
            - Keep the entire output concise (no more than 200 words) and return valid Markdown only.

            Restaurant: ${restaurantName}
            Location: ${location}
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


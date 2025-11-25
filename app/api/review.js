import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {name, location, cuisine} = req.body;


    if (!name || !location|| !cuisine){
        return res.status(400).json({error: "Missing restuarant data"});
    }

    try {
        const prompt = `Generate a detailed restaurant review for ${name}, located in ${location}, serving ${cuisine}. Include:
        - Pros and cons
        - Recommended dishes
        - Overall rating (out of 5)
        - Tone: informative and friendly`;

        const response = await axios.post(
            ``,
            {prompt, max_tokens: 300},
            {headers: {"Authorization": `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`}}
        );

        const reviewText = response.data.choices[0].text;

        res.status(200).json({review: reviewText});
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Failed to generate review"});
    }
}


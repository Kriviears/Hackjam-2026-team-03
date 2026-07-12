const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getTechGroups() {
    const url = "https://places.googleapis.com/v1/places:searchText";
console.log( GOOGLE_API_KEY);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.id,places.location,places.rating,places.websiteUri"

        },
        body: JSON.stringify({
            textQuery: "tech groups in Georgia"
        })
    });

    if (!response.ok) {
        throw new Error(`Places API error: ${response.status}`);
    }

    return response.json();
}

module.exports = { getTechGroups };
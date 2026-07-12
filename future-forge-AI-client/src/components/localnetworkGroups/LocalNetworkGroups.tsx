import { getLocalTechGroups } from "@/services/service";
import { useState, useEffect } from "react";
import { PlaceCard } from "./PlaceCard";
export default function LocalNetworkingGroups() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPlaces() {
            setLoading(true);
            setError(null);
            try {
                const data = await getLocalTechGroups();
                console.log(data);
               // const data = await res.json();
                setPlaces(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPlaces();
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h1 className="text-xl font-medium text-zinc-100 mb-1">Local networking</h1>
            <p className="text-sm text-zinc-400 mb-6">Tech groups and meetup spaces near you.</p>

            {loading && <p className="text-sm text-zinc-500">Loading nearby groups…</p>}

            {error && (<div className="rounded-md border border-red-800 bg-red-950/40 text-red-300 text-sm px-4 py-3 mb-4">
                {error}
            </div>
            )}

            <div className="flex flex-col gap-3">
                {places.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </div>
        </div>
    );
}
export function PlaceCard({ place }) {
    const name = place.displayName?.text || place.displayName;
    const websiteLabel = place.websiteUri
        ? place.websiteUri.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
        : null;

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
            <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3 items-start">
                    <div>
                        <p className="font-medium text-zinc-100">{name}</p>
                        <p className="text-sm text-zinc-400">{place.formattedAddress}</p>
                    </div>
                </div>
                {place.rating && (
                    <span className="text-sm text-zinc-400 whitespace-nowrap">{place.rating.toFixed(1)} ★</span>
                )}
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800">
                {websiteLabel ? (
                    <a href={place.websiteUri} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300">
                        {websiteLabel} ↗ </a>) : (<span />)}
                <a href={`https://www.google.com/maps/place/?q=place_id:${place.id}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors" >
                    View on Google Maps
                </a>
            </div>
        </div>
    );
}
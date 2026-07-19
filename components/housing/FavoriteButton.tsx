"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  rentalId: string;
  title?: string;
};

export default function FavoriteButton({
  rentalId,
  title = "rental",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("habeshawi-favorites") ?? "[]",
      );

      setIsFavorite(savedFavorites.includes(rentalId));
    } catch {
      setIsFavorite(false);
    } finally {
      setIsLoaded(true);
    }
  }, [rentalId]);

  function toggleFavorite() {
    try {
      const savedFavorites: string[] = JSON.parse(
        localStorage.getItem("habeshawi-favorites") ?? "[]",
      );

      const updatedFavorites = savedFavorites.includes(rentalId)
        ? savedFavorites.filter((id) => id !== rentalId)
        : [...savedFavorites, rentalId];

      localStorage.setItem(
        "habeshawi-favorites",
        JSON.stringify(updatedFavorites),
      );

      setIsFavorite(updatedFavorites.includes(rentalId));

      window.dispatchEvent(new Event("favorites-updated"));
    } catch {
      console.error("Unable to update favorites.");
    }
  }

  if (!isLoaded) {
    return (
      <button
        type="button"
        aria-label={`Save ${title}`}
        className="rounded-full bg-white p-2 shadow"
        disabled
      >
        ♡
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite
          ? `Remove ${title} from favorites`
          : `Save ${title} to favorites`
      }
      title={isFavorite ? "Remove from favorites" : "Save to favorites"}
      className="rounded-full bg-white p-2 text-2xl shadow transition hover:scale-110"
    >
      {isFavorite ? "❤️" : "♡"}
    </button>
  );
}
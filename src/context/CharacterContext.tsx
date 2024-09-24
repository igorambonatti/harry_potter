import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCharacters } from "../services/harry_potter";
import { ICharacter } from "../types/character";

interface CharacterContextType {
  characters: ICharacter[] | null;
  favorites: ICharacter[];
  toggleFavorite: (character: ICharacter) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacters must be used within a CharacterProvider");
  return context;
};

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [favorites, setFavorites] = useState<ICharacter[]>(() => {
    const savedFavorites = localStorage.getItem("@harry_potter:favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchCharacters().then((data) => setCharacters(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("@harry_potter:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (character: ICharacter) => {
    setFavorites((prev) =>
      prev.find((fav) => fav.id === character.id)
        ? prev.filter((fav) => fav.id !== character.id)
        : [...prev, character]
    );
  };

  return (
    <CharacterContext.Provider
      value={{ characters, favorites, toggleFavorite }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

import { ICharacter } from "../../types/character";
import { CharacterCard } from "../CharacterCard";

interface CharacterListProps {
  characters: ICharacter[] | null;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters)
    return (
      <div className="text-center min-h-screen">
        <div className="text-2xl pt-10">
          <span className="text-gray-300 text-10 mt-10">
            Loading characters...
          </span>
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {characters && characters.length > 0 ? (
        characters.map((character: ICharacter) => (
          <CharacterCard key={character.id} character={character} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400">
          <p>No characters found.</p>
        </div>
      )}
    </div>
  );
};

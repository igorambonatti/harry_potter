import { ICharacter } from "../../types/character";
import { CharacterCard } from "../CharacterCard";

interface CharacterListProps {
  characters: ICharacter[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {characters.length > 0 ? (
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

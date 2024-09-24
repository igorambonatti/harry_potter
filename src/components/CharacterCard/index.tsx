import { format, parse } from "date-fns";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/no-image.svg";
import { useCharacters } from "../../context/CharacterContext";
import { ICharacter } from "../../types/character";

interface CharacterProps {
  character: ICharacter;
}

export const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  const { toggleFavorite, favorites } = useCharacters();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const formatDate = (dateString: string) => {
    try {
      const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
      return format(parsedDate, "dd/MM/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <Link to={`/characters/${character.id}`} className="no-underline">
      <div
        key={character.id}
        className="min-h-[470px] bg-[#1e1e1e] shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 relative border border-gray-700"
      >
        <img
          alt={character.name}
          src={character.image || fallbackImage}
          onError={(e: any) => {
            e.target.src = fallbackImage;
          }}
          className="w-full h-64 object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
        />

        <div className="p-5 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-200 flex items-center space-x-2">
              {character.name}
            </h2>
            {isFavorite ? (
              <FaStar
                className="text-yellow-500 text-2xl cursor-pointer transition-transform transform hover:scale-125"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(character);
                }}
              />
            ) : (
              <FaRegStar
                className="text-gray-500 text-2xl cursor-pointer transition-transform transform hover:scale-125"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(character);
                }}
              />
            )}
          </div>

          <div className="text-gray-400 space-y-1">
            {character.actor && (
              <p>
                <span className="font-semibold text-gray-300">Actor:</span>{" "}
                {character.actor}
              </p>
            )}
            {character.dateOfBirth && (
              <p>
                <span className="font-semibold text-gray-300">
                  Date of Birth:
                </span>{" "}
                {formatDate(character.dateOfBirth)}
              </p>
            )}
            {character.gender && (
              <p>
                <span className="font-semibold text-gray-300">Gender:</span>{" "}
                {character.gender}
              </p>
            )}
            {character.house && (
              <p>
                <span className="font-semibold text-gray-300">House:</span>{" "}
                {character.house}
              </p>
            )}
            {character.species && (
              <p>
                <span className="font-semibold text-gray-300">Species:</span>{" "}
                {character.species}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

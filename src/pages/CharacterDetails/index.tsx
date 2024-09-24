import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import fallbackImage from "../../assets/no-image.svg";
import { useCharacters } from "../../context/CharacterContext";
import { fetchCharacterById } from "../../services/harry_potter";

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useCharacters();

  const [character, setCharacter] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = favorites.some((fav) => fav.id === id);

  const getCharacter = async () => {
    try {
      const data = await fetchCharacterById(id!);
      if (data) {
        setCharacter(data[0]);
      } else {
        setError("Character not found.");
      }
    } catch (error) {
      setError("Failed to fetch character.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center min-h-screen">
        <div className="text-2xl pt-10">
          <span className="text-gray-300 text-10 mt-10">
            Loading character details...
          </span>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="p-8 text-center text-gray-300 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Character Not Found</h1>
        <p>Sorry, we couldn't find the character you're looking for.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
      return format(parsedDate, "dd/MM/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="px-8 text-gray-200 pb-6">
      <div className="max-w-4xl mx-auto bg-[#1e1e1e] rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <img
            src={character.image || fallbackImage}
            alt={character.name}
            onError={(e: any) => {
              e.target.src = fallbackImage;
            }}
            className="rounded-md w-full h-64 object-contain max-w-xs"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            {character.name}
          </h1>
          {isFavorite ? (
            <FaStar
              className="text-yellow-500 text-3xl cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => toggleFavorite(character)}
            />
          ) : (
            <FaRegStar
              className="text-gray-500 text-3xl cursor-pointer transition-transform transform hover:scale-125"
              onClick={() => toggleFavorite(character)}
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            {character.actor && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">Actor:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.actor}
                </span>
              </p>
            )}
            {character.dateOfBirth && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">Date of Birth:</span>{" "}
                <span className="font-light text-gray-200">
                  {formatDate(character.dateOfBirth)}
                </span>
              </p>
            )}
            {character.gender && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">Gender:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.gender}
                </span>
              </p>
            )}
            {character.house && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">House:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.house}
                </span>
              </p>
            )}
            {character.ancestry && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">Ancestry:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.ancestry}
                </span>
              </p>
            )}
            {character.patronus && (
              <p className="text-lg">
                <span className="font-bold text-gray-300">Patronus:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.patronus}
                </span>
              </p>
            )}
          </div>

          {character.wand.length && (
            <div className="text-lg sm:pr-12">
              <p className="font-bold text-gray-300">Wand Characteristics</p>
              <p>
                <span className="font-bold text-gray-300">Wood:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.wand.wood || "Unknown"}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-300">Core:</span>{" "}
                <span className="font-light text-gray-200">
                  {character.wand.core || "Unknown"}
                </span>
              </p>
              {character.wand.length && (
                <p>
                  <span className="font-bold text-gray-300">Length:</span>{" "}
                  <span className="font-light text-gray-200">
                    {character.wand.length} inches
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-md hover:bg-yellow-600 transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Back to Characters
          </button>
        </div>
      </div>
    </div>
  );
};

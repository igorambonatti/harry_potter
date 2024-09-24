import { useState } from "react";
import ReactPaginate from "react-paginate";
import { CharacterList } from "../../components/CharacterList";
import { useCharacters } from "../../context/CharacterContext";

const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

export const Characters = () => {
  const { characters, favorites } = useCharacters();
  const [filter, setFilter] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 20;

  const handleFilter = (house: string | null) => {
    setShowFavorites(false);
    setFilter(house);
    setCurrentPage(0);
  };

  const handleFavorites = () => {
    setShowFavorites(!showFavorites);
    setFilter(null);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setShowFavorites(false);
    setFilter(null);
    setCurrentPage(0);
  };

  const filteredCharacters = showFavorites
    ? favorites
    : filter
    ? characters.filter((character) => character.house === filter)
    : characters;

  const pageCount = Math.ceil(filteredCharacters.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentCharacters = filteredCharacters.slice(
    offset,
    offset + itemsPerPage
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const getButtonClasses = (isActive: boolean) =>
    `py-2 px-4 rounded-md mb-2 ${
      isActive ? "bg-yellow-500 text-black" : "bg-[#151515] text-gray-200"
    }`;

  return (
    <div className="flex-col p-6 min-h-screen">
      <div className="flex-wrap space-x-4 pb-8 flex justify-center">
        {houses.map((house) => (
          <button
            key={house}
            className={getButtonClasses(filter === house)}
            onClick={() => handleFilter(house)}
          >
            {house}
          </button>
        ))}

        <button
          className={getButtonClasses(showFavorites)}
          onClick={handleFavorites}
        >
          Favorites
        </button>

        {(filter || showFavorites) && (
          <button
            className="py-2 px-4 rounded-md text-white bg-red-500 h-10"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}
      </div>

      <CharacterList characters={currentCharacters} />

      {filteredCharacters.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel={"..."}
          pageCount={pageCount}
          forcePage={currentPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={
            "flex flex-wrap justify-center mt-8 space-x-2 space-y-2"
          }
          pageClassName={
            "py-1 px-3 sm:py-2 sm:px-4 bg-[#151515] text-gray-200 rounded-md"
          }
          activeClassName={"bg-yellow-500 text-black"}
          previousClassName={"hidden"}
          nextClassName={"hidden"}
          breakClassName={
            "py-1 px-3 sm:py-2 sm:px-4 bg-[#151515] text-gray-200 rounded-md"
          }
        />
      )}
    </div>
  );
};

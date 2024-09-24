export interface ICharacter {
  id: string;
  name: string;
  image: string;
  house: string;
  actor?: string;
  dateOfBirth?: string;
  gender?: string;
  species?: string;
  ancestry?: string;
  patronus?: string;
  wand?: {
    wood: string;
    core: string;
    length: number | null;
  };
  isFavorite?: boolean;
}

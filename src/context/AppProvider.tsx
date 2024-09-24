import { CharacterProvider } from "./CharacterContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <CharacterProvider>{children}</CharacterProvider>;
};

export default AppProvider;

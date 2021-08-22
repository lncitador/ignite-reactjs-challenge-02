import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button"

type GenresResponseProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SiderBarProps {
  handleSelectGenre: Function;
}

export function SideBar({handleSelectGenre}: SiderBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenresResponseProps[]>([]);

  
  useEffect(() => {
    api.get<GenresResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  function handleClickButton(id: number) {
    handleSelectGenre(id)
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}
// components/selectedThemeComponent.js

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedThemeId } from '../redux/selectedThemeSlice';
import {useEffect} from 'react';

export default function ThemeComponent() {
  const id = useSelector((state) => state.selectedTheme.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    console.log(`Theme ID: ${id}`);
  }, [id]);

  const handleClick = (id) => {
    dispatch(setSelectedThemeId(parseInt(id,10)+1));
  };

  return (
    <div>
      <h2>Theme ID: {id}</h2>
      <button onClick={() => handleClick(id)} key={id}>Increment Theme ID</button>
    </div>
  );
}

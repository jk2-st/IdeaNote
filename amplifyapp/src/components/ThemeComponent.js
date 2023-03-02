// components/ThemeComponent.js

import { useDispatch, useSelector } from 'react-redux';
import { incrementThemeId } from '../redux/themeSlice';
import {useEffect} from 'react';

export default function ThemeComponent() {
  const theme_id = useSelector((state) => state.theme.theme_id);
  const dispatch = useDispatch();

  useEffect(() => {
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    console.log(`Theme ID: ${theme_id}`);
  }, [theme_id]);

  const handleClick = () => {
    dispatch(incrementThemeId());
  };

  return (
    <div>
      <h2>Theme ID: {theme_id}</h2>
      <button onClick={handleClick}>Increment Theme ID</button>
    </div>
  );
}

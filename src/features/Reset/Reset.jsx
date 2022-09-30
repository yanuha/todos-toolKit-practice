import { useDispatch } from 'react-redux';

import { resetToDefault } from './reset-action';

export const ResetToDefaultButton = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(resetToDefault())}>Reset</button>;
};

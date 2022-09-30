import { useDispatch, useSelector } from 'react-redux';

import { selectActiveFilters, setFilters } from './filter-slice';

export const FilterTodo = () => {
  const activeFilter = useSelector(selectActiveFilters);
  const dispatch = useDispatch();

  const handleFilter = (val) => dispatch(setFilters(val));

  return (
    <div>
      <button
        onClick={() => handleFilter('all')}
        style={{ color: activeFilter === 'all' ? 'red' : null }}
      >
        all
      </button>
      <button
        onClick={() => handleFilter('active')}
        style={{ color: activeFilter === 'active' ? 'red' : null }}
      >
        active
      </button>
      <button
        onClick={() => handleFilter('completed')}
        style={{ color: activeFilter === 'completed' ? 'red' : null }}
      >
        completed
      </button>
    </div>
  );
};

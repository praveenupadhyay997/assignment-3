import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import boardReducer from '../features/board/boardSlice';
import filterReducer from '../features/filters/filterSlice';
import { loadState, saveState } from '../utils/storage';
import { throttle } from '../utils/throttle';

const persistedState = loadState<{ board: ReturnType<typeof boardReducer> }>('flowboardState');

const store = configureStore({
  reducer: {
    board: boardReducer,
    filters: filterReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(
  throttle(() => {
    saveState('flowboardState', {
      board: store.getState().board,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

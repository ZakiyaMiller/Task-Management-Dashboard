import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks'] // Only persist tasks state
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, tasksReducer);

// Configure store
export const store = configureStore({
  reducer: {
    tasks: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

// Create persistor
export const persistor = persistStore(store);

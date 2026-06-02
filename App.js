// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { criarTabela } from './src/database/database';
import Routes from './src/navigation/routes';

export default function App() {
  
  useEffect(() => {
    async function setupDatabase() {
      await criarTabela();
    }
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
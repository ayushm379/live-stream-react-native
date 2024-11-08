import React from 'react';
import { SafeAreaView } from 'react-native';
import LiveStreamScreen from './LiveStreamScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LiveStreamScreen />
    </SafeAreaView>
  );
};

export default App;

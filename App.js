import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageMultipleChoiceQuestion from './src/components/ImageMultipleChoiceQuestion';
import OpenEndedQuestion from './src/components/OpenEndedQuestion';
import FillInTheBlank from './src/components/FillInTheBlank';
import Header from './src/components/Header';

import styles from './App.styles';
import questions from './assets/data/allQuestions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[currentQuestionIndex]
  );
  const [lives, setLives] = useState(5);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      Alert.alert('You won');
      setCurrentQuestionIndex(0);
    }
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      saveData();
    }
  }, [lives, currentQuestionIndex, hasLoaded]);

  const onCorrect = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const restart = () => {
    setCurrentQuestionIndex(0);
    setLives(5);
  };

  const onWrong = () => {
    if (lives <= 1) {
      Alert.alert('Game over', 'Try again', [
        {
          text: 'Try again',
          onPress: restart,
        },
      ]);
    } else {
      Alert.alert('Wroooong');
      setLives(lives - 1);
    }
  };

  const saveData = async () => {
    await AsyncStorage.setItem('@lives', lives.toString());
    await AsyncStorage.setItem(
      '@currentQuestionIndex',
      currentQuestionIndex.toString()
    );
  };

  const loadData = async () => {
    const loadedLives = await AsyncStorage.getItem('@lives');
    if (loadedLives) {
      setLives(parseInt(loadedLives));
    }

    const currentQuestionIndex = await AsyncStorage.getItem(
      '@currentQuestionIndex'
    );
    if (currentQuestionIndex) {
      setCurrentQuestionIndex(parseInt(currentQuestionIndex));
    }

    setHasLoaded(true);
  };

  if (!hasLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <StatusBar style='dark' />
        <Header
          progress={currentQuestionIndex / questions.length}
          lives={lives}
        />

        {currentQuestion.type === 'FILL_IN_THE_BLANK' && (
          <FillInTheBlank
            question={currentQuestion}
            onCorrect={onCorrect}
            onWrong={onWrong}
          />
        )}

        {currentQuestion.type === 'IMAGE_MULTIPLE_CHOICE' ? (
          <ImageMultipleChoiceQuestion
            question={currentQuestion}
            onCorrect={onCorrect}
            onWrong={onWrong}
          />
        ) : null}
        {currentQuestion.type === 'OPEN_ENDED' ? (
          <OpenEndedQuestion
            question={currentQuestion}
            onCorrect={onCorrect}
            onWrong={onWrong}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

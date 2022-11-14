import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect, useRef, useState } from 'react';
import {Animated, StyleSheet, Text, View } from 'react-native';

interface ProgressProps {
    step: number,
    steps: number,
    height: number

}

const Progress:FC<ProgressProps> = ({step, steps, height}) => {
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current
    const reactive = useRef(new Animated.Value(-1000)).current

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps)
    }, [step, width]);



    return (
        <>
            <Text style={{fontFamily: 'Menlo', fontSize: 12, fontWeight: '900', marginBottom: 4}}>
                {step}/{steps}
            </Text>
            <View style={{
                height,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: height,
                overflow: 'hidden'
            }}>
                <Animated.View
                    onLayout={e => {
                        const newWidth = e.nativeEvent.layout.width;
                        setWidth(newWidth)
                    }}
                    style={{
                    height,
                    width: '100%',
                    borderRadius: height,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: [{
                        translateX: animatedValue
                    }]

                }}/>
            </View></>

    )
}

export default function App() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % (10 + 1))
        }, 300)
        return () => {
            clearInterval(interval)
        }
    }, [index]);

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Progress step={index} steps={10} height={20}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
});

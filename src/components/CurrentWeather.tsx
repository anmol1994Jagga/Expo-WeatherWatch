import { Image, StyleSheet, Text, View } from 'react-native';

const CurrentWeather = ({ selectedLocation, currentWeather, getImageurl }: any) => {
  return (
    <View style={styles.container}>
        <Text style={styles.font24}>{selectedLocation?.name}, {selectedLocation?.country}</Text>
        <Text style={styles.font48}>{Math.round(currentWeather.current.temperature_2m)}°C</Text>
        <Image
        source={{
            uri: getImageurl(currentWeather),
        }}
        style={styles.image}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginTop: 20
  },
  image: { 
    width: 100, 
    height: 100 
  },
  font24:{
    fontSize: 24
  },
  font48:{
    fontSize: 48
  }
});

export default CurrentWeather;

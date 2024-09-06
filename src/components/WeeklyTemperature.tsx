import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const WeeklyTemperature = ({ weeklyForecast, currentWeather, getImageurl }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Forecast</Text>
      <FlatList
        data={weeklyForecast}
        keyExtractor={(item) => item.time}
        horizontal // Enables horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hides the horizontal scrollbar
        renderItem={({ item }) => {
          return (
            <View style={styles.viewItem}>
              <Text style={styles.itemDate}>{new Date(item.time).toLocaleDateString('en-us',
                { year:"numeric", month:"short", day:"numeric"}
              )}</Text>
              <Text style={styles.itemTemp}>{Math.round(item.temp)}°C</Text>
              <Image
                accessibilityRole={'image'}
                source={{ uri: getImageurl(currentWeather) }}
                style={styles.image}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    color: 'gray'
  },
  viewItem: {
    width: 80, // Adjust width as needed
    alignItems: 'center', // Center content vertically
    marginHorizontal: 5, // Adds spacing between items
    justifyContent: 'space-between',
    gap: 2
  },
  itemDate:{

  },
  itemTemp:{},
  image: {
    width: 50,
    height: 50,
  },
});

export default WeeklyTemperature;

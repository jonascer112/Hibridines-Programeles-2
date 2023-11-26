import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import jsonData from './2PraktinėsUžduotiesDuomenys.json';

const data = jsonData;

function calculateDriverPoints(driver) {
  let points = 0;
  driver.race.forEach((race) => {
    points += race.qualification_points + race.tandem_points;
  });
  return points;
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Suskaiciuoti SEMI PRO taskus"
        onPress={() => navigation.navigate('Details', { data: data, leagueTitle: 'SEMI PRO' })}
      />
      <Button
        title="Suskaiciuoti STREET taskus"
        onPress={() => navigation.navigate('Details', { data: data, leagueTitle: 'STREET' })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { data, leagueTitle } = route.params;
  const filteredData = data.find((item) => item.league_title === leagueTitle);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{leagueTitle}</Text>
      {filteredData.drivers.map((driver) => (
        <View key={driver.driver_id}>
          <Button
            title={`${driver.firstname} ${driver.lastname}`}
            onPress={() => navigation.navigate('DriverDetails', {
              data: data,
              leagueTitle: leagueTitle,
              driverId: driver.driver_id
            })}
          />
        </View>
      ))}
    </View>
  );
}

function DriverDetails({ route }) {
  const { data, leagueTitle, driverId } = route.params;
  const selectedLeague = data.find((item) => item.league_title === leagueTitle);
  const selectedDriver = selectedLeague.drivers.find((driver) => driver.driver_id === driverId);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{leagueTitle} - {selectedDriver.firstname} {selectedDriver.lastname}</Text>
      <Text>Car: {selectedDriver.car}</Text>
      <Text>Points: {calculateDriverPoints(selectedDriver)}</Text>
      <Text>Race Information:</Text>
      {selectedDriver.race.map((race) => (
        <View key={race.race_id}>
          <Button
            title={`${race.race_information} - Points: ${race.qualification_points + race.tandem_points}`}
            onPress={() => {/* Handle race information button press */}}
          />
        </View>
      ))}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="DriverDetails" component={DriverDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
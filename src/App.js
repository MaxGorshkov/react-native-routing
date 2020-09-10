import React, { useEffect } from "react";
import { Link } from '@react-navigation/native';
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const pageStyle =  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', position: 'fixed', height: 300 };

const prefix = "/";// Linking.makeUrl("/");
const config = {
  screens: {
    HomeStack: {
      // path: "/home",
      initialRouteName: "Home",
      screens: {
        Home: {
          path: "home/home",
        },
        Profile: {
          path: "home/profile/:id/:age",
          parse: {
            id: id => id,
            age: age => +age
          }
        }
      }
    },
    Settings: {
      path: "settings",
    }
  }
};
export default function App() {
  const linking = {
    prefixes: [prefix],
    config
  };

  // const ref = React.useRef();

  // const { getInitialState } = useLinking(ref, {
  //   prefixes: [prefix],
  //   config
  // });

  // const [isReady, setIsReady] = React.useState(false);
  // const [initialState, setInitialState] = React.useState();

  // React.useEffect(() => {
  //   getInitialState()
  //     .catch(() => {})
  //     .then(state => {
  //       if (state !== undefined) {
  //         setInitialState(state);
  //         console.log('qqq1', state);
  //       }

  //       setIsReady(true);
  //     });
  // }, [getInitialState]);

  // if (!isReady) {
  //   return null;
  // }

  function Home({ navigation }) {
    useEffect(() => {
      console.log('Home mounted');
      return () => {
        console.log('Home unmounted');
      }
    });
    return (
      <View style={pageStyle}>
        <Button
          title="Go to Wojciech's profile"
          onPress={() =>
            navigation.navigate("Profile", { id: "Wojciech", age: 22 })
          }
        />
        <Button
          title="Go to unknown profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
  }

  function Profile({ route, navigation }) {
    useEffect(() => {
      console.log('Profile mounted', route.params?.age);
      return () => {
        console.log('Profile unmounted', route.params?.age);
      }
    });
    return (
      <View style={pageStyle}>
        <Text>Hello {route.params?.id || "Unknown"}!</Text>
        <Text>
          Type of age parameter is{" "}
          {route.params?.age ? typeof route.params.age : "undefined"}
        </Text>
        <Button
          title="Go up"
          onPress={() => {
              navigation.pop();
            }
          }
        />
        <Button
          title="Jump to home"
          onPress={() => {
              navigation.navigate("Home");
            }
          }
        />
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Go to unknown profile"
          // onPress={() => navigation.navigate("Profile", { id: "Wojciech123", age: 222 })}
          onPress={() => navigation.setParams({ id: `${route.params?.id}1`, age: route.params?.age + 1 })}
        />
      </View>
    );
  }

  function Settings({ navigation }) {
    return (
      <View
        style={pageStyle}
      >
        <Button
          title="Go to Wojciech's profile"
          onPress={() => {
              navigation.navigate("HomeStack", { screen: 'Profile', initial: false, params: { id: "Wojciech112", age: 22 }});
            }
          }
        />

        <Link to="/home/profile/WojciecQQQ/22">Go to WojciecQQQ profile</Link>
        
      </View>
    );
  }

  const HomeStack = () => {
    const MyStack = createStackNavigator();

    return (
      <MyStack.Navigator initialRouteName="Home">
        <MyStack.Screen name="Home" component={Home} />
        <MyStack.Screen name="Profile" component={Profile} />
      </MyStack.Navigator>
    );
  };
  const MyTabs = createBottomTabNavigator();

  return (
    // <NavigationContainer initialState={initialState} ref={ref}>
    <NavigationContainer linking={linking}>
      <MyTabs.Navigator>
        <MyTabs.Screen name="HomeStack" component={HomeStack} />
        <MyTabs.Screen name="Settings" component={Settings} />
      </MyTabs.Navigator>
    </NavigationContainer>
  );
}

/*
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const pageStyle =  { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', position: 'fixed', height: 300 };

function DetailsScreen() {
  return (
    <View style={pageStyle}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={pageStyle}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={pageStyle}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer linking={{enabled: true}}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
*/

/*
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MyButton = (props) => (
  <View>
    <Text>{props.label}</Text>
  </View>
)

export default () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
)
*/

/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
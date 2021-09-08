import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 

export const Home = ({ navigation, route }) => {
  const email = useSelector((state) => state.auth.email)
  const id = useSelector((state) => state.auth.id)
  const name = useSelector((state) => state.auth.name)
  const token = useSelector((state) => state.auth.token)


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo name="menu" size={24} color="white" onPress={()=>{navigation.openDrawer();}}/>
      ),
    });
  }, [navigation]);

  if(!token){
    //logout
  }
    return <SafeAreaView style={styles.container}>
    <Text style={styles.textStyle}>{email }</Text>
    <Text style={styles.textStyle}>{id}</Text>
    <Text style={styles.textStyle}>{name}</Text>
    <Text style={styles.textStyle}>{token}</Text>
    <FAB
    style={styles.fab}
    small
    icon="plus"
    color="#ffffff"
    onPress={() => console.log('Pressed')}
  />
  </SafeAreaView>;
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252525',
      padding: 10,
    },
    fab: {
      backgroundColor:'#252525',
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    textStyle: {
      color: '#ffffff',
    },
  })
import React, { useEffect } from 'react';
import { View,FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Text, TouchableOpacity ,Dimensions} from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { FAB } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import { deleteNoteAsync } from '../store/slices/note/noteslice'
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';

export const displayNote = ({ navigation, route }) => {
  const { id,title,description,updatedtime} = route.params;
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.token);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
        <Entypo name="edit" size={24} color="#81deeb" style={{paddingHorizontal:10,justifyContent:'center',alignItems:'center'}} onPress={()=>{navigation.navigate('Editnote',{id:id,title:title,description:description})}}/>
        <Entypo name="circle-with-minus" size={24} color="red" style={{paddingHorizontal:10,justifyContent:'center',alignItems:'center'}} 
        onPress={()=>{dispatch(deleteNoteAsync({token,id})).unwrap()
              .then((originalPromiseResult) => {
                console.log('originalPromiseResult',originalPromiseResult);
                showMessage({
                  message: "Note Deleted",
                  type: "success",
                  backgroundColor: "green", // background color
                  color: "#ffffff", // text color
                });
                navigation.navigate('Home')
              })
              .catch((rejectedValueOrSerializedError) => {
                console.log('rejectedValueOrSerializedError',rejectedValueOrSerializedError);
                  showMessage({
                    message: "Note deletion failed",
                    type: "failed",
                    backgroundColor: "red", // background color
                    color: "#ffffff", // text color
                  });
                
              })}}/>
        </View>
      ),
    });
  }, [navigation]);

    return <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily:'MontserratBold',fontSize:42,color:'#ffffff',fontWeight:'bold',paddingBottom:10,alignSelf:'center'}}>{title}</Text>
      <Text style={{fontFamily:'MontserratLight',fontSize:24,color:'grey',paddingBottom:10,alignSelf:'center'}}>{ moment(updatedtime).format('DD-MM-YYYY')}</Text>
      <Text style={{fontFamily:'MontserratRegular',fontSize:24,color:'#ffffff'}}>{description}</Text>
  </SafeAreaView>;
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252525',
      padding:10
    },
  })
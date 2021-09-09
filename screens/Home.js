import React, { useEffect } from 'react';
import { View,FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Text, TouchableOpacity ,Dimensions} from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { FAB } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import { getNotesAsync,emptythenotesdataarray } from '../store/slices/note/noteslice'

const Item = ({ item, onPress, backgroundColor='#ffffff', textColor='#000000' }) => (
  <View style={{backgroundColor,flex:1,margin:10}}>
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title, textColor,{fontFamily:'MontserratSemiBold'}]}>{item.title}</Text>
  </TouchableOpacity>
  </View>
);
const EmplyLoading = (status) => {
  if(status==='idle'){
    return <View style={{
      height:Dimensions.get('window').height-200,
      backgroundColor: '#252525',
      justifyContent: "center",
      alignItems:'center'}}>
    <Text style={{fontSize:24,color:'#ffffff'}}>Create A Note</Text>
  </View>
  }
  return (
    <View style={{
    height:Dimensions.get('window').height-200,
    backgroundColor: '#252525',
    justifyContent: "center",
    alignItems:'center'}}>
    <ActivityIndicator size="large" color='#ffffff'/>
  </View>
  );
};
export const Home = ({ navigation, route }) => {
  const email = useSelector((state) => state.auth.email)
  const id = useSelector((state) => state.auth.id)
  const name = useSelector((state) => state.auth.name)
  const token = useSelector((state) => state.auth.token)
  const notesData = useSelector((state) => state.note.notes)
  const status = useSelector((state) => state.note.status)
  const current_page = useSelector((state) => state.note.current_page)
  const last_page = useSelector((state) => state.note.last_page)
  const dispatch = useDispatch()


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

  useEffect(()=>{
    dispatch(getNotesAsync({token:token,pagenumber:1}));
  },[])


  const renderItem = ({ item }) => {
    console.log('in home----',item);
    const colors =["#feaa91",'#fecd80','#e6ef9a','#81deeb','#cf92d8','#81cbc5','#f48fb1'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    return (
      <Item
        item={item}
        onPress={() => {navigation.navigate('Displaynote',{id:item.id,title:item.title,description:item.description,updatedtime:item.updated_at})}}
        backgroundColor={ color }
        // textColor={{  }}
      />
    );
  };
    return <SafeAreaView style={styles.container}>
      <View>
          <FlatList
          ListEmptyComponent={EmplyLoading(status)}
            data={notesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // extraData={selectedId}
            numColumns={2}
            onEndReached={()=>{
              console.log('current_page<last_page',current_page,last_page);
              if(current_page<last_page){
              console.log('innnnnnnnnnn--------',current_page,last_page);
                dispatch(getNotesAsync({token,pagenumber:current_page+1}));
              }
            }}
            onRefresh={()=>{
              dispatch(emptythenotesdataarray())
              dispatch(getNotesAsync({token,pagenumber:1}));
            }}
            refreshing={false}
          />
          </View>
    <FAB
    style={styles.fab}
    small
    icon="plus"
    color="#ffffff"
    onPress={() => navigation.navigate('Createnote')}
  />
  </SafeAreaView>;
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252525',
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
    item: {
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
  })
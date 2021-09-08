import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editNoteAsync } from '../store/slices/note/noteslice'


import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";

export const editNote = ({ navigation, route  }) => {
    const { id,title,description} = route.params;

    const dispatch = useDispatch()
    const token = useSelector((state)=>state.auth.token);
    return (
        <View style={styles.container}>
        <Text style={styles.title}> </Text>
        <Formik
          initialValues={{ title: title, description: description}}
          validationSchema={Yup.object({
            title: Yup.string().min(1).max(255)
              .required('Required'),
              description: Yup.string().required("This field is required"),
          })}
          onSubmit={(values, formikActions) => {
            
            //   Alert.alert(JSON.stringify(values));
            console.log('here------id',id);
            values.token=token
            values.id=id
              dispatch(editNoteAsync(values)).unwrap()
              .then((originalPromiseResult) => {
                formikActions.setSubmitting(false);
                console.log('originalPromiseResult',originalPromiseResult);
               
                showMessage({
                  message: "Note edited",
                  type: "success",
                  backgroundColor: "green", // background color
                  color: "#ffffff", // text color
                });
                navigation.navigate('Home')
              })
              .catch((rejectedValueOrSerializedError) => {
                formikActions.setSubmitting(false);
                console.log('rejectedValueOrSerializedError',rejectedValueOrSerializedError);
                  showMessage({
                    message: "Note edit failed",
                    type: "failed",
                    backgroundColor: "red", // background color
                    color: "#ffffff", // text color
                  });
                
              });

              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
              
            
          }}>
          {props => ( 
            <View>
              <TextInput
                onChangeText={props.handleChange('title')}
                onBlur={props.handleBlur('title')}
                value={props.values.title}
                placeholder="Title"
                style={styles.input}
                // ref={el => this.emailInput = el}
              />
              {props.touched.title && props.errors.title ? (
                <Text style={styles.error}>{props.errors.title}</Text>
              ) : null}

                <TextInput
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
                value={props.values.description}
                // autoFocus
                multiline
                placeholder="Description"
                style={styles.inputdescription}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                //   this.emailInput.focus()
                }}
              />
              {props.touched.description && props.errors.description ? (
                <Text style={styles.error}>{props.errors.description}</Text>
              ) : null}

              <Button
                onPress={props.handleSubmit}
                color="black"
                mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}>
                Submit
              </Button>
              <Button
                onPress={props.handleReset}
                color="#81deeb"
                mode="outlined"
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}>
                Reset
              </Button>
            </View>
          )}
        </Formik>
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252525',
      padding: 8,
    },
    title: {
      margin: 24,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    error: {
      margin: 8,
      fontSize: 14,
      color: 'red',
      fontWeight: 'bold',
    },
    input: {
      height: 50,
      paddingHorizontal: 8,
      marginVertical:10,
      width: '100%',
      borderColor: '#ddd',
      borderWidth: 1,
      backgroundColor: '#fff',
      maxWidth:400,
      alignSelf:'center'
    },
    inputdescription: {
      // height: 50,
      minHeight:50,
      paddingHorizontal: 8,
      marginVertical:10,
      width: '100%',
      borderColor: '#ddd',
      borderWidth: 1,
      backgroundColor: '#fff',
      maxWidth:400,
      alignSelf:'center'
    },
  });
  
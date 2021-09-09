import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LoginAsync } from '../store/slices/auth/authslice'


import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";

export const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
        <Text style={styles.title}> </Text>
        <Formik
          initialValues={{ email: '', password: ''}}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid Email')
              .required('Required'),
              password: Yup.string().required("This field is required"),
          })}
          onSubmit={(values, formikActions) => {
            
            //   Alert.alert(JSON.stringify(values));
            console.log('here------');
              dispatch(LoginAsync(values)).unwrap()
              .then((originalPromiseResult) => {
                formikActions.setSubmitting(false);
                console.log('originalPromiseResult',originalPromiseResult);
                
              })
              .catch((rejectedValueOrSerializedError) => {
                formikActions.setSubmitting(false);
                console.log('rejectedValueOrSerializedError',rejectedValueOrSerializedError);
                if(rejectedValueOrSerializedError){
                  showMessage({
                    message: rejectedValueOrSerializedError,
                    type: "failed",
                    backgroundColor: "red", // background color
                    color: "#ffffff", // text color
                  });
                }
                
              });

              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
              
            
          }}>
          {props => ( 
            <View>
              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                placeholder="Email Address"
                style={[styles.input,{fontFamily:'MontserratRegular'}]}
                // ref={el => this.emailInput = el}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}

                <TextInput
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                // autoFocus
                placeholder="Password"
                style={[styles.input,{fontFamily:'MontserratRegular'}]}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                //   this.emailInput.focus()
                }}
              />
              {props.touched.password && props.errors.password ? (
                <Text style={styles.error}>{props.errors.password}</Text>
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


        <Button
                onPress={()=>{navigation.navigate('Register')}}
                color="#fecd80"
                // mode="contained"
                style={{ marginTop: 30 }}>
                New User? Register...
        </Button>
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
  });
  
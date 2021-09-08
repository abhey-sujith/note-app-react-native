import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { registerAsync } from '../store/slices/auth/authslice'


import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showMessage, hideMessage } from "react-native-flash-message";

export const Register = ({ navigation }) => {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
          validationSchema={Yup.object({
            name: Yup.string().min(1).max(255).trim()              
              .required('Required'),
            email: Yup.string().trim()
              .email('Invalid Email')
              .required('Required'),
              password: Yup.string().required("This field is required").min(6).max(255),
              password_confirmation: Yup.string().min(6).when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("password")],
                  "Both password need to be the same"
                )
              })
          })}
          onSubmit={(values, formikActions) => {
            
            //   Alert.alert(JSON.stringify(values));
            console.log('here------');
              dispatch(registerAsync(values)).unwrap()
              .then((originalPromiseResult) => {
                formikActions.setSubmitting(false);
                console.log('originalPromiseResult',originalPromiseResult);
                
              })
              .catch((rejectedValueOrSerializedError) => {
                formikActions.setSubmitting(false);
                console.log('rejectedValueOrSerializedError',rejectedValueOrSerializedError);
                if(rejectedValueOrSerializedError.email[0]==="The email has already been taken."){
                  showMessage({
                    message: "The email has already been taken",
                    type: "failed",
                    backgroundColor: "red", // background color
                    color: "#ffffff", // text color
                  });
                }else{
                  showMessage({
                    message: "Registration Failed",
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
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                value={props.values.name}
                // autoFocus
                placeholder="Your Name"
                style={styles.input}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                //   this.emailInput.focus()
                }}
              />
              {props.touched.name && props.errors.name ? (
                <Text style={styles.error}>{props.errors.name}</Text>
              ) : null}
              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                placeholder="Email Address"
                style={styles.input}
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
                style={styles.input}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                //   this.emailInput.focus()
                }}
              />
              {props.touched.password && props.errors.password ? (
                <Text style={styles.error}>{props.errors.password}</Text>
              ) : null}

                <TextInput
                onChangeText={props.handleChange('password_confirmation')}
                onBlur={props.handleBlur('password_confirmation')}
                value={props.values.password_confirmation}
                autoFocus
                placeholder="Confirm Password"
                style={styles.input}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                //   this.emailInput.focus()
                }}
              />
              {props.touched.password_confirmation && props.errors.password_confirmation ? (
                <Text style={styles.error}>{props.errors.password_confirmation}</Text>
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
                onPress={()=>{navigation.navigate('Login')}}
                color="#fecd80"
                // mode="contained"
                style={{ marginTop: 30 }}>
                Already a User? Login...
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
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#ffffff'
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
  
import React, { useState, Fragment, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'

import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import ErrorMessage from '../../components/ErrorMessages'

import { AuthContext } from '../../components/Context'
import Logo from '../../components/Logo'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!  Mimimum 2 Charaters')
    .max(25, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .label('Password')
    .required('Required')
    .min(4, 'Password must have more than 4 characters '),
})

export default function SigninScreen(props) {
  // console.log('DEBUG: Props', props)
  //   const theme = useTheme()
  const [serverErrMessage, setserverErrMessage] = useState('')
  const authContext = useContext(AuthContext)

  console.log('DEBUG: ENTER SIGNIN SCREEN', authContext)

  // const goToSignup = () => {
  //   console.log('Create Account Pressed')
  //   console.log('DEBUG: Props.navigate', props.navigation.navigate)
  //   props.navigation.navigate('SignupScreen')
  //   //   props.navigation.navigate('Root', { screen: 'SignupScreen' });
  // }

  const goToSignup = () => {
    console.log('Create Account Pressed')
    props.navigation.navigate('SignupScreen')
  }

  const handleSubmit = (values, actions) => {
    // actions.setSubmitting(true)
    authContext
      .signIn(values.username, values.password)
      .then((result) => {
        console.log('DEBUG:  THEN HANDLE SIGNIN', result)
        actions.setSubmitting(false)
      })
      .catch((err) => {
        console.log('DEBUG: ERROR CATCH SIGNINSCREEN', err)
        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
        setserverErrMessage(resMessage)
        // props.navigation.navigate('AfterSignup', resMessage)
        actions.setSubmitting(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          isSubmitting,
          touched,
          handleBlur,
        }) => (
          <Fragment>
            <FormInput
              returnKeyType={'done'}
              name="username"
              value={values.username}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={handleChange('username')}
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur('username')}
            />
            <ErrorMessage errorValue={touched.username && errors.username} />
            <FormInput
              returnKeyType={'done'}
              name="password"
              value={values.password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              iconName="ios-lock"
              s
              iconColor="#2C384A"
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <ErrorMessage errorValue={serverErrMessage} />

            <View style={styles.buttonContainer}>
              <FormButton
                disabled={!isValid || isSubmitting}
                buttonType="outline"
                onPress={handleSubmit}
                title="Sign In"
                buttonColor="#039BE5"
                onBlur={handleBlur('password')}
                loading={isSubmitting}
              />
            </View>
          </Fragment>
        )}
      </Formik>
      <Button
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 25,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})

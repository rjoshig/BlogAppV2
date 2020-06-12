import React, { useState, Fragment, useContext } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'

import FormInput from '@components/FormInput'
import FormButton from '@components/FormButton'
import ErrorMessage from '@components/ErrorMessages'

import { AuthContext } from '@components/Context'
import Logo from '@components/Logo'
import { SignInService } from '@services/firebase/FirebaseAuth.service'

const SigninValidationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email('Invalid Email').required('Required'),
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

  const goToPasswordReset = () => {
    console.log('Reset Password Pressed')
    props.navigation.navigate('ResetPasswordScreen')
  }

  const handleSubmit = (values, actions) => {
    SignInService(values.email, values.password)
      .then((userData) => {
        console.log('DEBUG:  THEN HANDLE SIGNIN', userData)

        // This will displatch and change the state Globally
        authContext.signIn(userData)

        //    actions.setSubmitting(false)
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

    // actions.setSubmitting(true)
    // authContext
    //   .signIn(values.username, values.password)
    //   .then((result) => {
    //     console.log('DEBUG:  THEN HANDLE SIGNIN', result)
    //     actions.setSubmitting(false)
    //   })
    //   .catch((err) => {
    //     console.log('DEBUG: ERROR CATCH SIGNINSCREEN', err)
    //     const resMessage =
    //       (err.response && err.response.data && err.response.data.message) ||
    //       err.message ||
    //       err.toString()
    //     setserverErrMessage(resMessage)
    //     // props.navigation.navigate('AfterSignup', resMessage)
    //     actions.setSubmitting(false)
    //   })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validationSchema={SigninValidationSchema}
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
              name="email"
              value={values.email}
              placeholder="E-mail"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              returnKeyType={'done'}
              name="password"
              value={values.password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              iconName="ios-lock"
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

      <Button
        title="Forgot Password?"
        onPress={goToPasswordReset}
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

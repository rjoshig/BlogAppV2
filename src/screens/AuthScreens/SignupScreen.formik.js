// TODO: Signup button needs to be clicked twice. Debug
// TODO: Update Styles
// TODO: Add Captcha
import React, { useState, Fragment, useContext } from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'

import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import ErrorMessage from '../../components/ErrorMessages'

import Logo from '../../components/Logo'
import { AuthContext } from '../../components/Context'

import { b4aSignup } from '@services/ParseAuth.service'

const SignupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short! Mimimum 2 Charaters')
    .max(25, 'Too Long!')
    .required('Required'),
  email: Yup.string().label('Email').email('Invalid Email').required('Required'),
  password: Yup.string()
    .label('Password')
    .required('Required')
    .min(4, 'Password must have more than 4 characters '),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match ya fool')
    .required('Required'),
})

export default function SignupScreen(props) {
  const [serverErrMessage, setserverErrMessage] = useState('')
  const authContext = useContext(AuthContext)

  const goToSignin = () => {
    props.navigation.navigate('SigninScreen')
  }

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true)
    // Call Signup from parse.service
    b4aSignup(values.username, values.email, values.password)
      .then((result) => {
        authContext.signUp() // dispatch
        props.navigation.navigate('AfterSignup', 'User Created Successfully')
      })
      .catch((err) => {
        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
        setserverErrMessage(resMessage)
        actions.setSubmitting(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmpassword: '' }}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions)
          }}
          validationSchema={SignupValidationSchema}
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

              <FormInput
                returnKeyType={'done'}
                name="confirmpassword"
                value={values.confirmpassword}
                placeholder="Verify password"
                secureTextEntry={true}
                onChangeText={handleChange('confirmpassword')}
                iconName="ios-lock"
                iconColor="#2C384A"
              />
              <ErrorMessage errorValue={touched.confirmpassword && errors.confirmpassword} />
              <ErrorMessage errorValue={serverErrMessage} />

              <View style={styles.buttonContainer}>
                <FormButton
                  disabled={!isValid || isSubmitting}
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="Sign Up"
                  buttonColor="#039BE5"
                  onBlur={handleBlur('confirmpassword')}
                  loading={isSubmitting}
                />
              </View>
            </Fragment>
          )}
        </Formik>
        <Button
          title="Already have an account? Sign In"
          onPress={goToSignin}
          titleStyle={{
            color: '#F57C00',
          }}
          type="clear"
        />
      </ScrollView>
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

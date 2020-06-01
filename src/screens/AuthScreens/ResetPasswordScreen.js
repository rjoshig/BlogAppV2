import React, { useState, Fragment, useContext } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'

import FormInput from '@components/FormInput'
import FormButton from '@components/FormButton'
import ErrorMessage from '@components/ErrorMessages'

import { b4aResetPassword } from '@services/ParseAuth.service'

const ResetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email('Invalid Email').required('Required'),
})

// export default function ResetPassword({ route, navigation }) {
//   const message = route.params

//   const goBack = () => {
//     navigation.goBack()
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
//       <Text>Reset Password Screen </Text>
//       {/* <Text>{message}</Text> */}
//       <Button
//         title="Go Back"
//         onPress={goBack}
//         titleStyle={{
//           color: '#F57C00',
//         }}
//         type="clear"
//       />
//       {/* </View> */}
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     margin: 25,
//   },
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     flex: 1,
//     justifyContent: 'center',
//   },
// })

export default function ResetPassword(props) {
  // console.log('DEBUG: Props', props)
  //   const theme = useTheme()
  const [serverErrMessage, setserverErrMessage] = useState('')
  // const authContext = useContext(AuthContext)

  console.log('DEBUG: ENTER RESET SCREEN')

  const goBack = () => {
    props.navigation.goBack()
  }

  const goToSignup = () => {
    console.log('Create Account Pressed')
    props.navigation.navigate('SignupScreen')
  }

  const handleSubmit = (values, actions) => {
    b4aResetPassword(values.email)
      .then((result) => {
        console.log('DEBUG:  THEN HANDLE SIGNIN', result)

        // This will displatch and change the state Globally
        // authContext.signIn(result.getUsername(), result.getSessionToken())

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
        initialValues={{ username: '', email: '', password: '', confirmpassword: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validationSchema={ResetPasswordValidationSchema}
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
            <ErrorMessage errorValue={serverErrMessage} />

            <View style={styles.buttonContainer}>
              <FormButton
                disabled={!isValid || isSubmitting}
                buttonType="outline"
                onPress={handleSubmit}
                title="Submit"
                buttonColor="#039BE5"
                onBlur={handleBlur('email')}
                loading={isSubmitting}
              />
            </View>
          </Fragment>
        )}
      </Formik>
      <Button
        title="Cancel and Go Back"
        onPress={goBack}
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

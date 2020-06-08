import React, { useState, Fragment, useContext } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '@components/FormInput'
import FormButton from '@components/FormButton'
import ErrorMessage from '@components/ErrorMessages'

import { ReauthenticateWithCredentialService } from '@services/firebase/FirebaseAuth.service'
import { ProfileContext } from '@components/Context'

const PasswordValidationSchema = Yup.object().shape({
  currentpassword: Yup.string()
    .label('Password')
    .required('Required')
    .min(4, 'Password must have more than 4 characters '),
})

export default function ReAuthenticateForm() {
  const [serverErrMessage, setserverErrMessage] = useState('')

  const profileContext = useContext(ProfileContext)

  // ! Logic to Click Cancel Reauthenticate from Parent
  const handleCurrentPasswordCancel = () => {
    profileContext.onReAuthenticateCancel()
  }

  // ! Click Next
  const handleSubmit = (values, actions) => {
    // actions.setSubmitting(true)
    // const user = auth().currentUser
    // user.reauthenticateWithCredential(authContext.state.emailId, values.currentpassword)
    ReauthenticateWithCredentialService(values.currentpassword)
      .then((result) => {
        console.log('DEBUG:: handleSubmit -> result', result)
        profileContext.onReAuthenticateNext()
        // pass function from props so that thyis can be generic

        // actions.setSubmitting(false)
      })
      .catch((err) => {
        console.log('DEBUG:: handleSubmit -> err', err)
        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString()
        setserverErrMessage(resMessage)
        actions.setSubmitting(false)
      })
    actions.setSubmitting(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ currentpassword: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validationSchema={PasswordValidationSchema}
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
              name="currentpassword"
              value={values.currentpassword}
              placeholder="Current password"
              secureTextEntry={true}
              onChangeText={handleChange('currentpassword')}
              iconName="ios-lock"
              iconColor="#2C384A"
              onBlur={handleBlur('currentpassword')}
            />
            <ErrorMessage errorValue={touched.currentpassword && errors.currentpassword} />
            <ErrorMessage errorValue={serverErrMessage} />

            <View style={styles.buttonContainer}>
              <FormButton
                disabled={!isValid || isSubmitting}
                buttonType="outline"
                onPress={handleSubmit}
                title="Next"
                buttonColor="#039BE5"
                onBlur={handleBlur('currentpassword')}
                loading={isSubmitting}
              />
            </View>
          </Fragment>
        )}
      </Formik>
      <Button
        title="Cancel"
        onPress={handleCurrentPasswordCancel}
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

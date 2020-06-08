import React, { useState, Fragment, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import ErrorMessage from '../../components/ErrorMessages'
import { ProfileContext } from '@components/Context'
import { ChangePasswordService } from '@services/firebase/FirebaseAuth.service'

const ChangePasswordValidationSchema = Yup.object().shape({
  newpassword: Yup.string()
    .label('Password')
    .required('Required')
    .min(4, 'Password must have more than 4 characters '),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('newpassword'), null], 'Passwords must match ya fool')
    .required('Required'),
})

export default function NewPasswordForm() {
  const [serverErrMessage, setserverErrMessage] = useState('')
  const profileContext = useContext(ProfileContext)

  const handleNewPasswordCancel = () => {
    profileContext.onChangePasswordCancel()
  }

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true)
    // Call Signup from parse.service
    ChangePasswordService(values.newpassword)
      .then((result) => {
        console.log('DEBUG:: handleSubmit -> result', result)
        profileContext.onChangePasswordSuccess()
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ newpassword: '', confirmpassword: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
        validationSchema={ChangePasswordValidationSchema}
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
              name="newpassword"
              value={values.newpassword}
              placeholder="New password"
              secureTextEntry={true}
              onChangeText={handleChange('newpassword')}
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
                title="Submit"
                buttonColor="#039BE5"
                onBlur={handleBlur('confirmpassword')}
                loading={isSubmitting}
              />
            </View>
          </Fragment>
        )}
      </Formik>
      <Button
        title="Cancel"
        onPress={handleNewPasswordCancel}
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

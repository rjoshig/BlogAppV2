import React, { useState, Fragment, useContext } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'

import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '@components/FormInput'
import FormButton from '@components/FormButton'
import ErrorMessage from '@components/ErrorMessages'

import { ReauthenticateWithCredentialService } from '@services/firebase/FirebaseAuth.service'

import { useDispatch } from 'react-redux'
import {
  setIsReAuthenticateFormVisible,
  setIsNewPasswordFormVisible,
} from '@redux/slices/profileSlice'

const PasswordValidationSchema = Yup.object().shape({
  currentpassword: Yup.string()
    .label('Password')
    .required('Required')
    .min(4, 'Password must have more than 4 characters '),
})

export default function ReAuthenticateForm() {
  const dispatch = useDispatch()
  const [serverErrMessage, setserverErrMessage] = useState('')

  const handleCurrentPasswordCancel = () => {
    dispatch(setIsReAuthenticateFormVisible(false))
  }

  // ! Click Next convert to THUNK in profileSlice Later
  const handleSubmit = (values, actions) => {
    ReauthenticateWithCredentialService(values.currentpassword)
      .then((result) => {
        console.log('DEBUG:: handleSubmit -> result', result)
        dispatch(setIsReAuthenticateFormVisible(false))
        dispatch(setIsNewPasswordFormVisible(true))
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

import auth from '@react-native-firebase/auth'

const SignUpService = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

const SignInService = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

const SignOutService = (email, password) => {
  return auth().signOut()
}

const ReauthenticateWithCredentialService = (currentpassword) => {
  const user = auth().currentUser // ? Can I pass current User from Global State ??  // TRY
  // console.log('DEBUG:: ReauthenticateWithCredentialService -> user.email', user.email)

  // const cred = { user.email, currentpassword }
  const cred = auth.EmailAuthProvider.credential(user.email, currentpassword)

  console.log('DEBUG:: ReauthenticateWithCredentialService -> cred', cred)
  // console.log('DEBUG:: 11ReauthenticateWithCredentialService -> cred', cred)

  return user.reauthenticateWithCredential(cred)
}

const ChangePasswordService = (newPassword) => {
  const user = auth().currentUser // ? Can I pass current User from Global State ??
  console.log('DEBUG:: ChangePasswordService -> user', user)

  return user.updatePassword(newPassword)
}

// changePassword() {
// //  let self = this; // i use "self" to get around scope issues
//   var user = auth().currentUser;
//   var credential = firebase.auth.EmailAuthProvider.credential(
//       this.$store.state.userId, // references the user's email address
//       this.oldPassword
//   );

//   user.reauthenticateWithCredential(credential)
//       .then(function() {
//           // User re-authenticated.
//           user.updatePassword(self.newPassword)
//               .then(function() {
//                   console.log("Password update successful!");
//               })
//               .catch(function(error) {
//                   console.log(
//                       "An error occurred while changing the password:",
//                       error
//                   );
//               });
//       })
//       .catch(function(error) {
//           console.log("Some kinda bug: ", error);
//           // An error happened.
//       });

// const UpdateUserService = (name, password) => {

//   var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: name,
//   emailId: emailId
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });

// }

// const AuthObserver = () => {

//     function onAuthStateChanged(user) {
//         setUser(user);
//         if (initializing) setInitializing(false);
//       }

//       auth().onAuthStateChanged(onAuthStateChanged);

//     return auth().onAuthStateChanged(

//         function(user) {
//         if (user) {
//           // User is signed in.
//           var displayName = user.displayName;
//           var email = user.email;
//           var emailVerified = user.emailVerified;
//           var photoURL = user.photoURL;
//           var isAnonymous = user.isAnonymous;
//           var uid = user.uid;
//           var providerData = user.providerData;
//           // ...
//         } else {
//           // User is signed out.
//           // ...
//         }
//       }

//     )
//   }

export {
  SignInService,
  SignUpService,
  SignOutService,
  ChangePasswordService,
  ReauthenticateWithCredentialService,
}

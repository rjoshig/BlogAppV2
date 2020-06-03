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

export { SignInService, SignUpService, SignOutService }

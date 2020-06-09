import database from '@react-native-firebase/database'

// async function latestTime() {
const ReadUserTableService = async (uid) => {
  const data = await database()
    .ref('users/' + uid)
    .once('value')
  console.log('DEBUG:: ReadUserTableService -> data', data)

  return data

  // ? OR just do return on teh function itself
  // .then((data) => {
  //   console.log('DEBUG:: ReadUserTableService -> data', data)

  //   return data
  // })
}

const UpdateUserTableService = async (uid, userData) => {
  const data = await database()
    .ref('users/' + uid)
    .set({
      aboutme: userData.aboutme,
      email: userData.email,
      displayName: userData.displayName,
    })
}

export { ReadUserTableService, UpdateUserTableService }

// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

// database()
//   .ref('/users/123')
//   .once('value')
//   .then(snapshot => {
//     console.log('User data: ', snapshot.val());
//   });

//   database()
//   .ref('/users/123')
//   .set({
//     name: 'Ada Lovelace',
//     age: 31,
//   })
//   .then(() => console.log('Data set.'));

// async function latestTime() {
//   const bl = await web3.eth.getBlock('latest');
//   console.log(bl.timestamp); // Returns a primitive
//   console.log(typeof bl.timestamp.then == 'function'); //Returns false - not a promise
//   return bl.timestamp;
// }
// const time = latestTime(); // Promise { <pending> }

// async function latestTime() {
//   const bl = await web3.eth.getBlock('latest');
//   console.log(bl.timestamp); // Returns a primitive
//   console.log(typeof bl.timestamp.then == 'function'); //Returns false - not a promise
//   return bl.timestamp;
// }

// function latestTime() {
//   return new Promise(function(resolve,success){
//       const bl = web3.eth.getBlock('latest');
//       bl.then(function(result){
//           console.log(result.timestamp); // Returns a primitive
//           console.log(typeof result.timestamp.then == 'function'); //Returns false - not a promise
//           resolve(result.timestamp)
//       })
// }

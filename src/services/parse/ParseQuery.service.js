import { Parse } from 'parse/react-native'

const b4aGetUserInfo = async (username) => {
  // const User = new Parse.User()
  const query = new Parse.Query(Parse.User)
  // const query = new Parse.Query(User)

  query.equalTo('username', username)

  const results = await query.find()
  console.log('DEBUG:: b4aGetUserInfo -> results', results.username)
}

// var query = new Parse.Query(myclass);
// query.find().then((results) => {
//   // results is an array of parse.object.
// }).catch((error) =>  {
//  // error is an instance of parse.error.
// });

// const query = new Parse.Query(Parse.User);
// query.equalTo("gender", "female");  // find all the women
// const women = await query.find();

//   const GameScore = Parse.Object.extend("GameScore");
// const query = new Parse.Query(GameScore);

// query.equalTo("playerName", "Dan Stemkoski");
// const results = await query.find();

// alert("Successfully retrieved " + results.length + " scores.");
// // Do something with the returned Parse.Object values
// for (let i = 0; i < results.length; i++) {
//   var object = results[i];
//   alert(object.id + ' - ' + object.get('playerName'));
// }

//   user.attributes should hold all the user attributes saved server side

export { b4aGetUserInfo }

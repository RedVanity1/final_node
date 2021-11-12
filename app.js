const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var admin = require('firebase-admin');

var serviceAccount = require("./node-77c7c-firebase-adminsdk-5ykf5-0c0554396a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-77c7c-default-rtdb.firebaseio.com"
});

app.use(express.json());
app.use(express.static('public'));
app.use(
	cors({
		origin: '*'
	})
);

const database = admin.database();
const dbRef = database.ref('/shelf');

app.get('/', (req, res) => {
	res.send('index');
});

app.post('/add', (req, res) => {
	console.log(req.body);
	console.log('SAVING...');

	dbRef.child(req.body.game_id).set({
		gameName: req.body.game_name,
		gamePrice: req.body.game_price
	});
	res.status(200).json({ message: 'Successfully added' });
	console.log('Successfully added!');
});


/*app.put('/update', (req, res) => {
	console.log(req.body);
	console.log('UPDATING...');
	const newData = {
		gameName: req.body.game_name,
		gamePrice: req.body.game_price
	};
	dbRef.child(req.body.game_id).update(newData);
	res.status(200).json({ message: 'Successfully updated' });
	console.log('Successfully updated!');
});*/

app.delete('/delete', (req, res) => {
	console.log(req.body);
	console.log('DELETING...');
	dbRef.child(req.body.game_id).remove();
	res.status(200).json({ message: 'Successfully removed' });
	console.log('Successfully removed!');
});

dbRef.on('value', (snapshot) => {
	console.log(snapshot.val());
}, (errorObject) => {
	console.log('The read failed: ' + errorObject.name);
});

app.listen(port, () => {
	console.log(`App is listening to port ${port}`);
});
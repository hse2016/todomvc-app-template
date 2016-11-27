/**
 * Created by tema on 27.11.16.
 */

const express = require('express');

const app = express();
app.use(express.logger());

app.use(express.static('css'));
app.use(express.static('js'));

app.get('/', (request, response) => {
	response.render('index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

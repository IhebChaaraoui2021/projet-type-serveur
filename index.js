const app = require('./app');

app.listen(8080, () => console.log('server listening on port 8080'));
PORT = process.env.PORT || 5500 ;

    app.listen (PORT, () => {
		console.log("server is running on", PORT)
	})

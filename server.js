import express from 'express';

const app = express();
app.set('port', (process.env.PORT || 3001));

app.use(express.static(__dirname + '/build'));

app.get("*", (req, rw) => {
  rw.sendFile(__dirname + '/build/index.html');
});

app.listen(app.get('port'), () => {
  console.log(
    `Find the server at: http://localhost:${app.get('port')}/`,  // eslint-disable-line no-console
  );
});

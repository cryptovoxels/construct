import express from "express"
import browserify from 'browserify-middleware'

const app = express()
const port = 3000

app.get('/', (req, res) => res.send(`
<html>
  <style>html,body,canvas{width: 100%; height: 100%; overflow: hidden; margin: 0; padding: 0}</style>
  <body>
    <script src="/bundle.js"></script>
  </body>
</html>
`))

app.get('/bundle.js', browserify('src/client.ts', { 
  plugin: ['tsify']
}))

app.use(express.static('public'))

app.listen(port, () => console.log(`Construct listening on port ${port}!`))
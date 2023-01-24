import app from './app'
import { APP_PORT } from './config/config.default'

app.listen(APP_PORT, () => {
  console.log('server running at http://localhost:8000')
})

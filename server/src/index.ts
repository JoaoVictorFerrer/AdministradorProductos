import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold(`escuchando en el puerto ${port}`))
})
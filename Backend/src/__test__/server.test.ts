// //no hace falta importar ya que la carpeta esta nombrada de la forma que jest ya sabe donde encontrar , como tambien el archivo esta nombrado de forma correcta.
// describe('', () => {
//     // test() esta una sixtaxis pero se puede utilizar it() ya que es un alias de test
//     it('Debe revisar que 1 + 1 sean 2', () => {
//         expect(1+1).toBe(2)
//     })


//     it('Debe revisar que 1 + 1 sean 2', () => {
    //         expect(1+1).not.toBe(3)
    //     })
    // })
    
    //TEST CON SUPERTEST PARA EL SERVER
    
import server,{connectDB} from "../server";
import db from "../config/db";
import request from "supertest";


describe('GET/api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')
        // console.log(res.headers['content-type'])
        // console.log(res.headers)
        expect(res.status).not.toBe(404) //probar tambien en la negacion
        expect(res.body).not.toBe('desde api')
   }) 
});

jest.mock("../config/db")

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})


import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName:'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string
    @Column({
        type: DataType.FLOAT
    })
    declare price: number
    @Default(true) // le paso el valor por default antes de inicializar la conlumna correspondiente para que tome el valor por defecto correcto
    @Column({
        type:DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product
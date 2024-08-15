import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getListProduct, updateAvaibility } from "../services/ProductService";
import ProductDetail from "../components/ProductDetail";
import { Product } from "../types";

export async function loader() {
  const products = await getListProduct();
  return products;
}

export async function  action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
   await updateAvaibility(+data.id)
    return {}
    
}

export default function Products() {
  // la forma de conectar el loader con el componente Products

  const products = useLoaderData() as Product[]
  // console.log(products);


  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500"> Productos </h2>
        <Link
          to="/producto/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetail
                product={product}
                key={product.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
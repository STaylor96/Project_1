import { ProductTable } from "../components/Table/ProductTable";
import { ProductForm } from "../components/Form/ProductForm";

export const Catalog = () => {
    return (
        <>
        <h1>Catalog</h1>

        <ProductTable />
        <ProductForm />
        </>
    )
}
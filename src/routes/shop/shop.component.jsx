import { Routes,Route } from 'react-router-dom';
import CategoriesPreivew from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import {ProductsContainer} from './shop.styles.jsx';

const Shop = () => {
    
    return(
        <div className='shop-container'>
            <Routes>
                <Route index element={<CategoriesPreivew></CategoriesPreivew>}></Route>
                <Route path=':category' element={<Category></Category>}></Route>
            </Routes>
        </div>
        
    )

}
export default Shop;
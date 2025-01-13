import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import CategoryPage from './pages/CategoryPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import UserPage from './pages/UserPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <UserPage>
                    <div className="app-container">
                        <Header/>
                        <div className="main-content container mx-auto p-4">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/products" element={<ProductsPage/>}/>
                                <Route path="/categories" element={<CategoriesPage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/register" element={<RegisterPage/>}/>
                                <Route path="/products/:id" element={<ProductPage/>}/>
                                <Route path="/create-product" element={<CreateProductPage/>}/>
                                <Route path="/edit-product/:id" element={<EditProductPage/>}/>
                                <Route path="/categories/:id" element={<CategoryPage/>}/>
                                <Route path="/manage-users" element={<ManageUsersPage/>}/>
                                <Route path="/manage-categories" element={<ManageCategoriesPage/>}/>
                            </Routes>
                        </div>
                        <Footer/>
                    </div>
                </UserPage>
            </Router>
        </AuthProvider>
    );
};

export default App;

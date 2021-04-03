import React, {useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Product from "../components/Product";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    //dispatch actions using this hook
    const dispatch = useDispatch();
    const productList = useSelector(state => {
        return state.productList
    });
    const { loading, error, products } = productList;

    const userTopSellerList = useSelector(state => state.userTopSellerList);
    const { loading: loadingSellers, error: errorSellers, sellers } = userTopSellerList;
    
    //fetch list of products and top sellers from backend
    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(listTopSellers());
    }, [dispatch]);

    return (
        <main>
            <h2>Top Sellers</h2>
            {loadingSellers ? (
                <LoadingBox></LoadingBox>
            ) : errorSellers ? (
                <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
                <>
                    {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                    <Carousel showArrows autoPlay showThumbs={false}>
                        {sellers.map(seller => (
                            <div key={seller._id}>
                                <Link to={`/seller/${seller._id}`}>
                                    <img src={seller.seller.logo} alt={seller.seller.name} />
                                    <p className="legend">{seller.seller.name}</p>
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </>
            )}
            <h2>Featured Products</h2>
            {loading ? (
                <LoadingBox />
            )
            : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            )
            : (
                <>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                        {
                            products.map(product => {
                                return (
                                    <Product key={product._id} product={product} />
                                )
                            })
                        }
                    </div>
                </>           
            )
            }       
        </main>
    )
}

export default HomeScreen;

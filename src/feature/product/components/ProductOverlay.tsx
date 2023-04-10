// import Loading from "../../../components/loading/Loading";
import React from "react";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";

export default function ProductOverlay(props: any) {
  // const { product } = props;
  // const user = useSelector((state) => state.auth.user);
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const [isWishListLoading, setIsWishListLoading] = useState(false);
  // const [isCartLoading, setIsCartLoading] = useState(false);

  // const cartClick = async () => {
  //   try {
  //     setIsCartLoading(true);
  //     if (user) {
  //       await dispatch(
  //         addCart({ body: { productId: product._id, quantity: 1 } })
  //       );
  //       toast.success("Add to cart successfully");
  //     } else {
  //       history.push("/user");
  //     }
  //     setTimeout(() => {
  //       setIsCartLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const wishlistClick = async () => {
  //   try {
  //     setIsWishListLoading(true);
  //     await favoriteProductApi.add({ product: product._id, user: user._id });
  //     setTimeout(() => {
  //       setIsWishListLoading(false);
  //     }, 1000);
  //     toast.success("Add favorite product");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const redirect = () => {
  //   history.push(`/product/${product._id}`);
  // };

  return (
    <div className="Product-Overlay">
      <div className="product-icon-box flex icon-cart">
        {/* {isCartLoading ? (
          <Loading backgroundColor="#fff" />
        ) : (
          <AddShoppingCart className="product-icon" />
        )} */}
				<AddShoppingCart className="product-icon" />
      </div>
      <div
        className="product-icon-box flex icon-wishlist"
      >
        {/* {isWishListLoading ? (
          <Loading backgroundColor="#fff" />
        ) : (
          <FavoriteBorder className="product-icon" />
        )} */}
				<FavoriteBorder className="product-icon" />
      </div>
    </div>
  );
}

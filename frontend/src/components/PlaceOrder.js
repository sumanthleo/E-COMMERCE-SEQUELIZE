import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWalletBalnce } from "../redux/actions/authAction";
import { addShippingAddress } from "../redux/actions/shippingAddressActions";
import "../styles/placeorder.css";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const [shippingAddressData, setShippingAddressData] = useState({});
  console.log(shippingAddressData);

  const cartProducts = useSelector((state) => state.cart.CartProducts);

  const totalQuantity = cartProducts
    .map((products) => products.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  console.log(totalQuantity);
  const totalAmount = cartProducts
    .map((products) => products.price)
    .reduce((acc, curr) => acc + curr, 0);
  console.log(totalAmount);

  const users = useSelector((state) => state.user);
  const { userData, token } = users;

  // const shippingAddress = useSelector((state) => state.shippingAddress);
  // const { shippingAddressData, isShippingAddressAdded } = shippingAddress;

  const [isOrderCreated, setIsOrderCreated] = useState(false);
  console.log(isOrderCreated);

  useEffect(() => {
    fetchShippingAddress();
  }, []);

  const dispatch = useDispatch();

  const fetchShippingAddress = async () => {
    try {
      const shippingAddress = await axios.get(
        `http://localhost:8080/api/v1/auth/shippingaddress/${userData.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch(addShippingAddress(shippingAddress.data.data))
      setShippingAddressData(shippingAddress.data.data);
    } catch (e) {
      console.log("!!!!Error!!!!!!!!!", e);
    }
  };

  // CheckOutAPI...

  const checkOutHandler = async () => {
    try {
      if (userData.user_wallet_balance === 0) {
        alert("Your wallet is empty please Top up the Wallet Balance");
        return;
      }

      if (userData.user_wallet_balance < totalAmount) {
        alert("Not enough balance");
        return;
      }

      const data = {
        userId: userData.id,
        products: cartProducts,
        shippingaddress_id: shippingAddressData.id,
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };

      const checkOutData = await axios.post(
        "http://localhost:8080/api/v1/auth/createorder",
        data,
        { headers }
      );
      console.log(checkOutData.data.data);
      // dispatch(userWalletBalnce(checkOutData.data.data));
      setIsOrderCreated(true);
    } catch (error) {
      console.log("!!!Error!!!", error);
    }
  };

  if (isOrderCreated) {
    alert("Order Created Successfully");
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />
      <div style={{ marginLeft: "5%", marginTop: "20px", color: "green" }}>
        <h2>Preview Orders</h2>
      </div>

      <div>
        <div className="shipping_details">
          <h3>Shipping Detail</h3>
          <div className="name">
            <span style={{ fontWeight: "bold" }}>Name : </span>
            <span>{`${userData.first_name} ${userData.last_name}`}</span>
          </div>
          <div className="address">
            <span style={{ fontWeight: "bold" }}>Address : </span>
            <span>{shippingAddressData.address}</span>
          </div>
        </div>

        <div className="order_details">
          <h3>Order Details</h3>
          <div className="item_quantity">
            <span style={{ fontWeight: "bold" }}>Items : </span>{" "}
            <span>&#8377; {totalQuantity}</span>
          </div>
          <div className="Subtotal">
            <span style={{ fontWeight: "bold" }}>Subtotal : </span>{" "}
            <span>&#8377; {totalAmount}</span>
          </div>
          <div>
            <div className="place_order_btn">
              <button onClick={checkOutHandler}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

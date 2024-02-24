import classes from "./Product.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useState } from "react";

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, { locale: "en-US" });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API + "/create_preference",
        {
          title: "Sneakers",
          quantity: 1,
          price: 2000,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h1>Integration with</h1>
        <img
          src="https://i.pinimg.com/originals/71/81/e8/7181e84d50cb87fa4ab9a5a8ab613dbe.jpg"
          alt="mp-logo"
        />
      </div>
      <div className={classes.card}>
        <div className={classes.content}>
          <img
            src="https://res.cloudinary.com/dsx2jopbh/image/upload/v1708345548/cld-sample-5.jpg"
            alt="product img"
          />
          <h3>Sneakers</h3>
          <p className={classes.price}>$ 2000</p>
          <button className={classes.buttonPay} onClick={handleBuy}>
            Buy
          </button>
          {preferenceId && (
            <Wallet
              initialization={{
                preferenceId: preferenceId,
                redirectMode: "modal",
              }}
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

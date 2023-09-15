import React, { useEffect, useState } from "react";
import logo from "../assets/Black White Modern Concept Football Club Logo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { containsNumbers, containsLetters } from "../utils/utils";
import { Toaster, toast } from "sonner";

const Checkout = () => {
  const [cartId, setCartId] = useState("");
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryStreets, setDeliveryStreets] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [reciever, setReciever] = useState("");
  const [cardCompany, setCardCompany] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [cardName, setCardName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((response) => {
        setCartId(response.data.cart.id);
        setCartProducts(response.data.items);
      })
      .catch((err) => console.log(err));


  }, []);


  const handleCheckout = () => {
    axios
      .put(`/api/cart/${cartId}`, {
        deliveryAddress,
        deliveryStreets,
        deliveryZipCode,
        deliveryCity,
        reciever,
        cardCompany,
        cardNumber,
        cardCode,
        cardName,
        phoneNumber,
        completed: true,
      })
      .then(() => {
        toast.success("Tu compra fue realizada con éxito. Revisa tu email.");
        setTimeout(() => {
          navigate("/history");
        }, 1500);
      })
      .catch((err) => {
        toast.error("No se pudo realizar la compra");
        console.log(err);
      });

    if (cartProducts.length > 0) {
      cartProducts.map((product) => {
        const prodId = product.id;

        const remainingStock = {
          stock: product.stock - product.cart_products.quantity,
        };

        axios
          .put(`/api/products/${prodId}`, remainingStock)
          .then((response) => console.log("RESPUESTA", response))
          .catch((error) => {
            alert(error);
          });
      });
    }
  };

  return (
    <div className="contenedor">
      <Toaster richColors position="top-center" />
      <div className="text-center">
        <img
          className="mb-2 mt-5"
          style={{ borderRadius: 300, maxHeight: "150px", maxWidth: "200px" }}
          src={logo}
          alt=""
        />
        <h2>Ya casi es tuyo!</h2>
        <p>No compartiremos tu informacion de pago con nadie.</p>
      </div>
      <div className="container-for-pay">
        <h4>Lugar de entrega: </h4>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
        >
          <div>
            <label htmlFor="adress" className="form-label">
              Direccion de envio:
            </label>
            <input
              id="address"
              type="text"
              className="form-control"
              placeholder="Ej: Rawson 8833"
              required
              onChange={(e) => setDeliveryAddress(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  if (!containsNumbers(e.target.value)) {
                    alert("La dirección no es válida");
                    return (e.target.value = "");
                  }
                }
              }}
            />
          </div>
          <label htmlFor="streets" className="form-label mt-3">
            Entre Calles:
          </label>
          <input
            id="streets"
            type="text"
            className="form-control"
            placeholder="Ej: Mariano Moreno y Avellaneda"
            required
            onChange={(e) => setDeliveryStreets(e.target.value)}
          />
          <label htmlFor="postal" className="form-label mt-3">
            Codigo Postal:
          </label>
          <input
            id="postal"
            type="text"
            className="form-control"
            placeholder="Ej: 1718"
            required
            onChange={(e) => setDeliveryZipCode(e.target.value)}
            onBlur={(e) => {
              if (e.target.value) {
                if (
                  e.target.value.length !== 4 ||
                  containsLetters(e.target.value)
                ) {
                  alert("El código postal no es válido");
                  return (e.target.value = "");
                }
              }
            }}
          />
          <label htmlFor="ciudad" className="form-label mt-3">
            Ciudad:
          </label>
          <input
            id="ciudad"
            type="text"
            className="form-control"
            placeholder="Ej: Buenos Aires"
            required
            onChange={(e) => setDeliveryCity(e.target.value)}
          />
          <label htmlFor="received" className="form-label mt-3">
            Nombre Completo de la persona que recibe el paquete:
          </label>
          <input
            id="received"
            type="text"
            className="form-control"
            placeholder="Ej: Luis Moreno Garcia"
            required
            onChange={(e) => setReciever(e.target.value)}
            onBlur={(e) => {
              if (e.target.value) {
                if (containsNumbers(e.target.value)) {
                  alert("El nombre no puede contener números");
                  return (e.target.value = "");
                }
              }
            }}
          />
          <hr />

          <h4 className="mt-3 mb-3">Pago: </h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="mastercard"
              onClick={(e) => setCardCompany(e.target.id)}
            />
            <label className="form-check-label" htmlFor="mastercard">
              Mastercard
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="visa"
              onClick={(e) => setCardCompany(e.target.id)}
            />
            <label className="form-check-label" htmlFor="visa">
              Visa
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="maestro"
              onClick={(e) => setCardCompany(e.target.id)}
            />
            <label className="form-check-label" htmlFor="maestro">
              Maestro
            </label>
          </div>
          <label htmlFor="credit-card" className="form-label">
            Numero de tarjeta (Sin espacios):
          </label>
          <input
            id="credit-card"
            type="text"
            className="form-control"
            placeholder="Ej: 9999888877776666"
            required
            onChange={(e) => setCardNumber(e.target.value)}
            onBlur={(e) => {
              if (e.target.value) {
                if (
                  e.target.value.length !== 16 ||
                  containsLetters(e.target.value)
                ) {
                  alert("El n° de tarjeta no es válido");
                  return (e.target.value = "");
                }
              }
            }}
          />

          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label">
              Codigo de seguridad
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="3 dígitos"
              required
              onChange={(e) => setCardCode(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  if (
                    e.target.value.length !== 3 ||
                    containsLetters(e.target.value)
                  ) {
                    alert("El código de seguridad no es válido");
                    return (e.target.value = "");
                  }
                }
              }}
            />
          </div>

          <label htmlFor="name-card" className="form-label mt-3">
            Nombre y Apellido (Como figura en la Tarjeta):
          </label>
          <input
            id="name-card"
            type="text"
            className="form-control"
            placeholder="Ej: JULIAN G. RAMIREZ"
            required
            onChange={(e) => setCardName(e.target.value)}
            onBlur={(e) => {
              if (e.target.value) {
                if (containsNumbers(e.target.value)) {
                  alert("El nombre no puede contener números");
                  return (e.target.value = "");
                }
              }
            }}
          />

          <label htmlFor="number" className="form-label mt-3">
            Numero Telefonico:
          </label>
          <input
            id="number"
            type="number"
            className="form-control "
            placeholder="Ej: 11 9999 9999"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={(e) => {
              if (e.target.value) {
                if (
                  e.target.value.length !== 10 ||
                  containsLetters(e.target.value)
                ) {
                  alert("El número de celular no es válida");
                  return (e.target.value = "");
                }
              }
            }}
          />
          <small>No incluyas el prefijo.</small>
          <hr />
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-3"
          >
            <button type="submit" className="btn btn-dark mb-5">
              Finalizar mi compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

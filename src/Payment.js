import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckouForm";
import { useParams } from "react-router-dom";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { productId } = useParams();

  useEffect(() => {
    // fetch("/config").then(async (r) => {
    fetch("http://localhost:3000/mido/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    // fetch("/create-payment-intent", {
    fetch("http://localhost:3000/mido/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        id: parseInt(productId),
      }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [productId]);

  return (
    <div style={{}}>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, locale: "ja" }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;

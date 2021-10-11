import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { usePurchase } from "../hooks/usersHooks"
import axios from "axios"
const HOST = "http://localhost:4000"

const Stripe = ({ formik, user, history }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [purchase, loading, error] = usePurchase()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          city: formik.values.city,
          country: "AR",
          line1: `${formik.values.street.trim()} ${formik.values.number}`,
          line2: formik.values.city,
          postal_code: formik.values.zipCode,
          state: formik.values.state,
        },
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        phone: user.phone,
      },
    })

    if (error) {
      console.log("[error]", error)
    } else {
      try {
        const authorization = await axios.post(
          `${HOST}/api/stripe/payment-intent`,
          { id: paymentMethod.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        const details = {
          direction: formik.values,
          paymentDetails: {
            method: "STRIPE",
            orderId: paymentMethod.id,
            receipt: authorization.data.response.charges.data[0].receipt_url,
          },
        }
        const res = await purchase(details)
        console.log(res)
        // aquí termina la compra... hacer checkout
        history.push({ pathname: "/checkout", state: res })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "30vw" }}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "red",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || loading}>
        Pay
      </button>
    </form>
  )
}
export default Stripe
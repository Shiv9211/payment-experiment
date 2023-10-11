import React from "react";
import axios from "axios";

function UserCard ({ userData }) {

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_7I3TzO3BuoWAJd", // Enter the Key ID generated from the Dashboard
            amount: '500',
            currency: 'INR',
            name: "shivansh test",
            description: "Test Transaction",
            order_id: 'order_MkW6HgdfGpaOv0',
            handler: async function (response) {
                const data = {
                    orderCreationId: 'order_MkW6HgdfGpaOv0',
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

            },
            prefill: {
                name: "Shivansh Test",
                email: "test@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Payment experiments Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}

 return (
    <div className="w-2/5 border border-slate-50 rounded-lg h-auto p-3 flex justify-center items-center flex-col gap-3">
        <div className="flex flex-col gap-2 justify-center items-center border bg-slate-50 rounded-xl p-3 w-full ">
            <img className="w-20 h-20 rounded-full" src={userData.picture.thumbnail} alt="thumbnail" />
            <p className="text-xl font-semibold text-gray-500">{ `${userData.name.title} ${userData.name.first} ${userData.name.last}` }</p>
            <p className=""><span className="font-bold">Email:</span> { userData.email }</p>
            <p className=""><span className="font-bold">Phone no:</span> { userData.phone }</p>
            <p className=""><span className="font-bold">Gender:</span> { userData.gender }</p>

        </div>
        <div className="w-full h-20 flex justify-between items-center gap-6">
        <button className="w-full h-14 bg-yellow-100 text-red-500 rounded-lg" onClick={displayRazorpay}>Make Payment</button>
        </div>
        
    </div>
 )
}

export default UserCard
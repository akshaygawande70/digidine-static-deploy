import React from "react";
import { Card, CardBody, Button, IconButton, Typography } from "@material-tailwind/react";
import { CustomerNavbar } from "@/widgets/layout";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context/CartProvider";

export function CartPage() {
    const { cart, setCart } = useCart();

    const handleQuantityChange = (itemId, delta) => {
        const updatedCartItems = cart.map(item =>
            item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        setCart(updatedCartItems);
    };

    const handleRemoveFromCart = (itemId) => {
        const updatedCartItems = cart.filter(item => item.id !== itemId);
        setCart(updatedCartItems);
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 20.00;
    const tax = 10.00;
    const total = subtotal + deliveryCharge + tax;

    return (
        <>
            <CustomerNavbar />
            <div className="pt-4 space-y-4 max-w-screen-lg mx-auto">
                {/* Cart Items */}
                <div className="space-y-4">
                    {cart.map((item) => (
                        <Card key={item.id} className="rounded-xl shadow-md p-4 bg-white flex">
                            {/* Content Container */}
                            <div className="flex flex-1 items-start space-x-4">
                                {/* Image */}
                                <div className="flex-shrink-0 w-24 h-24 relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    {/* Title and Description */}
                                    <div>
                                        <Typography variant="h6" color="black" className="mb-1">{item.name}</Typography>
                                        <Typography className="text-sm text-gray-600">{item.description}</Typography>
                                    </div>

                                    {/* Price and Quantity Controls */}
                                    <div className="flex items-center justify-between mt-2">
                                        {/* Price */}
                                        <Typography className="text-lg font-bold">
                                            {item.currency}{(item.price * item.quantity).toFixed(2)}
                                        </Typography>

                                        {/* Quantity Controls and Delete Button */}
                                        <div className="flex items-center space-x-2">
                                            <IconButton
                                                size="sm"
                                                color="green"
                                                variant="outlined"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                            >
                                                <MinusIcon className="w-5 h-5" />
                                            </IconButton>
                                            <span className="text-lg">{item.quantity}</span>
                                            <IconButton
                                                size="sm"
                                                color="green"
                                                variant="outlined"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                            >
                                                <PlusIcon className="w-5 h-5" />
                                            </IconButton>
                                            <IconButton
                                                size="sm"
                                                color="red"
                                                variant="outlined"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                className="ml-2"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Cart Summary */}
                <Card className="bg-white shadow-md rounded-xl p-4">
                    <CardBody>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Delivery Charge:</span>
                                <span className="font-semibold">${deliveryCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Button color="green" className="w-full mt-4">
                                Place Order
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default CartPage;

import React, { useState, useEffect } from "react";
import {
  CardBody,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCart } from "@/context/CartProvider"; // Import the useCart hook

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open.includes(id) ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function CustomerItemsList({ category }) {
  const [open, setOpen] = useState([category.id]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cart, setCart } = useCart(); // Destructure cart and setCart from useCart

  const handleOpen = (value) => {
    setOpen(open.includes(value) ? open.filter((id) => id !== value) : [...open, value]);
  };

  const handleAddClick = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleIncrement = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);
      return updatedCart;
    });
  };

  const handleMoreClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Accordion open={open.includes(category.id)} icon={<Icon id={category.id} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(category.id)} className="text-base">
          {category.category}
        </AccordionHeader>
        <AccordionBody className="p-0">
          {category.items.map((item, index) => (
            <CardBody
              key={item.id}
              className={`py-0 px-0 flex flex-col ${index > 0 ? "border-t border-gray-200" : ""}`}
            >
              <div className="flex items-center bg-white p-4 px-0">
                <div className="flex flex-col flex-grow">
                  {item.isBestseller && (
                    <div className="flex items-center mb-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">
                        ★ Bestseller
                      </span>
                    </div>
                  )}
                  <Typography variant="h6" color="black" className="mb-1">
                    {item.name}
                  </Typography>
                  {item.extras && (
                    <Typography className="text-sm text-gray-600">{item.extras}</Typography>
                  )}
                  <Typography className="text-lg font-bold mt-2">
                    {item.currency}
                    {item.price}
                  </Typography>
                  <Typography className="text-xs text-gray-500 mt-1">
                    {item.description.slice(0, 50)}...
                    <span className="text-blue-500 cursor-pointer" onClick={() => handleMoreClick(item)}>
                      More
                    </span>
                  </Typography>
                </div>

                <div className="flex flex-col items-end">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-lg w-28 h-28 object-cover mb-2"
                  />
                  <div className="flex items-center justify-between w-24">
                    {cart.find((cartItem) => cartItem.id === item.id) ? (
                      <div className="flex items-center w-full h-10">
                        <Button
                          variant="text"
                          size="sm"
                          color="gray"
                          className="rounded-full w-8 h-8"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </Button>
                        <div className="text-center w-8">
                          {cart.find((cartItem) => cartItem.id === item.id).quantity}
                        </div>
                        <Button
                          variant="text"
                          size="sm"
                          color="green"
                          className="rounded-full w-8 h-8"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="filled"
                        size="sm"
                        color="green"
                        className="w-full h-10"
                        onClick={() => handleAddClick(item)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          ))}
        </AccordionBody>
      </Accordion>

      {selectedItem && (
        <Dialog open={modalOpen} handler={closeModal} size="lg">
          <DialogBody divider className="flex flex-col items-center">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="rounded-lg w-full object-cover mb-4"
            />
            <Typography variant="h5" color="black" className="mb-2">
              {selectedItem.name}
            </Typography>
            <Typography className="text-sm text-gray-600 mb-4">
              {selectedItem.description}
            </Typography>
            <Typography className="text-sm text-gray-600">{selectedItem.extras}</Typography>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={closeModal} className="mr-2">
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}

export default CustomerItemsList;

import React, { useRef, useState, useEffect } from "react";
import { Card, CardBody, Input } from "@material-tailwind/react";
import {
  CustomerItemsCategories,
  CustomerItemsList,
  CustomerOffersSwiper,
} from ".";
import foodItemsData from "@/data/food-items-data";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CustomerNavbar } from "@/widgets/layout";

export function CustomerHome() {
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState({});
  const [cartItemsTotal, setCartItemsTotal] = useState("");
  const searchItemsRef = useRef(null);
  const itemCategoryRefs = useRef([]);

  useEffect(() => {
    console.log("cart::", cart);
    setCartItemsTotal(Object.values(cart).reduce((acc, curr) => acc + curr, 0));
  }, [cart]);

  const searchLower = searchText ? searchText.toLowerCase() : "";

  // Filter and sort the categories and subcategories based on searchText
  const filteredFoodItemsList = foodItemsData
    .filter(
      (category) =>
        category.category.toLowerCase().includes(searchLower) ||
        category.items.some((item) =>
          item.name.toLowerCase().includes(searchLower)
        )
    )
    .map((category) => ({
      ...category,
      items: category.items
        .filter((item) =>
          item.name.toLowerCase().includes(searchLower)
        )
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ),
    }))
    .sort((a, b) =>
      a.category.toLowerCase().localeCompare(b.category.toLowerCase())
    );

  const scrollOnSearchClick = () => {
    if (searchItemsRef.current) {
      searchItemsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCategoryClick = (id) => {
    if (itemCategoryRefs.current[id]) {
      itemCategoryRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };



  return (
    <>
      <CustomerNavbar cartItemsTotal={cartItemsTotal} />
      <Card className="rounded-xl overflow-hidden shadow-sm mt-2">
        <CardBody className="p-4">
          <div className="slider-container">
            <CustomerOffersSwiper />
          </div>
          <div className="mt-2">
            <CustomerItemsCategories
              categories={foodItemsData}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </CardBody>
      </Card>
      <Card
        className="mt-2 rounded-b-none sticky top-0 z-40 bg-white w-full shadow-sm"
        ref={searchItemsRef}
      >
        <CardBody className="p-4">
          <div className="bg-gray-200/70">
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              label="Search"
              // onClick={scrollOnSearchClick}
              // onTouchStart={scrollOnSearchClick}
              // onFocus={scrollOnSearchClick}
              icon={
                searchText ? (
                  <XMarkIcon
                    className="w-5 h-5 text-gray-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchText("");
                    }}
                  />
                ) : (
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                )
              }
            />
          </div>
        </CardBody>
      </Card>
      {filteredFoodItemsList.map((filteredFoodItemsObj, index) => (
        <Card
          key={filteredFoodItemsObj.id}
          className={`${index === 0 ? "rounded-t-none" : "rounded-xl"
            } mb-2`}
          ref={(el) => (itemCategoryRefs.current[filteredFoodItemsObj.id] = el)}
        >
          <CardBody className="pt-0">
            <CustomerItemsList category={filteredFoodItemsObj} cart={cart} setCart={setCart} />
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default CustomerHome;

import React from "react";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export function CustomerOffersSwiper() {
  return (
    <Swiper pagination={true} modules={[Pagination]} loop={true} className="mySwiper rounded-xl">
      <SwiperSlide>
        <Card className="rounded-xl overflow-hidden">
          <CardBody className="p-0">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#CDFAD5] via-[#A1FCDF] to-[#7FD8BE] p-6 rounded-lg">
              <div>
                <h6 className="text-[#FF8080] font-semibold">#Saturday Offer</h6>
                <p className="text-sm text-gray-700">Order Some Steak with Potato and get flat 60% Off</p>
              </div>
              <img
                src="https://img.freepik.com/premium-photo/typical-indian-dish-thali-vegetarian-dishes-one-large-round-plate_549515-314.jpg?w=740" // Replace with your image path
                alt="Offer"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </CardBody>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card className="rounded-xl overflow-hidden">
          <CardBody className="p-0">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#CDFAD5] via-[#A1FCDF] to-[#7FD8BE] p-6 rounded-lg">
              <div>
                <h6 className="text-[#FF8080] font-semibold">#Saturday Offer</h6>
                <p className="text-sm text-gray-700">Order Some Steak with Potato and get flat 60% Off</p>
              </div>
              <img
                src="https://img.freepik.com/premium-photo/typical-indian-dish-thali-vegetarian-dishes-one-large-round-plate_549515-314.jpg?w=740" // Replace with your image path
                alt="Offer"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </CardBody>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card className="rounded-xl overflow-hidden">
          <CardBody className="p-0">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#CDFAD5] via-[#A1FCDF] to-[#7FD8BE] p-6 rounded-lg">
              <div>
                <h6 className="text-[#FF8080] font-semibold">#Saturday Offer</h6>
                <p className="text-sm text-gray-700">Order Some Steak with Potato and get flat 60% Off</p>
              </div>
              <img
                src="https://img.freepik.com/premium-photo/typical-indian-dish-thali-vegetarian-dishes-one-large-round-plate_549515-314.jpg?w=740" // Replace with your image path
                alt="Offer"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </CardBody>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
}

export default CustomerOffersSwiper;

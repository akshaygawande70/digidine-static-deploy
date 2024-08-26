import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, FreeMode, Scrollbar } from 'swiper/modules';
import { XMarkIcon } from "@heroicons/react/24/outline";

export function CustomerItemsCategories({ categories, onCategoryClick }) {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleCategoryClick = (categoryId) => {
        onCategoryClick(categoryId);
        handleCloseModal();
    };

    return (
        <>
            <Card className="shadow-none rounded-xl p-0">
                <CardHeader floated={false} className="p-2 mx-0 shadow-none flex justify-between items-center">
                    <Typography variant="h6" color="black">Categories</Typography>
                    <Typography
                        className="text-xs text-gray-500 cursor-pointer"
                        onClick={handleOpenModal}
                    >
                        View All
                    </Typography>
                </CardHeader>
                <CardBody className="p-0">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        freeMode={true}
                        scrollbar={true}
                        modules={[FreeMode, Pagination, Scrollbar]}
                        className="mySwiper"
                    >
                        {categories.map((category) => (
                            <SwiperSlide
                                key={category.id}
                                className="flex flex-col items-center text-center cursor-pointer"
                                onClick={() => onCategoryClick(category.id)}
                            >
                                <div
                                    className="rounded-xl p-4"
                                    style={{ width: '60px', height: '60px', backgroundColor: category.bgColor }}
                                >
                                    <i className={`${category.icon} text-2xl`} style={{ color: category.color }} />
                                </div>
                                <Typography className="text-xs text-black mt-2">{category.category}</Typography>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardBody>
            </Card>

            {/* Modal for View All */}
            <Dialog
                open={openModal}
                handler={handleCloseModal}
                size="lg"
            >
                <DialogHeader>
                    <Typography variant="h5" color="black">All Categories</Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={handleCloseModal}
                        className="ml-auto"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="grid grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center text-center cursor-pointer"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div
                                className="rounded-xl p-4"
                                style={{ width: '80px', height: '80px', backgroundColor: category.bgColor }}
                            >
                                <i className={`${category.icon} text-3xl`} style={{ color: category.color }} />
                            </div>
                            <Typography className="text-sm text-black mt-2">{category.category}</Typography>
                        </div>
                    ))}
                </DialogBody>
            </Dialog>
        </>
    );
}

export default CustomerItemsCategories;

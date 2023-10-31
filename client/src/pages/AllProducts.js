import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import ProductCardSkeleton from "../components/cards/ProductCardSkeleton";
import ProductCard from "../components/cards/ProductCard";
import { reactIcons } from "../utils/icons";
import { Listbox, Transition } from "@headlessui/react";
import { sortBy } from "../utils/constants";
import TextInput from "../components/forms/TextInput";

const AllProducts = () => {
    const [categories, setCategories] = useState([]);
    const [priceFilter, setPriceFilter] = useState({
        min:'',
        max:''
    });
    const [products, setProducts] = useState([]);
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const [selectedSort, setSelectedSort] = useState(sortBy[0]);
    const getAllCategories = async () => {
        try {
            const res = await getCategories();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setCategories(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    const getAllProducts = async () => {
        try {
            const res = await getProducts();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setProducts(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setSkeletonLoading(false);
        }
    };
    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);
    return (
        <section>
            <div className="container flex gap-8 py-10 items-start">
                <div className="w-80  border-c flex-shrink-0 rounded-md ">
                    <header className="py-4 px-4 border-b border-b-zinc-200 mb-2">
                        <h4 className="heading-4">Filter By</h4>
                    </header>
                    <div className="px-4 mb-4">
                        <header>
                            <h5 className="heading-6 mb-2">Categories</h5>
                            <ul className="space-y-2">
                                {categories.map((item, index) => (
                                    <li key={index} className="font-medium">
                                     <label htmlFor={item._id} className="flex gap-2 items-center">
                                        <input className="accent-amber-500 w-4 h-4" type="checkbox" name="" id={item._id} />
                                           {item.name}
                                     </label>
                                    </li>
                                ))}
                            </ul>
                        </header>
                    </div>
                    <div className="px-4 pb-10">
                        <header>
                            <h5 className="heading-6 mb-2">Price</h5>
                            <div className="flex gap-2">
                                <TextInput value={priceFilter.min} onChange={(e)=>setPriceFilter({...priceFilter,min:e.target.value})} placeholder='Min'/>
                                <TextInput value={priceFilter.max} onChange={(e)=>setPriceFilter({...priceFilter,max:e.target.value})} placeholder='Max'/>
                                
                                
                            </div>
                        </header>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <header className="mb-4 flex justify-between gap-8">
                        <h4 className="heading-3">All Products</h4>
                        <div className="w-[250px]">
                            <Listbox
                                value={selectedSort}
                                onChange={(value) => {
                                    setSelectedSort(value);
                                }}
                            >
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 h-10 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">
                                            {selectedSort.name ||
                                                "Select a category"}
                                        </span>
                                        <span className="pointer-events-none absolute text-gray-400 text-20 inset-y-0 right-0 flex items-center pr-2">
                                            {reactIcons.arrowDown}
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={React.Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 z-[100] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {sortBy?.map((sort, index) => (
                                                <Listbox.Option
                                                    key={index}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? "bg-amber-100 text-amber-900"
                                                                : "text-gray-900"
                                                        }`
                                                    }
                                                    value={sort}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${
                                                                    selected
                                                                        ? "font-medium"
                                                                        : "font-normal"
                                                                }`}
                                                            >
                                                                {sort.name}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                    {
                                                                        reactIcons.check
                                                                    }
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                    </header>
                    <div className="grid grid-cols-3 gap-4">
                        {skeletonLoading
                            ? Array(12)
                                  .fill(2)
                                  .map((_item, index) => (
                                      <ProductCardSkeleton key={index} />
                                  ))
                            : products.map((product) => (
                                  <ProductCard product={product} />
                              ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllProducts;

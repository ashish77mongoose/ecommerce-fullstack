import React from "react";

const Dashboard = () => {
    return (
        <div>
            <header className="mb-4 flex items-center justify-between">
                <h3 className="heading-3">Dashboard </h3>
            
            </header>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h5 className="heading-4">Total Products</h5>
                    <p className="font-semibold text-4xl text-gray-600">5</p>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h5 className="heading-4">Total Categories</h5>
                    <p className="font-semibold text-4xl text-gray-600">5</p>
                </div>
                <div className="bg-white rounded-md p-6 shadow-sm">
                    <h5 className="heading-4">Total Subcategories</h5>
                    <p className="font-semibold text-4xl text-gray-600">5</p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

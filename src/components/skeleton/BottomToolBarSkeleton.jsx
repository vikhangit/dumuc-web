import React from 'react';

const BottomToolBarSkeleton = () => {
    return (
        <div className="tabbarBottom fixed bottom-0 w-full z-50 h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg mx-auto grid-cols-5 font-medium">
                <div className="flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                </div>
            </div>
        </div>
    );
}

export default BottomToolBarSkeleton;

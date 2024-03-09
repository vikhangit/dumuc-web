import React from 'react';

const HeaderSkeleton = () => {
    return (
        <div class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div className="w-1/2 flex gap-x-6">
                    <div className="hidden md:block w-1/2 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                        
                    </div>
                    <div className="w-full md:w-1/2 flex gap-x-2">
                        <div className="md:hidden block w-1/4 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                          
                        </div>
                        <div className="w-1/4 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            
                        </div>
                        <div className="w-1/4 h-3 bg-gray-200 rounded-full dark:bg-gray-700 ">
                            
                        </div>
                        <div className="w-1/4 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderSkeleton;

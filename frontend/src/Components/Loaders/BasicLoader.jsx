import React from "react";

const BasicLoader = () => {
    return (
        <section className="absolute top-0 min-h-screen w-full flex justify-center items-center bg-black/55 backdrop-blur-xs z-[9999]" >
            <div className="flex items-center justify-center bg-white rounded-lg h-full p-8">
                <div className="w-12 h-12 border-8 border-accentDark border-t-textDark rounded-full animate-spin"></div>
            </div>
        </section>
    );
};

export default BasicLoader;

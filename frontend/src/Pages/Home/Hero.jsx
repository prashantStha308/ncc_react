import React from 'react'

const Hero = () => {
    return (
        <>
            <section id="hero" className="bg-bgLight w-full flex-1 px-8 lg:px-16 py-12">
                <div className="h-full flex items-center justify-between max-w-6xl mx-auto">
                    {/* Left side - Text content */}
                    <div className="flex-1 pr-12">
                        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-textDark leading-tight">
                            <span className="text-accentDark">Aligner</span>, 
                            <span className="block mt-2">your one stop to</span>
                            <span className="block text-accentDark">track your day</span>
                        </h1>
                        <p className="text-textDark opacity-80 text-base lg:text-lg mt-6 max-w-lg leading-relaxed">
                            Stay organized, productive, and on top of your daily goals with our intuitive tracking system.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="bg-accentDark text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm lg:text-base cursor-pointer">
                                Get Started
                            </button>
                            <button className="border-2 border-accentDark text-accentDark px-8 py-3 rounded-lg font-semibold hover:bg-accentDark hover:text-white transition-all text-sm lg:text-base cursor-pointer">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right side - Illustration */}
                    <div className="flex-1 max-w-sm">
                        <div className="bg-gradient-to-br from-accentLight to-accentDark bg-opacity-20 rounded-2xl p-12 aspect-square flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-accentDark to-accentLight rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-12 h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
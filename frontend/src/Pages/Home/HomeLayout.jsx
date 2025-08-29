import Hero from "./Hero"

const HomeLayout = () => {
  return (
    <section id="home" className="flex flex-col gap-4 w-full min-h-screen">
      <section id="hero" className="bg-bgLight w-full flex-1 ">
        <Hero />
      </section>
    </section>
  )
}

export default HomeLayout
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-wrap bg-customprimarylight dark:bg-customprimarydark">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Explore <span className="text-red-600">Formula 1</span> Races
                Through History
              </h1>
              <div className="w-20 h-2 bg-red-700 my-4"></div>
              <p className="text-xl mb-10">
                Dive into the complete archive of F1 Grand Prix races — from the
                very first lap in 1950 to the latest epic battles on the track.
                Search by year, circuit, driver, or team and relive motorsport’s
                most legendary moments.
              </p>
              <button className="bg-red-500 cursor-pointer text-white text-2xl font-medium px-4 py-2 rounded shadow hover:bg-red-600 transition">
                <a href="/races">Browse All Races</a>
              </button>
            </div>
          </header>
        </div>
      </div>
      <div className="w-full h-48 object-cover sm:h-screen sm:w-4/12 content-center">
        <Image
          src={"/images/f1-logo.png"}
          width={1000}
          height={1000}
          alt={""}
        />
      </div>
    </div>
  );
}

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Url from "./Url";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow bg-gray-900 py-24 flex items-center justify-center">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-6">
            Enhance Engagement with Every Click
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">
            Transform long URLs into memorable short links, create custom QR
            codes, and design dynamic landing pages—all in one platform. Track,
            edit, and optimize your connections for better audience interaction
            and meaningful results.
          </p>
          <Url />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

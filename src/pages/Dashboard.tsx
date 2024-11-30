import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CreateLink from "@/components/CreateLink";
import ListCard from "./utils/ListCard";
import { useState } from "react";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh((prev) => !prev);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow bg-gray-900 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">My Links</h1>
              <CreateLink onSuccess={handleRefresh} />
            </div>
            <ListCard refresh={refresh} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

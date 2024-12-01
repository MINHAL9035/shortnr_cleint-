import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Url = () => {
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <>
      <form className="bg-white rounded-lg shadow-lg p-10 text-left">
        <h3 className="text-2xl font-bold mb-4">Shorten a long link</h3>
        <div className="mb-6">
          <label
            htmlFor="long-link"
            className="block font-medium mb-2 text-gray-700"
          >
            Paste your long link here
          </label>
          <input
            type="text"
            id="long-link"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            placeholder="https://example.com/my-long-url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll need a valid URL, like 'super-long-link.com/shorten-it'
          </p>
        </div>
        <button
          type="submit"
          onSubmit={handleSubmit}
          className={` hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md ${
            !link ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900"
          }`}
          disabled={!link}
        >
          Get your link for free
        </button>
      </form>
    </>
  );
};

export default Url;

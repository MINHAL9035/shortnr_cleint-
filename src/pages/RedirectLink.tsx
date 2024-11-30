import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import handleError from "@/helpers/errorHandler";
import { orgUrl } from "@/service/api/link";

const RedirectLink: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        if (!id) {
          setError("No identifier provided");
          setIsLoading(false);
          return;
        }
        const response = await orgUrl(id);
        if (response?.data) {
          window.location.href = response.data as unknown as string;
        } else {
          setError("No URL found for this identifier");
          setIsLoading(false);
        }
      } catch (error) {
        handleError(error);
        setError("Failed to fetch URL");
        setIsLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return null;
};

export default RedirectLink;

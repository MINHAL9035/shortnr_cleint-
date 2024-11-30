import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { QrCode, Trash, Copy, LinkIcon, Link as LinkIcon2 } from "lucide-react";
import handleError from "@/helpers/errorHandler";
import { message, Modal } from "antd";
import { getLinks } from "@/service/api/link";
import { LinkInterface } from "@/interface/link.interface";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Api from "@/config/axiosConfig";

interface ListCardProps {
  refresh?: boolean;
}

const ListCard = ({ refresh = false }: ListCardProps) => {
  const [links, setLinks] = useState<LinkInterface[]>([]);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);
  const limit = 5;
  const frontend_Url = import.meta.env.VITE_FRONTEND_URL;

  const fetchLinks = async (page: number) => {
    try {
      const response = await getLinks({ page, limit });
      console.log(response.data);

      if (response.status === 200 && response.data) {
        const { links, total } = response.data;
        setLinks(links);
        setTotalPages(Math.ceil(total / limit));
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        message.success("Link copied to clipboard");
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleOpenOriginalLink = (originalLink: string) => {
    window.open(originalLink, "_blank");
  };

  useEffect(() => {
    fetchLinks(currentPage);
  }, [currentPage, refresh]);

  const handleOpenQrCode = (qrCode: string) => {
    setSelectedQrCode(qrCode);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteClick = (linkId: string) => {
    setDeletingLinkId(linkId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingLinkId) return;
    try {
      const response = await Api.delete(`/user/${deletingLinkId}`);
      if (response.status === 200) {
        message.success("Link deleted successfully");
        fetchLinks(currentPage);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setDeleteModalVisible(false);
      setDeletingLinkId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeletingLinkId(null);
  };

  if (links.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <LinkIcon2 className="w-16 h-16 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Links Found
            </h3>
            <p className="text-gray-400 text-center mb-6">
              You haven't created any shortened links yet. Create your first
              link to get started!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {links.map((url) => (
          <Card
            key={url._id}
            className="bg-gray-900 border-gray-800 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5 text-blue-400" />
                  <span
                    className="text-sm cursor-pointer hover:underline"
                    onClick={() => handleOpenOriginalLink(url.originalLink)}
                  >
                    {frontend_Url && `${frontend_Url}/${url.shortenedLink}`}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopyLink(`${frontend_Url}/${url.shortenedLink}`)
                    }
                    className="text-blue-400 border-blue-400 hover:bg-blue-900/20 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenQrCode(url.qrCode)}
                    className="text-green-400 border-green-400 hover:bg-green-900/20 flex items-center"
                  >
                    <QrCode className="w-4 h-4 mr-1" />
                    QR
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-900/20 flex items-center"
                    onClick={() => handleDeleteClick(url._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-gray-300">
                <div>
                  <p className="text-xs text-gray-500">Original URL</p>
                  <p className="truncate text-sm" title={url.originalLink}>
                    {url.originalLink}
                  </p>
                </div>
                <div className="ml-32">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {selectedQrCode && (
          <Dialog
            open={!!selectedQrCode}
            onOpenChange={() => setSelectedQrCode(null)}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={selectedQrCode}
                  alt="QR Code"
                  className="max-w-full h-auto max-h-64 object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="text-white"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className="text-white"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          className: "bg-red-500",
        }}
      >
        <p>
          Are you sure you want to delete this link? This action cannot be
          undone.
        </p>
      </Modal>
      ;
    </>
  );
};

export default ListCard;

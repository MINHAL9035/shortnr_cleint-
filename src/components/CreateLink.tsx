import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { createLinkSchema } from "@/validations/authFormValidation";
import { createLinkInterface } from "@/interface/createLink.interface";
import handleError from "@/helpers/errorHandler";
import { useNavigate } from "react-router-dom";
import { createLink } from "@/service/api/link";

interface CreateLinkProps {
  onSuccess?: () => void;
}

const CreateLink = ({ onSuccess }: CreateLinkProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: createLinkInterface) => {
    const submitData = {
      title: values.title,
      longUrl: values.longUrl,
      customUrl: values.customUrl || undefined,
      qrCode: qrCodeDataUrl,
    };
    console.log(submitData);

    try {
      const response = await createLink(submitData);
      if (response.status === 201) {
        setIsOpen(false);
        formik.resetForm();
        onSuccess?.();
        navigate("/dashboard");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      longUrl: "",
      customUrl: "",
    },
    validationSchema: createLinkSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formik.values.longUrl) {
      const svgString = new XMLSerializer().serializeToString(
        document.querySelector("#qr-code-svg") as Element
      );
      const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
      setQrCodeDataUrl(dataUrl);
    } else {
      setQrCodeDataUrl(null);
    }
  }, [formik.values.longUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-black">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-white">
            Create New
          </DialogTitle>
          <DialogDescription>
            <span className="text-gray-400">
              Provide the details to create a new short link.
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* QR Code Preview */}
          {formik.values.longUrl && (
            <div className="flex justify-center">
              <QRCodeSVG
                id="qr-code-svg"
                value={formik.values.longUrl}
                size={128}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
              />
            </div>
          )}
          <div>
            <Input
              id="title"
              name="title"
              className={`text-white placeholder-gray-400 focus:placeholder-white focus:ring-2 focus:ring-white ${
                formik.errors.title && formik.touched.title
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="h-5">
              {formik.errors.title && formik.touched.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              )}
            </div>
          </div>
          <div>
            <Input
              id="longUrl"
              name="longUrl"
              className={`text-white placeholder-gray-400 focus:placeholder-white focus:ring-2 focus:ring-white ${
                formik.errors.longUrl && formik.touched.longUrl
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your Loooong URL"
              value={formik.values.longUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="h-5">
              {formik.errors.longUrl && formik.touched.longUrl && (
                <p className="text-red-500 text-sm">{formik.errors.longUrl}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Card className="p-2 bg-gray-700 text-white">shortner</Card>
              <p className="text-white">/</p>
              <Input
                id="customUrl"
                name="customUrl"
                className={`text-white placeholder-gray-400 focus:placeholder-white focus:ring-2 focus:ring-white ${
                  formik.errors.customUrl && formik.touched.customUrl
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Custom Link (optional)"
                value={formik.values.customUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="h-5">
              {formik.errors.customUrl && formik.touched.customUrl && (
                <p className="text-red-500 text-sm">
                  {formik.errors.customUrl}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              variant="destructive"
              disabled={!formik.values.longUrl}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;

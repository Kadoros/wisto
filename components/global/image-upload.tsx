// components/global/image-upload.tsx
"use client";

import { EndpointType, ImageUploadProp, UploadedFile } from "@/types";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { ClientUploadedFileData } from "uploadthing/types";

export const ImageUpload = ({ onChange, value, endpoint }: ImageUploadProp) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
      <div className="relative inline-block">
        <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
          <AvatarImage
            src={value || "https://github.com/shadcn.png"}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
          <AvatarFallback className="text-3xl">CN</AvatarFallback>
        </Avatar>

        <DialogTrigger asChild>
          <Button
            variant="primary"
            className="rounded-full absolute bottom-0 right-0 h-10 w-10 p-0"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-2xl text-center font-bold">
          Upload Avatar
        </DialogTitle>
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <UploadDropzone
            className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                onChange(res[0].url);
                setIsUploadDialogOpen(false);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <DialogClose asChild>
            <Button variant="secondary" className="mt-4">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

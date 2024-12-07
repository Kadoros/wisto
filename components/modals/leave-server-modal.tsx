"use client";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import { useState } from "react";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type == "leaveServer";

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/server/${server?.id}/leave`);
      onClose();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-md  text-zinc-500 dark:text-zinc-400">
            Are you sure you want to leave?
            <span className="font-semibold text-indigo-500">
              {" "}
              {server?.name}
            </span>{" "}
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 dark:bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between w-full ">
            <Button variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

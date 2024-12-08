"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components//ui/form";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/global/image-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "invite";

  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/server/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
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
            Invite Friend
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
            Server invite link
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 dark:bg-zinc-700/50 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button
                disabled={isLoading}
                onClick={onCopy}
                size="icon"
                className="bg-zinc-300/50 dark:bg-zinc-700/50 text-black dark:text-white hover:bg-zinc-400 hover:dark:bg-zinc-600"
              >
                {copied ? <Check /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant={"link"}
              size={"sm"}
              className="text-xs text-zinc-500 dark:text-zinc-400 mt-2"
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 mr-2" />
            </Button>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

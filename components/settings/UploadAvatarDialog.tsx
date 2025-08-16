"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUploadAvatarMutation } from "@/services/userService";
import { toast } from "@/components/ui/use-toast";

interface UploadAvatarDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: number;
    onSuccess?: () => void; // Callback khi upload thành công
}

export default function UploadAvatarDialog({
    open,
    onOpenChange,
    userId,
    onSuccess
}: UploadAvatarDialogProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        try {
            await uploadAvatar({ userId, file: selectedFile }).unwrap();
            toast({
                title: "Success 🎉",
                description: "Your avatar has been updated successfully."
            });
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Upload failed ❌",
                description: "Something went wrong while updating your avatar."
            });
            console.error("Upload failed:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Avatar</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4">
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            width={150}
                            height={150}
                            className="rounded-full border-2 border-black object-cover"
                        />
                    ) : (
                        <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-gray-400 rounded-full text-gray-500">
                            No image
                        </div>
                    )}

                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!selectedFile || isLoading}>
                        {isLoading ? "Uploading..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

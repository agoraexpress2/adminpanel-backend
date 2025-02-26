import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddStampDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    serialNumber: string;
    description: string;
    image: string;
    totalStamps: number;
  }) => void;
}

export function AddStampDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddStampDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=stamp",
    totalStamps: 10,
  });

  const [serialNumber] = useState(() =>
    Math.random().toString().substring(2, 9),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      serialNumber,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Stamp Card</DialogTitle>
          <DialogDescription>
            Create a new stamp card with a unique serial number.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="serialNumber">
                Serial Number (Auto-generated)
              </Label>
              <Input
                id="serialNumber"
                value={serialNumber}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Card Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter card name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter short description"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalStamps">Total Stamps Required</Label>
              <Input
                id="totalStamps"
                type="number"
                min="1"
                value={formData.totalStamps}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalStamps: parseInt(e.target.value),
                  })
                }
                placeholder="Number of stamps required"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Card Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

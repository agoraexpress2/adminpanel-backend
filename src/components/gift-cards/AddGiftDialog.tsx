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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddGiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    serialNumber: string;
    description: string;
    usageLimit: number;
    validityDays: number;
  }) => void;
}

export function AddGiftDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddGiftDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    usageLimit: 1,
    validityDays: 30,
  });

  const [serialNumber] = useState(() =>
    Math.random().toString().substring(2, 7),
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
          <DialogTitle>Add New Gift</DialogTitle>
          <DialogDescription>
            Create a new gift with a unique serial number.
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
              <Label htmlFor="name">Gift Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter gift name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter gift description"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min={1}
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usageLimit: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validityDays">Validity (days)</Label>
                <Input
                  id="validityDays"
                  type="number"
                  min={1}
                  value={formData.validityDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      validityDays: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Gift</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

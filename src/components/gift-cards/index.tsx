import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Plus, Search, Check } from "lucide-react";
import { AddGiftDialog } from "./AddGiftDialog";

interface GiftCard {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  type: string;
  expiryDate: string;
  status: "claimed" | "unclaimed" | "used";
  claimedBy?: {
    name: string;
    phone: string;
    claimDate: string;
  };
  createdAt: string;
}

export default function GiftCards() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"unclaimed" | "claimed">(
    "unclaimed",
  );

  const [cards, setCards] = useState<GiftCard[]>([
    {
      id: "1",
      name: "Free Coffee",
      serialNumber: "12345",
      description: "One free coffee of any size",
      type: "Beverage",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "unclaimed",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Discount Card",
      serialNumber: "67890",
      description: "20% off on any purchase",
      type: "Discount",
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: "claimed",
      claimedBy: {
        name: "Mohammed Hassan",
        phone: "+966 50 123 4567",
        claimDate: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Birthday Special",
      serialNumber: "24680",
      description: "Free birthday cake slice",
      type: "Special",
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: "unclaimed",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Lunch Deal",
      serialNumber: "13579",
      description: "50% off lunch menu",
      type: "Meal",
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: "claimed",
      claimedBy: {
        name: "Fatima Omar",
        phone: "+966 55 987 6543",
        claimDate: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleAddGift = (data: {
    name: string;
    serialNumber: string;
    description: string;
    usageLimit: number;
    validityDays: number;
  }) => {
    const newGift: GiftCard = {
      id: Math.random().toString(),
      name: data.name,
      serialNumber: data.serialNumber,
      description: data.description,
      type: "Standard",
      expiryDate: new Date(
        Date.now() + data.validityDays * 24 * 60 * 60 * 1000,
      ).toISOString(),
      status: "unclaimed",
      createdAt: new Date().toISOString(),
    };
    setCards([...cards, newGift]);
  };

  const handleUseGift = (cardId: string) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            status: "used" as const,
          };
        }
        return card;
      }),
    );
    alert(`Gift card has been marked as used`);
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      activeTab === "claimed"
        ? card.claimedBy?.phone.includes(searchTerm) ||
          card.serialNumber.includes(searchTerm)
        : card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.serialNumber.includes(searchTerm) ||
          card.type.toLowerCase().includes(searchTerm.toLowerCase());
    return card.status === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gift Cards</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          <Gift className="h-4 w-4 mr-2" />
          Add Gift
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
      >
        <TabsList>
          <TabsTrigger value="unclaimed">Unclaimed Gifts</TabsTrigger>
          <TabsTrigger value="claimed">Claimed Gifts</TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                activeTab === "unclaimed"
                  ? "Search by name, serial number, or type..."
                  : "Search by phone or serial number..."
              }
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <TabsContent value="unclaimed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">
                    {card.name}
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">#{card.serialNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Type: {card.type}</span>
                      <span>
                        Expires:{" "}
                        {new Date(card.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="claimed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">
                    {card.name}
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">#{card.serialNumber}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {card.claimedBy?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {card.claimedBy?.phone}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Claimed:{" "}
                        {new Date(
                          card.claimedBy?.claimDate || "",
                        ).toLocaleDateString()}
                      </span>
                      {card.status !== "used" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUseGift(card.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Use
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddGiftDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddGift}
      />
    </div>
  );
}

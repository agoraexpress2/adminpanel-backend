import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Plus, Search, Stamp, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddStampDialog } from "./AddStampDialog";

interface StampCard {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  totalStamps: number;
  currentStamps: number;
  activatedBy?: {
    name: string;
    phone: string;
    activationDate: string;
  };
  createdAt: string;
}

export default function StampCards() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"inactive" | "active">("inactive");
  const [cardToDelete, setCardToDelete] = useState<StampCard | null>(null);

  const [cards, setCards] = useState<StampCard[]>([
    {
      id: "1",
      name: "Coffee Loyalty Card",
      serialNumber: "1234567",
      description: "Buy 9 coffees, get 1 free",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=coffee",
      status: "inactive",
      totalStamps: 10,
      currentStamps: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Breakfast Club Card",
      serialNumber: "7654321",
      description: "Collect stamps for free breakfast",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=breakfast",
      status: "active",
      totalStamps: 8,
      currentStamps: 3,
      activatedBy: {
        name: "Mohammed Hassan",
        phone: "+966 50 123 4567",
        activationDate: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Lunch Special Card",
      serialNumber: "9876543",
      description: "Earn free lunch after 10 stamps",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=lunch",
      status: "inactive",
      totalStamps: 10,
      currentStamps: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Tea Time Card",
      serialNumber: "5432109",
      description: "Collect stamps for premium tea",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=tea",
      status: "active",
      totalStamps: 6,
      currentStamps: 4,
      activatedBy: {
        name: "Fatima Omar",
        phone: "+966 55 987 6543",
        activationDate: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleAddCard = (data: {
    name: string;
    serialNumber: string;
    description: string;
    image: string;
    totalStamps: number;
  }) => {
    const newCard: StampCard = {
      id: Math.random().toString(),
      ...data,
      status: "inactive",
      currentStamps: 0,
      createdAt: new Date().toISOString(),
    };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (card: StampCard) => {
    setCards(cards.filter((c) => c.id !== card.id));
    setCardToDelete(null);
  };

  const handleAddStamp = (cardId: string) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId && card.currentStamps < card.totalStamps) {
          return {
            ...card,
            currentStamps: card.currentStamps + 1,
          };
        }
        return card;
      }),
    );
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      activeTab === "active"
        ? card.activatedBy?.phone.includes(searchTerm) ||
          card.serialNumber.includes(searchTerm)
        : card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.serialNumber.includes(searchTerm);
    return card.status === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Stamp Cards</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          <CreditCard className="h-4 w-4 mr-2" />
          New Stamp Card
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
      >
        <TabsList>
          <TabsTrigger value="inactive">Inactive Cards</TabsTrigger>
          <TabsTrigger value="active">Active Cards</TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                activeTab === "inactive"
                  ? "Search by name or serial number..."
                  : "Search by phone or serial number..."
              }
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <TabsContent value="inactive" className="mt-4">
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
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">#{card.serialNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                    <div className="mt-2">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-32 object-cover rounded-md bg-muted"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        Required Stamps: {card.totalStamps}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setCardToDelete(card)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
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
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">#{card.serialNumber}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {card.activatedBy?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {card.activatedBy?.phone}
                      </p>
                    </div>
                    <div className="mt-2">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-32 object-cover rounded-md bg-muted"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground">
                          Activated:{" "}
                          {new Date(
                            card.activatedBy?.activationDate || "",
                          ).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: card.totalStamps }).map(
                              (_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < card.currentStamps ? "text-yellow-500" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ),
                            )}
                          </div>
                          {card.currentStamps < card.totalStamps && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-2"
                              onClick={() => handleAddStamp(card.id)}
                            >
                              <Stamp className="h-4 w-4 mr-1" />
                              Add Stamp
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setCardToDelete(card)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AddStampDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddCard}
      />

      <AlertDialog
        open={!!cardToDelete}
        onOpenChange={() => setCardToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stamp Card</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this stamp card? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cardToDelete && handleDeleteCard(cardToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { useState, useEffect } from "react";
import { getCustomers, toggleCustomerStatus } from "@/api/customers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Gift,
  Plus,
  Search,
  User,
  Pencil,
  Ban,
} from "lucide-react";
import { AddCustomerDialog } from "./AddCustomerDialog";
import { EditCustomerDialog } from "./EditCustomerDialog";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await getCustomers();
        setCustomers(data);
        setError("");
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Please try again.");
        // Fallback data for demo if API fails
        setCustomers([
          {
            id: 1,
            name: "Ahmed Ali",
            phone: "+966 50 123 4567",
            email: "ahmed@example.com",
            pin: "1234",
            branch: "Main Branch",
            stampCards: 2,
            giftCards: 1,
            joinDate: "2024-01-15",
            isActive: true,
          },
          {
            id: 2,
            name: "Sara Ahmed",
            phone: "+966 55 234 5678",
            email: "sara@example.com",
            pin: "5678",
            branch: "Downtown Branch",
            stampCards: 1,
            giftCards: 2,
            joinDate: "2024-02-20",
            isActive: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Cards</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Loading customers...
                    </TableCell>
                  </TableRow>
                ) : customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  customers
                    .filter((customer) => customer.phone.includes(searchQuery))
                    .map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="cursor-pointer hover:bg-accent/50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <User className="h-6 w-6 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <CreditCard className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">
                                {customer.stampCards}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Gift className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">
                                {customer.giftCards}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              try {
                                const newStatus = !customer.isActive;
                                await toggleCustomerStatus(
                                  customer.id,
                                  newStatus,
                                );

                                const updatedCustomer = {
                                  ...customer,
                                  isActive: newStatus,
                                };

                                setCustomers(
                                  customers.map((c) =>
                                    c.id === updatedCustomer.id
                                      ? updatedCustomer
                                      : c,
                                  ),
                                );

                                alert(
                                  `Customer account ${newStatus ? "activated" : "deactivated"} successfully`,
                                );
                              } catch (err) {
                                console.error(
                                  "Error toggling customer status:",
                                  err,
                                );
                                alert(
                                  "Failed to update customer status. Please try again.",
                                );
                              }
                            }}
                          >
                            <Ban
                              className={`h-4 w-4 ${!customer.isActive ? "text-red-500" : ""}`}
                              title={
                                customer.isActive
                                  ? "Deactivate Account"
                                  : "Activate Account"
                              }
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditCustomerDialog
        customer={selectedCustomer}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={(updatedCustomer) => {
          setCustomers(
            customers.map((c) =>
              c.id === updatedCustomer.id ? updatedCustomer : c,
            ),
          );
        }}
      />

      <AddCustomerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={(data) => {
          const newCustomer = {
            id: customers.length + 1,
            name: "", // Will be set when customer provides it
            ...data,
            isActive: true,
            stampCards: 0,
            giftCards: 0,
          };
          setCustomers([...customers, newCustomer]);
        }}
      />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="stamps">Stamp Cards</TabsTrigger>
          <TabsTrigger value="gifts">Gift Cards</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="firebase">Firebase</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Your business name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Business phone number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Business email" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stamps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stamp Card Settings</CardTitle>
              <CardDescription>
                Configure your stamp card program settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stampsRequired">Stamps Required</Label>
                  <Input
                    id="stampsRequired"
                    type="number"
                    placeholder="Number of stamps needed for reward"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="expiry" />
                  <Label htmlFor="expiry">Enable stamp card expiry</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gifts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gift Card Settings</CardTitle>
              <CardDescription>
                Configure your gift card program settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minAmount">Minimum Amount</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="Minimum gift card amount"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxAmount">Maximum Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="Maximum gift card amount"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="digital" />
                  <Label htmlFor="digital">Enable digital gift cards</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="emailNotifs" />
                  <Label htmlFor="emailNotifs">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="smsNotifs" />
                  <Label htmlFor="smsNotifs">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="lowBalance" />
                  <Label htmlFor="lowBalance">Low balance alerts</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firebase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firebase Configuration</CardTitle>
              <CardDescription>
                Configure Firebase for push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Firebase API Key"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectId">Project ID</Label>
                  <Input id="projectId" placeholder="Firebase Project ID" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                  <Input
                    id="messagingSenderId"
                    placeholder="Firebase Messaging Sender ID"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="appId">App ID</Label>
                  <Input id="appId" placeholder="Firebase App ID" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enablePush" />
                  <Label htmlFor="enablePush">Enable Push Notifications</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Pages</CardTitle>
              <CardDescription>
                Manage your website's policy pages and legal content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                  <textarea
                    id="privacyPolicy"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your privacy policy content..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="termsOfService">Terms of Service</Label>
                  <textarea
                    id="termsOfService"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your terms of service content..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="serviceDefinition">Service Definition</Label>
                  <textarea
                    id="serviceDefinition"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Define your services..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faq">FAQ</Label>
                  <textarea
                    id="faq"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter frequently asked questions and answers..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

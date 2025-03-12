import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { serverProfileData } from "./page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fetchProvinces, ProvinceResponse } from "@/API";
import { Textarea } from "@/components/ui/textarea";

export const AddressCard = ({
  profileData,
}: {
  profileData: serverProfileData;
}) => {
  const [provinces, setProvinces] = useState<ProvinceResponse[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces:", error);
        setError("خطا در بارگذاری استان‌ها");
      }
    };
    
    loadProvinces();
  }, []);

  const handleSaveAddress = () => {
    setLoading(true);
    setError(null);
    
    // This will be implemented when the API is available
    setTimeout(() => {
      setLoading(false);
      // Simulate success
      // setError("خطا در ذخیره آدرس"); // Uncomment to test error state
    }, 1000);
  };

  return (
    <Card className="w-full overflow-hidden border-border bg-card text-card-foreground" dir="rtl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full text-primary">
            <MapPin size={20} />
          </div>
          <CardTitle className="text-lg">آدرس</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="province">استان</Label>
              <Select 
                value={selectedProvince} 
                onValueChange={setSelectedProvince}
                dir="rtl"
              >
                <SelectTrigger id="province" className="w-full">
                  <SelectValue placeholder="انتخاب استان" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem 
                      key={province.id} 
                      value={province.id.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="postalCode">کد پستی</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="کد پستی خود را وارد کنید"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">آدرس دقیق</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس دقیق خود را وارد کنید"
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleSaveAddress}
            disabled={!selectedProvince || !address || loading}
            variant="default"
            className={cn(
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? "در حال ذخیره..." : "ذخیره آدرس"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 
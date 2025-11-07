import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface MigrationStatus {
  productId: string;
  productName: string;
  oldUrl: string;
  newUrl?: string;
  status: "pending" | "success" | "error" | "skipped";
  error?: string;
}

const MigrateImages = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<MigrationStatus[]>([]);
  const { toast } = useToast();

  const migrateImages = async () => {
    setMigrating(true);
    setStatuses([]);

    try {
      // Fetch all products with local images
      const { data: products, error: fetchError } = await supabase
        .from("products")
        .select("id, name, image_url")
        .like("image_url", "/products/%");

      if (fetchError) throw fetchError;
      if (!products || products.length === 0) {
        toast({
          title: "No images to migrate",
          description: "All images are already using external URLs",
        });
        setMigrating(false);
        return;
      }

      const total = products.length;
      const newStatuses: MigrationStatus[] = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const status: MigrationStatus = {
          productId: product.id,
          productName: product.name,
          oldUrl: product.image_url,
          status: "pending",
        };

        try {
          // Extract filename from URL
          const filename = product.image_url.replace("/products/", "");
          
          // Fetch the image from public folder
          const response = await fetch(product.image_url);
          if (!response.ok) throw new Error("Failed to fetch image");
          
          const blob = await response.blob();
          
          // Upload to Supabase storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(filename, blob, {
              contentType: blob.type,
              upsert: true,
            });

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from("product-images")
            .getPublicUrl(filename);

          // Update database
          const { error: updateError } = await supabase
            .from("products")
            .update({ image_url: publicUrl })
            .eq("id", product.id);

          if (updateError) throw updateError;

          status.status = "success";
          status.newUrl = publicUrl;
        } catch (error: any) {
          status.status = "error";
          status.error = error.message;
        }

        newStatuses.push(status);
        setStatuses([...newStatuses]);
        setProgress(((i + 1) / total) * 100);
      }

      const successCount = newStatuses.filter((s) => s.status === "success").length;
      toast({
        title: "Migration complete",
        description: `Successfully migrated ${successCount} out of ${total} images`,
      });
    } catch (error: any) {
      toast({
        title: "Migration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Migrate Product Images to Supabase Storage</CardTitle>
          <CardDescription>
            This will upload all product images from the public folder to Supabase storage
            and update the database URLs. You only need to run this once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={migrateImages}
            disabled={migrating}
            size="lg"
            className="w-full"
          >
            {migrating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Migrating...
              </>
            ) : (
              "Start Migration"
            )}
          </Button>

          {migrating && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(progress)}% complete
              </p>
            </div>
          )}

          {statuses.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {statuses.map((status) => (
                <div
                  key={status.productId}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                >
                  {status.status === "success" && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  {status.status === "error" && (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  {status.status === "pending" && (
                    <Loader2 className="h-5 w-5 animate-spin flex-shrink-0 mt-0.5" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{status.productName}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {status.oldUrl}
                    </p>
                    {status.newUrl && (
                      <p className="text-sm text-green-600 truncate">
                        → {status.newUrl}
                      </p>
                    )}
                    {status.error && (
                      <p className="text-sm text-destructive">{status.error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrateImages;

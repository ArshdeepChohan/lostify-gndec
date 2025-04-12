
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Upload, Search, AlertCircle } from "lucide-react";

const ImageSearch = () => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = () => {
    if (!imagePreview) return;
    
    setIsSearching(true);
    
    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      // Here you would typically handle search results
    }, 2000);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gndec-blue">Image Search</h2>
            <p className="text-muted-foreground">
              Upload an image of your lost item and our system will search for similar items across GNDEC campus.
            </p>
          </div>

          <Card className="gndec-card overflow-hidden">
            <CardContent className="p-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-gndec-blue bg-gndec-blue/5' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!imagePreview ? (
                  <div className="py-10">
                    <div className="mb-4 flex justify-center">
                      <Camera className="h-16 w-16 text-gndec-blue opacity-50" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop an image here, or click to select a file
                    </p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button 
                      className="gndec-btn"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload size={16} className="mr-2" />
                      Select Image
                    </Button>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={imagePreview} 
                        alt="Selected item" 
                        className="max-h-64 rounded-md border shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <Button 
                        variant="outline" 
                        className="border-gndec-blue text-gndec-blue hover:bg-gndec-blue/10"
                        onClick={() => setImagePreview(null)}
                      >
                        Choose Different Image
                      </Button>
                      <Button 
                        className="gndec-btn"
                        onClick={handleSearch}
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <>Searching...</>
                        ) : (
                          <>
                            <Search size={16} className="mr-2" />
                            Search for Similar Items
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 bg-gndec-blue/5 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gndec-blue mt-0.5" />
                <div>
                  <h4 className="font-medium text-gndec-blue mb-1">How Image Search Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Our system analyzes your uploaded image and searches for visually similar lost and found items reported on GNDEC campus. 
                    For best results, use clear images with good lighting and minimal background clutter.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-gndec-burgundy font-medium mb-3">Don't have an image?</p>
            <Button 
              variant="outline" 
              className="border-gndec-burgundy text-gndec-burgundy hover:bg-gndec-burgundy/10"
            >
              <Search size={16} className="mr-2" />
              Search Items by Description
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSearch;

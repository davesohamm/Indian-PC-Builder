import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getUserBuilds, deleteBuild, SavedBuild } from "@/services/buildService";
import { Trash2, Eye, Grid3X3 } from "lucide-react";
import { TableIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { PCBuild, ComponentCategory } from "@/types/pc-builder";
import { getComponentById } from "@/data/pc-components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SavedBuilds = () => {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    
    const fetchBuilds = async () => {
      try {
        const userBuilds = await getUserBuilds(user.id);
        setBuilds(userBuilds);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your builds",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBuilds();
  }, [user, isAuthenticated, navigate, toast]);

  const handleDeleteBuild = async (buildId: string) => {
    if (!user) return;
    
    try {
      await deleteBuild(buildId, user.id);
      setBuilds(builds.filter(build => build.id !== buildId));
      toast({
        title: "Build deleted",
        description: "Your build has been deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete build",
      });
    }
  };

  const calculateBuildPrice = (build: PCBuild) => {
    return Object.entries(build)
      .reduce((total, [category, componentId]) => {
        if (!componentId) return total;
        const component = getComponentById(category as ComponentCategory, componentId);
        return total + (component?.price || 0);
      }, 0);
  };

  const formatIndianRupees = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleViewBuild = (build: SavedBuild) => {
    localStorage.setItem('viewBuild', JSON.stringify(build));
    navigate(`/`);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const countComponents = (build: PCBuild) => {
    return Object.values(build).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSaveBuild={() => {}}
        onGeneratePDF={() => {}}
      />
      
      <main className="container mx-auto py-8 px-4">
        <Card className="border-muted tech-glow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Your Saved Builds</CardTitle>
              <CardDescription>
                View and manage your saved PC builds
              </CardDescription>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary/20" : ""}
              >
                <Grid3X3 size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setViewMode("table")}
                className={viewMode === "table" ? "bg-primary/20" : ""}
              >
                <TableIcon size={18} />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Loading your builds...</p>
              </div>
            ) : builds.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You don't have any saved builds yet</p>
                <Button onClick={() => navigate('/')}>Create a Build</Button>
              </div>
            ) : (
              <Tabs defaultValue="grid" value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "table")}>
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {builds.map((build) => (
                      <Card key={build.id} className="bg-card border-muted hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col h-full">
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg text-primary">{build.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">
                                Created: {new Date(build.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-sm font-medium">
                                Total: {formatIndianRupees(calculateBuildPrice(build.build))}
                              </p>
                            </div>
                            
                            <div className="flex-1 text-xs text-muted-foreground">
                              <p>{countComponents(build.build)} components selected</p>
                            </div>
                            
                            <div className="mt-4 pt-2 flex justify-between border-t border-border/50">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewBuild(build)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteBuild(build.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="table" className="mt-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Created On</TableHead>
                          <TableHead>Components</TableHead>
                          <TableHead>Total Price</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {builds.map((build) => (
                          <TableRow key={build.id}>
                            <TableCell className="font-medium">{build.name}</TableCell>
                            <TableCell>{new Date(build.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{countComponents(build.build)}</TableCell>
                            <TableCell>{formatIndianRupees(calculateBuildPrice(build.build))}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewBuild(build)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteBuild(build.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SavedBuilds;

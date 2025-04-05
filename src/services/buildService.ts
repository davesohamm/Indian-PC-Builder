
import { PCBuild } from "@/types/pc-builder";

const MONGODB_API_URL = "/api/builds";

export interface SavedBuild {
  id: string;
  name: string;
  userId: string;
  build: PCBuild;
  createdAt: string;
}

export const saveBuild = async (build: PCBuild, name: string, userId: string): Promise<SavedBuild> => {
  // For now, we'll save builds in localStorage until we set up the API
  const builds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
  
  const newBuild = {
    id: `build_${Date.now()}`,
    name,
    userId,
    build,
    createdAt: new Date().toISOString()
  };
  
  builds.push(newBuild);
  localStorage.setItem('savedBuilds', JSON.stringify(builds));
  
  return newBuild;
};

export const getUserBuilds = async (userId: string): Promise<SavedBuild[]> => {
  const builds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
  return builds.filter((build: SavedBuild) => build.userId === userId);
};

export const deleteBuild = async (buildId: string, userId: string): Promise<void> => {
  const builds = JSON.parse(localStorage.getItem('savedBuilds') || '[]');
  const filteredBuilds = builds.filter(
    (build: SavedBuild) => !(build.id === buildId && build.userId === userId)
  );
  localStorage.setItem('savedBuilds', JSON.stringify(filteredBuilds));
};

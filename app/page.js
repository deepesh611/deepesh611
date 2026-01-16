import Rank from "./components/rank";
import GitStats from "./components/stats";
import { userData } from "@/data/user-data";
import Projects from "./components/projects";
import GitLanguage from "./components/language";
import HeroSection from "./components/hero-section";
import Contributions from "./components/contributions";

export const dynamic = "force-dynamic";
export const revalidate = 1;

// Fetch GitHub profile data
async function getGitProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/deepesh611`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch GitHub profile data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub profile data:", error);
    return null; // Return null or a default object to handle errors gracefully
  }
}

// Fetch GitHub projects data - MANUAL SELECTION
async function getGitProjects() {
  try {
    // Define the repositories you want to showcase (in order of appearance)
    const reposToShow = [
      "AetherStore",
      "Abacus-Insights-Hackathon",
      "Video-Summary-Generator",
      "Home-Server",
      "NPi-Cluster",
      "DBMS-with-n8n",
      "Minor-Project-DDoS-on-Cloud",
      "My_Shell"
    ];

    // Fetch each repository individually to maintain order
    const projectPromises = reposToShow.map(repoName =>
      fetch(`https://api.github.com/repos/${userData.githubUser}/${repoName}`, {
        cache: "no-cache",
      }).then(res => res.ok ? res.json() : null)
    );

    const projects = await Promise.all(projectPromises);
    
    // Filter out any failed fetches (null values)
    return projects.filter(project => project !== null);
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return []; // Return an empty array to handle errors gracefully
  }
}

// Main component rendering the home page
export default async function Home() {
  const profile = await getGitProfile();
  const projects = await getGitProjects();

  return (
    <>
      {profile && <HeroSection profile={profile} />}
      <GitStats />
      <Projects projects={projects} profile={profile} />
      <GitLanguage />
      <Rank />
      <Contributions />
    </>
  );
}

// Generate metadata for SEO purposes
export async function generateMetadata({ params, searchParams }, parent) {
  const profile = await getGitProfile();

  return {
    title: profile ? `${profile.name}` : "GitHub Profile",
    description: profile?.description || "Explore the GitHub profile.",
  };
}

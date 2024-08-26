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

// Fetch GitHub projects data
async function getGitProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=user:${userData.githubUser}+fork:true&sort=stars&per_page=10&type=Repositories`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    const data = await res.json();

    // Define the repositories you want to ignore
    const reposToIgnore = ["deepesh611"];

    // Filter out the unwanted repositories
    const filteredRepos = data.items.filter(
      (repo) => !reposToIgnore.includes(repo.name)
    );

    return filteredRepos;
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

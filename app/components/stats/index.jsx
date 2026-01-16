// @flow strict
import { userData } from "@/data/user-data";
import Image from "next/image";
import GlowCard from "../helper/glow-card";
import SectionTitle from "../helper/section-title";

export const dynamic = "force-dynamic";

function GitStats() {
  return (
    <div
      id="stats"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <SectionTitle title="GitHub Statistics" />

      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-5">

        <>
          <GlowCard identifier="github-stats">
            <img src={`https://github-readme-stats-fast.vercel.app/api?username=${userData.githubUser}&theme=algolia&show_icons=true&hide_border=true&count_private=true`}
              width={1080}
              height={520}
              alt="github stats"
            />
          </GlowCard>
          
          <GlowCard identifier="github-stats-2">
            <img
              src={`https://github-readme-stats-fast.vercel.app/api/streak?username=${userData.githubUser}&theme=algolia&show_icons=true`}
              width={1080}
              height={520}
              alt="github stats"
              className="rounded-lg"
            />
          </GlowCard>
        </>

        <div className="md:col-span-2">
          <GlowCard identifier="profile-details">
            <div className="bg-primary-bg">
              <img
                src={`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${userData.githubUser}&theme=algolia&hide`}
                width={1080}
                height={800}
                alt="github profile-details"
                className="rounded-lg "
              />
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}

export default GitStats;


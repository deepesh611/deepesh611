const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dev.to",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github-readme-stats-sooty-phi.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github-readme-streak-stats.herokuapp.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "stardev.io",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "github-profile-summary-cards.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "github-profile-trophy.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "readme-stats-mu-one.vercel.app",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

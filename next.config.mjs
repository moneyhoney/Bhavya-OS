/** @type {import('next').NextConfig} */
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1);
const isProjectPagesBuild = process.env.GITHUB_ACTIONS === "true" && Boolean(repositoryName);
const basePath = isProjectPagesBuild ? `/${repositoryName}` : "";

const nextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true }
};
export default nextConfig;

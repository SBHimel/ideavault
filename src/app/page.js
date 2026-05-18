import Banner from "@/components/Banner";
import Features from "@/components/Features";
import TrendingIdeas from "@/components/TrendingIdeas";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <TrendingIdeas></TrendingIdeas>
    </div>
  );
}

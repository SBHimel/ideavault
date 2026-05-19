import Banner from "@/components/Banner";
import FeaturedIdeas from "@/components/FeaturedIdeas";
import Features from "@/components/Features";
import StatsSection from "@/components/StatsSection";
import TrendingIdeas from "@/components/TrendingIdeas";
import Image from "next/image";

export default async function Home() {
  // ডাটাবেজ থেকে সব আইডিয়া ফেচ করা হচ্ছে
  const res = await fetch("http://localhost:5000/idea", { cache: "no-store" });
  const ideas = await res.json();
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <FeaturedIdeas ideas={ideas} />
      <TrendingIdeas></TrendingIdeas>
      <StatsSection></StatsSection>
    </div>
  );
}

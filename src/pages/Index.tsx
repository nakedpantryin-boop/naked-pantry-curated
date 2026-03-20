import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Categories from "@/components/Categories";
import ValueProposition from "@/components/ValueProposition";
import RecentlyViewed from "@/components/RecentlyViewed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <Categories />
      <ValueProposition />
      <RecentlyViewed />
      <Footer />
    </div>
  );
};

export default Index;

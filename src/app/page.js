import Articles from "@/templates/index/Articles";
import Promote from "@/templates/index/Promote";
import Navbar from "@/modules/navbar/Navbar";
import Banner from "@/templates/index/Banner";
import Categories from "@/templates/index/Categories";
import LatestProducts from "@/templates/index/LatestProducts";
import { roboto } from "@/utils/fonts";
import DownloadApp from "@/templates/index/DownloadApp";
import Footer from "@/modules/footer/Footer";

export default async function Home() {

  return (
    <main className={roboto.className}>
      <Navbar />
      <Banner />
      <Categories />
      <LatestProducts />
      <Promote />
      <Articles />
      <DownloadApp />
      <Footer />
    </main>
  );
}

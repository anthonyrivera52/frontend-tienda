import Card from "../../components/cards/card";
import Shop from "../../components/shop/shop/shop";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        {
          <>
            <>
              <div>
                <Shop />
              </div>
            </>
          </>
        }
      </MainLayout>
    </>
  );
};

export default HomePage;

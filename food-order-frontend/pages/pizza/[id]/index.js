import FoodInfo from "../../../components/food/FoodInfo";
import FoodForm from "../../../components/food/FoodForm";
import FoodImage from "../../../components/food/FoodImage";
import { useRouter } from "next/router";
import { routes } from "../../../routes";
// FoodForm({ title, handle, variants, , mainImg, })
export default function pizza({ pizza }) {
  const router = useRouter();
  console.log(router.query.id);
  const food_id = Number(router.query.id);
  return (
    <>
      <main>
        <div className="bg-white min-h-screen py-12 sm:pt-20">
          <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
            <FoodImage
              src="http://localhost:8000/api/foods/image/food_1.png"
              alt=""
            ></FoodImage>
            <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
              <FoodInfo pizza={pizza} />
              <FoodForm
                title={pizza.food_name}
                id={food_id}
                price={pizza.food_price}
                mainImg="http://localhost:8000/api/foods/image/food_1.png"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { res } = context;
  const request = await fetch( `${routes.FOODS}/${context.params.id}`);
  const pizza = await request.json();
  // Pass data to the page via props
  if ( pizza?.response === 'pizza does not exists')
  {
    res.writeHead(302, { Location: '/404', });
    res.end();
    return {
      props:{}
    }
  }
  return {
    props: {
      pizza,
    },
  };
}

import ContentLoader from "react-content-loader"

export const PizzaPageImgLoader = () => (
    <ContentLoader 
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="124" cy="124" r="124" />
  </ContentLoader>
) 
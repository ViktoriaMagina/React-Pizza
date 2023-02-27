import ContentLoader from "react-content-loader"

const PizzaLoader = () => (
    <ContentLoader 
    className="pizza-loader"
    speed={2}
    width={280}
    height={457}
    viewBox="0 0 280 457"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="133" cy="128" r="124" /> 
    <rect x="0" y="263" rx="13" ry="13" width="280" height="20" /> 
    <rect x="0" y="307" rx="13" ry="13" width="280" height="67" /> 
    <rect x="0" y="404" rx="13" ry="13" width="110" height="39" /> 
    <rect x="168" y="403" rx="13" ry="13" width="110" height="39" />
  </ContentLoader>
)
export default PizzaLoader
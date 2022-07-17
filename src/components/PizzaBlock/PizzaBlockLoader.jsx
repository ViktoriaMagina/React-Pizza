import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#ecf4fb"
    foregroundColor="#e7f4e3"
    {...props}
  >
    <circle cx="134" cy="115" r="114" /> 
    <rect x="6" y="250" rx="20" ry="20" width="266" height="26" /> 
    <rect x="-2" y="296" rx="14" ry="14" width="280" height="99" /> 
    <rect x="2" y="420" rx="9" ry="9" width="104" height="30" /> 
    <rect x="164" y="420" rx="9" ry="9" width="114" height="31" />
  </ContentLoader>
)

export default PizzaBlockLoader


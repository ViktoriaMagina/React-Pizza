import React from "react"



interface Categories{
  pizzasCategory: number, 
  setPizzasCategory: React.Dispatch<React.SetStateAction<number>>;
}

const Categories = ({pizzasCategory ,setPizzasCategory}: Categories) => {
  let categoriesArray:string [] = ["Все" , "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
  
    return(
        <div className="categories">
        <ul>
          {categoriesArray.map((category,i) => {
            return(
              <li onClick={()=> setPizzasCategory(i)} key={i} className={i === pizzasCategory ? "active" : ""}>{category}</li>
            )
          })}
          
        </ul>
      </div>
    )
}
export default Categories
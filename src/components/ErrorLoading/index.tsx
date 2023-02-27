
import emptyCartImg from '../../assets/img/empty-cart.png'

const ErrorLoading = () => {
    return(
        <div className="cart cart--empty">
        <h2>Не удалось загрузить пиццы<span>😕</span></h2>
        <p>
            Ппоробуйте перезагрузить страницу
        </p>
        <img src={emptyCartImg} alt="Empty cart" />
      </div>
    )
}
export default ErrorLoading
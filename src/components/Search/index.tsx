import React from 'react'
import {useDispatch } from 'react-redux'
import { changeSearchText} from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce'


const Search = () => {
    const [value, setValue] = React.useState("")
    const dispatch = useDispatch()
    const inpurRef = React.useRef(null)
    const updateValue = React.useCallback(debounce((text)=> { dispatch(changeSearchText(text))}, 350), [])
    const onChangeInput = (text: string) => {
        setValue(text)
        updateValue(text)
    }
    return(
        <input className='search' ref={inpurRef} onChange={(e) => onChangeInput(e.target.value)} value={value} placeholder="Поиск пиццы" type="text" />
    )
}
export default Search
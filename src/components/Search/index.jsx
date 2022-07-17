import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux';
import React from 'react'
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('')
    const onChangeValue = (event) => {
        setValue(event.target.value)
        onChangeInput(event.target.value)
    }
    const onChangeInput = React.useCallback(
        debounce((value)=> {
            dispatch(setSearchValue(value))
        }, 500)
        , []
    )
    return(
        <input value={value} onChange={(event)=> onChangeValue(event)} className={styles.input} type="text" placeholder='Пепперони с...'/>
    )
}

export default Search;
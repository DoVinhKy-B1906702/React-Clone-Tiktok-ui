import { useState, useEffect, useRef } from 'react';

import { faCircleXmark,faSpinner,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
        const [searchValue, setSearchValue] = useState(''); 
        const [searchResult, setSearchResult] = useState([]);
        const [showResult, setShowResult] = useState(true);
        const [loading, setLoading] = useState(false);

        const inputRef = useRef();


        useEffect(() => {
                if(!searchValue.trim()) {
                        return;
                }

                setLoading(true);

                fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
                        .then(res => res.json())
                        .then(res => {
                               setSearchResult(res.data);
                               setLoading(false);
                              
                        })
                        .catch(() => {
                                setLoading(false);
                        });

        },[searchValue])

        const handleClear = () => {
                setSearchValue('');
                setSearchResult([])
                inputRef.current.focus();
        }
        const handleHideResult = () => {
                setShowResult(false);
        }

    return ( 
        <HeadlessTippy 
            interactive
            visible={ showResult && searchResult.length > 0}
            render = {attrs => (
                
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>
                                            Accounts
                                    </h4>
                                    {searchResult.map((result) => 
                                         <AccountItem key={result.id} data={result} />
                                        )}
                                   
                                </PopperWrapper>
                            </div> 
                
            )}  
            onClickOutside = {handleHideResult}
            >
            <div className={cx('search')}>
                <input 
                        value={searchValue}
                        placeholder='Seach accounts and videos'
                        spellCheck={false}
                        onChange={e => setSearchValue(e.target.value)}
                        ref={inputRef}
                        onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                ) }

                {loading && 
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                }
                
                

                <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />   
                </button>
            
            </div>
        </HeadlessTippy>
     );
}

export default Search;
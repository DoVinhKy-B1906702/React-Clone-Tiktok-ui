import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';


import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEarthAsia, faEllipsisVertical, faKeyboard, faMagnifyingGlass, faQuestionCircle, faSignIn, faSpinner, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';





import styles from './Header.module.scss'
import images from '~/assets/images';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { UploadIcon } from '~/components/Icons';
import Image from '~/components/image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
        {
                icon: <FontAwesomeIcon icon={faEarthAsia} />,
                title: 'English',
                children: {
                        title: 'Language',
                        data: [
                                {
                                        type:'language',
                                        code:'en',
                                        title:'English'
                                },
                                {
                                        type:'language',
                                        code:'vi',
                                        title:'Tiếng Việt'
                                }
                        ]
                }
        },
        {
                icon: <FontAwesomeIcon icon={faQuestionCircle} />,
                title: 'Feedback and help',
                to:'/feedback'
        },
        {
                icon: <FontAwesomeIcon icon={faKeyboard} />,
                title: 'Keyboard shortcuts',
        }
];


function Header() {
        const [searchResult, setSearchResult] = useState([]);

        const currentUser  = true ;

        useEffect(() => {
                setTimeout(() => {
                        setSearchResult([])
                }
                ,1000)
        },[])

        const handleMenuChange = (menuItem) => {
                
              switch (menuItem.type) {
                case 'language':
                       
                        break;
              
                default:
                        
              }
        }

        const userMenu = [
                {
                        icon: <FontAwesomeIcon icon={faUser} />,
                        title: 'View profile',
                        to:'/profile'
                },
                {
                        icon: <FontAwesomeIcon icon={faCoins} />,
                        title: 'Get coins',
                        to:'/coins'
                },
                {
                        icon: <FontAwesomeIcon icon={faGear} />,
                        title: 'Setting',
                        to:'/setting'
                },
                ...MENU_ITEMS,
                {
                        icon: <FontAwesomeIcon icon={faSignOut} />,
                        title: 'Log out',
                        to:'/logout',
                        seperate: true,
                },
        ]


        

        return ( 
            <header className={cx('wrapper')}>
                    <div className={cx('inner')}>
                            <div className={cx('logo')}>
                                <img className={cx('logoSvg')} src={images.logo}  alt='vietnamflag' />
                                
                            </div>
                                <HeadlessTippy 
                                        interactive
                                        visible={searchResult.length > 0}
                                        render = {attrs => (
                                               
                                                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                                            <PopperWrapper>
                                                                <h4 className={cx('search-title')}>
                                                                        Accounts
                                                                </h4>
                                                                <AccountItem />
                                                                <AccountItem />
                                                                <AccountItem />
                                                                <AccountItem />
                                                            </PopperWrapper>
                                                        </div> 
                                              
                                        )}  
                                        >
                                        <div className={cx('search')}>
                                        <input 
                                                placeholder='Seach accounts and videos'
                                                spellCheck={false}
                                        />
                                        <button className={cx('clear')}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                        </button>
                                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                                        
                                
                                        <button className={cx('search-btn')}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />   
                                        </button>
                                        
                                        </div>
                                </HeadlessTippy>


                                
                                <div className={cx('actions')}> 
                                        {currentUser ? (
                                                <>
                                                <Tippy  delay={[0,200]} content='Upload Video' placement='bottom'>
                                                        <button className={cx('action-btn')} >
                                                                <UploadIcon />
                                                        </button>
                                                </Tippy>
                                                </>
                                        ): (
                                                <>
                                                        <Button outline rightIcon={<FontAwesomeIcon icon={faSignIn} />} >Upload</Button>
                                                        <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />} >Log in</Button>
                                                       
                                                </>
                                )}
                                        <Menu items={currentUser ? userMenu : MENU_ITEMS}  onChange={handleMenuChange}>
                                                {currentUser ? (
                                                        <Image 
                                                                src={images.logo3} 
                                                                className={cx('user-avatar')} 
                                                                alt='avatar' 
                                                                fallBack={images.noImage} 
                                                        />
                                                ) : (
                                                        
                                                        <button className={cx('more-btn')}>
                                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                                        </button>
                                                )}
                                               
                                        </Menu>
                                </div>

                    </div>
            </header>
     );
}

export default Header;
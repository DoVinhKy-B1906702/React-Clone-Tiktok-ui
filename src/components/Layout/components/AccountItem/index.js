import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
const cx = classNames.bind(styles)

function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={images.logo3}   alt='Hoa'  />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Do Vinh Ky</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>kydo260501</span>
            </div>
        </div>
     );
}

export default AccountItem;
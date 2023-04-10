import React from 'react'
import { KeyboardArrowDownOutlined, KeyboardArrowRightOutlined, LocalMallOutlined, PersonOutline } from '@mui/icons-material'

export default function Header() {
    return (
        <div className='header-container'>
            <div className='header'>
                <div className='header-left'>
                    <div className='header-left__logo'>MiMin shop</div>
                    <ul className='header-left__menu'>
                        <li>Trang chủ</li>
                        <li>
                            Điện thoại <KeyboardArrowDownOutlined style={{ marginLeft: '5px' }} />
                            <ul className='sub-menu'>
                                <li>Samsung <KeyboardArrowRightOutlined /></li>
                                <li>Apple  <KeyboardArrowRightOutlined /></li>
                                <li>Oppo</li>
                                <li>Xiaomi</li>
                                <li>Realme</li>
                            </ul>
                        </li>
                        <li>Pages <KeyboardArrowDownOutlined style={{ marginLeft: '5px' }} /></li>
                        <li>Khuyến mại</li>
                    </ul>
                </div>
                <div className='header-right'>
                    <div className='header-right__btn'>
                        <PersonOutline />
                    </div>
                    <div className='header-right__btn'>
                        <LocalMallOutlined />
                        <div className="count-cart">3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

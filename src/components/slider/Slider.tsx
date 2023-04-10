import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React, { useCallback, useState } from 'react'

interface SliderProps {
    data: SliderTypeProps[];
}
export default function Slider({ data }: SliderProps) {
    const [activeImage, setActiveImage] = useState<number>(0);

    const nextSlider = useCallback(
        () => {
            const index = activeImage + 1 === data.length ? 0 : activeImage + 1;
            setActiveImage(index);
        },
        [activeImage, data],
    )

    const prevSlider = () => {
        const index = activeImage - 1 < 0 ? data.length - 1 : activeImage - 1;
        setActiveImage(index);
    }
    
    return (
        <div className='slider'>
            {
                data.map((item, index) => {
                    return (
                        <SliderItem
                            key={index}
                            item={item}
                            active={index === activeImage}
                        />
                    )
                })
            }
            <div className="slider-control">
                <div className="slider-control__item" onClick={prevSlider}>
                    <ArrowBackIos style={{ fontSize: 18 }}/>
                </div>
                <div className="slider-control__item length">
                    {activeImage + 1}/{data.length}
                </div>
                <div className="slider-control__item" onClick={nextSlider}>
                    <ArrowForwardIos style={{ fontSize: 18 }}/>
                </div>
            </div>
        </div>
    )
}

interface SliderTypeProps {
    title: string;
    description: string;
    image: string;
    color: string;
    path: string;
}

interface SliderItemProps {
    item: SliderTypeProps;
    active: any;
}
export function SliderItem({ item, active }: SliderItemProps) {
    
    return (
        <div className={`slider-item container ${active ? 'active' : ''}`}>
            <div className="slider-item__info">
                <div className={`slider-item__info-title color-${item.color}`}>
                    <span>{item.title}</span>
                </div>
                <div className="slider-item__info-desc">
                    <span>{item.description}</span>
                </div>
                <div className='slider-item__info-btn'>
                    <button className={`bg-${item.color}`}>chi tiết</button>
                </div>
            </div>
            <div className="slider-item__image">
                <div className={`shape bg-${item.color}`}></div>
                <img src={item.image} alt="slider-img" />
            </div>
        </div>
    )
}
import React, {useRef, useState} from 'react';
import "../../styles/about.scss"
import Helmet from "../../layout/Helmet";
import useParallax from "../../CustomHooks/useParallaxHook";
import Partner from "../../static/img/partners.png"
import Img1 from "../../static/img/image 51.png"
import Img2 from "../../static/img/image 52.png"
import Img3 from "../../static/img/image 53.png"
import Img4 from "../../static/img/image 54.png"
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";
import handleScroll from "aos/src/js/helpers/handleScroll";
import PlayIcon from '../../static/img/caret-forward-circle-outline.svg';
import Footer from "../../layout/Footer";


const About = ({src, width, height}) => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const house = {
        title: "РЕАЛИЗАТОРЫ  ВАШИХ \n"   +
            "ЖЕЛАНИЙ  ОТ  НАЧАЛО  \n" +
            "ДО КОНЦА",
        subtitle: "ARCHITECTURE + DESIGN + CONSTRUCTION",
        shortDesc: "Можно сколько угодно рассказывать про дизайн, но лучше посмотреть на что мы способны. Каждая работа выполняется индивидуально, поэтому посмотрев наши работы. Вы можете созвониться с нами, для того чтобы обсудить свой уникальный заказ\n"
    };
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    function togglePlay() {
        setIsPlaying(!isPlaying);
        isPlaying ? videoRef.current.pause() : videoRef.current.play();

    }
    return (
        <Helmet title="About">
            <section className="about">
                <div className="container">
                    <div style={bgParallaxStyle} className="common__wrapper about__wrapper">
                        <div className="common__inner">
                            <h2 className="common__title about__title">{house.title}</h2>
                            <p className="common__subtitle about__subtitle">{house.subtitle}</p>
                        </div>
                    </div>
                    {
                        handleScroll ? <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/>
                            : null
                    }
                </div>
            </section>
            <section className="short-desc about-desc" style={bgParallaxStyle}>
                <div className="container">
                    <div className="partner-wrapper">
                        <img className="partner-wrapper__image" src={Partner} alt=""/>
                        <p className="partner-wrapper__subtitle">
                            {house.shortDesc}
                        </p>
                    </div>
                </div>
            </section>
            <section className="video-player" >
                <div className="container">
                    <video
                        ref={videoRef}
                        src={"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                        width={width}
                        height={height}
                        onClick={togglePlay}
                        className="video"
                    />
                    <img
                        src={PlayIcon}
                        alt="Play Icon"
                        onClick={togglePlay}
                        className={`play-icon ${isPlaying ? 'hide' : ''}`}
                    />
                </div>
            </section>
            <section className="all-des">
                <h4 className="all-des__title">Мы создатели удобства <br/> красоты и прочности</h4>
                <p className="all-des__des">
                    Наша компания ADC  является одним из лидеров дизайн архитектуры в отрасли <br/>
                    строительства. Сегодня компания ADC реализует проекты жилой и коммерческой <br/>
                    недвижимости не только здесь но и за пределами нашей страны, отличающихся <br/>
                    высоким качеством, стильной архитектурой, современным дизайном.
                </p>
                <div className="all-des__gallery">
                    <div className="all-des__gallery__item">
                        <img src={Img1} alt=""/>
                    </div>
                    <div className="all-des__gallery__item">
                        <img src={Img2} alt=""/>
                    </div>
                    <div className="all-des__gallery__item">
                        <img src={Img3} alt=""/>
                    </div>
                    <div className="all-des__gallery__item">
                        <img src={Img4} alt=""/>
                    </div>
                </div>
            </section>
            <Footer />
            {/*<section className="sliders" style={bgParallaxStyle}>*/}
            {/*    <div className="container">*/}
            {/*        <Slider {...settings}>*/}
            {/*            <div>*/}
            {/*                <img src={Card1} alt="Before" />*/}
            {/*                <div className="caption">Before</div>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <img src={Card2} alt="After" />*/}
            {/*                <div className="caption">After</div>*/}
            {/*            </div>*/}
            {/*        </Slider>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </Helmet>
    );
};

export default About;
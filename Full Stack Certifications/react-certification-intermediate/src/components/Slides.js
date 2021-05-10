import React, { useState } from 'react';

function Slides({slides}) {

     const [activeSlideNo, setActiveSlideNo ]  =  useState(0)
     const [currentSlide, setCurrentSlide ]  =  useState(slides[0])
     const [disablePrev, setDisablePrev ]  =  useState(true)
     const [disableNext, setDisableNext ]  =  useState(false)
     const [disableRestart, setDisableRestart ]  =  useState(true)

     const onClickNext = () => {
       let curSlideNo = activeSlideNo;
       if(curSlideNo < slides.length -1 ) {
        curSlideNo ++;
        setActiveSlideNo(curSlideNo);
        setCurrentSlide(slides[curSlideNo]);
        setDisablePrev(false);
        setDisableRestart(false);
       }
       if(curSlideNo === slides.length -1) {
         setDisableNext(true);
       }
     }

    const onClickPrev = () => {
       let curSlideNo = activeSlideNo;
       if(curSlideNo > 0 ) {
        curSlideNo --;
        setActiveSlideNo(curSlideNo);
        setCurrentSlide(slides[curSlideNo]);
        setDisableNext(false);
       }
       if(curSlideNo === 0 ) {
         setDisablePrev(true);
         setDisableRestart(true);
       }
     }
     const onClickRestart = () => {
      setActiveSlideNo(0);
      setCurrentSlide(slides[0]);
      setDisablePrev(true);
      setDisableNext(false);
      setDisableRestart(true);
     }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button disabled={disableRestart} data-testid="button-restart" className="small outlined" onClick={() => onClickRestart()} >Restart</button>
                <button disable={disablePrev} data-testid="button-prev" className="small" onClick={() => onClickPrev()} >Prev</button>
                <button data-testid="button-next" className="small" onClick={() => onClickNext()} >Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{currentSlide.title}</h1>
                <p data-testid="text">{currentSlide.text}</p>
            </div>
        </div>
    );

}

export default Slides;

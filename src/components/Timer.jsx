import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useWindowSize } from '@hooks/useWindowSize';

const Timer = (props) => {
    
    const [HH, setHH] = useState(null);
    const [MM, setMM] = useState(null);
    const [SS, setSS] = useState(null);
    const sizes = useWindowSize()
    
    useEffect(() => {     
        let now = moment();
        let end = moment(props.end, 'DD/MM/YYYY hh:mm:ss');
        let h  = end.diff(now, 'hours');
        let m  = end.diff(now, 'minutes') - (60 * h);
        let s  = end.diff(now, 'seconds') - (60 * 60 * h) - (60 * m);
        
        let hh = ('0' + h).slice(-2);
        let mm = ('0' + m).slice(-2);
        let ss = ('0' + s).slice(-2);
        if(end.isAfter(now)){
          setTimeout(() => {
                setHH(hh);
                setMM(mm);
                setSS(ss);
              }, 1000);
            }else{
                setHH("00");
                setMM("00");
                setSS("00");
            }
    });
    
    return (
      <div className={`text-right  ${sizes.width > 420 ? "w-auto" : "w-full"}`}>
        <div class={`text-[#c80000] flex w-full gap-x-2 text-center flex-row-reverse text-xs sm:text-sm font-medium`}>
          <div class={`${sizes.width > 420 ? "w-[60px]" : "basis-1/3"} bg-white rounded-2xl py-2 shadow-md shadow-gray-500`}>
            <div class="font-mono leading-none" x-text="seconds">
              {SS}
            </div>
            <div class="uppercase leading-none mt-1">Giây</div>
          </div>
          <div class={`${sizes.width > 420 ? "w-[60px]" : "basis-1/3"} bg-white rounded-2xl py-2 shadow-md shadow-gray-500`}>
            <div class="leading-none" x-text="minutes">
              {MM}
            </div>
            <div class="uppercase leading-none mt-1">Phút</div>
          </div>
          <div class={`${sizes.width > 420 ? "w-[60px]" : "basis-1/3"} bg-white rounded-2xl py-2 shadow-md shadow-gray-500`}>
            <div class="leading-none" x-text="hours">
              {HH}
            </div>
            <div class="uppercase leading-none mt-1">Giờ</div>
          </div>

          {/* <div class="w-12 mx-1 p-2 bg-white rounded-2xl shadow-md">
            <div class="font-mono leading-none" x-text="days">
              00
            </div>
            <div class="font-mono uppercase text-sm leading-none">Ngày</div>
          </div> */}
        </div>
        {/* <div className={`text-gray-500 text-xs mr-2 mt-2 ${props.center ? "text-center sm:text-right" :  "text-left sm:text-right" } ${props.center == "right" && "a-right"}`}>
          {moment(props.item?.createdAt).fromNow()}
        </div> */}
      </div>
    );
    
}

export default Timer;

import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TimerHome = (props) => {
    
    const [HH, setHH] = useState(null);
    const [MM, setMM] = useState(null);
    const [SS, setSS] = useState(null);
    
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
      <div class="text-[#c80000] text-xs flex font-bold mr-2">
          {/* <div class="w-12 mx-1 p-2 bg-white rounded-lg shadow-md">
          <div class=" leading-none" x-text="days">
            00
          </div>
          <div class=" uppercase text-sm leading-none">Ngày</div>
        </div> */}
          <div className="flex leading-none">
            <svg className="w-3 h-3 text-[#c80000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg> <span className='ml-1'>{HH}:{MM}</span>
          </div>
      </div>
    );
    
}

export default TimerHome;

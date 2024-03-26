import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';

const LeaderBoard = ({title="TOP HIỆP SĨ", usersRanking}) => {
    return (
      <div className="">
      {title && (
        <h3 class="mb-3 px-0 xl:px-2 text-base font-bold text-gray-900 flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-gray-800 mr-1.5" stroke-width={3} viewBox="0 0 24 24">  <path fill="none" stroke-width={3} d="M0 0h24v24H0z"/> <path d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604zM11 10V7h2v3h3v2h-3v3h-2v-3H8v-2h3z"/> </svg>
         {title}
        </h3>
      )}
      {usersRanking?.map((item, index) => {
        if (index < 5) {
          return (
            <Link
              key={index}
              href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
            >
              <div class={`flex items-center gap-x-4 py-3 ${index !== 0 && "border-t"} border-gray-300`}>
                <div class="flex items-center basis-1/3 sm:basis-1/4 md:basis-1/5">
                    <div className={`flex items-center justify-center ${index >= 3  ? "w-12 h-12 xl:w-10 xl:h-10 mr-2 rounded-md bg-white rounded-lg shadow-sm shadow-gray-300" : "w-14 h-14 xl:w-12 xl:h-12"}`}>
                        {
                          index < 3 ? <Image width={0} height={0} sizes="100vw" src={
                            index === 0 
                            ? "/icons/gold-medal.png" 
                            : index === 1 ?"/icons/silver-medal.png" 
                            : "/icons/bronze-medal.png"
                            } 
                            alt="" 
                            /> : <div className='text-xl font-bold text-center'>{index + 1}</div>
                        }
                    </div>
                  <div className="w-14 h-14 xl:w-12 xl:h-12 ml-2 xl:ml-0 p-1 rounded-full border border-black">
                    <Image width={0} height={0} sizes="100vw"
                      class="w-full h-full rounded-full"
                      src={item?.photo ? item?.photo : "/dumuc/avatar.png"}
                      alt={item?.name}
                    />
                  </div>
                </div>
                <div className="basis-2/3 sm:basis-3/4 md:basis-4/5 flex justify-between items-center md:flex-1 md:min-w-0 text-base text-gray-900 rounded-md bg-white rounded-md py-1.5 px-3 xl:p-0 shadow-sm shadow-gray-300 xl:shadow-none">
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <div className="font-medium break-all leading-none">{item?.name}</div>
                      <div className="line-clamp-1 text-xs font-normal">Tham gia <span className='font-medium'>{moment(item?.createdAt).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="text-[#c80000] text-sm font-medium mr-2">+{item?.rankingValue}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </div>
    );
}

export default LeaderBoard;

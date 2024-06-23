import React from "react";

export default function FeedCommentReplyItems() {
  return (
    <div className="flex relative" key={index}>
      {index < item?.replies?.length - 1 && (
        <div className="absolute w-[0.5px] h-full bg-gray-400 -left-[30px] top-[25px]"></div>
      )}
      <div className="absolute w-[20px] h-[0.5px] bg-gray-400 top-[25px] -left-[30px]"></div>
      <div className="flex justify-between my-2">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-10 h-10 rounded-full"
          src={reply?.user?.photo ? reply?.user?.photo : "/dumuc/avatar.jpg"}
          alt={reply?.user?.name}
        />
        <div className="mx-2">
          <div className="text-sm font-semibold">{reply?.name}</div>
          <div className="text-sm">
            <strong>@{reply?.replyToName}</strong>
          </div>
          <div
            className={`grid grid-cols-3 justify-center items-center gap-x-2 ${
              reply?.photos?.length > 0 && "my-2"
            }`}
          >
            {reply?.photos?.map((photo, index) => (
              <div
                key={index}
                className="w-full h-full"
                onClick={() => {
                  setOpenImage(true);
                  setImageList(reply?.photos);
                  setIndex(index);
                }}
              >
                {
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={photo}
                    className="w-full h-full rounded-lg"
                  />
                }
              </div>
            ))}
          </div>
          <div className="text-sm">{reply?.body}</div>
          <div className="text-sm text-gray-500">
            {moment(reply?.createdAt).fromNow()}
            <button
              className="text-[#c80000] font-bold cursor-pointer ml-2"
              type="button"
              onClick={() => {
                if (user) {
                  setCommentId(item?.commentId);
                  setReplyToName(reply?.name);
                  setIsCommentModal(true);
                } else {
                  router.push("/auth");
                }
              }}
            >
              Trả lời
            </button>
          </div>
          <FeedCommentReplyModal
            commentId={commentId}
            replyToName={replyToName}
            visible={isCommentModal}
            setIsCommentModal={setIsCommentModal}
            onCreateReply={onCreateReply}
            onCancel={() => setIsCommentModal(false)}
            onCallback={onCallback}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}

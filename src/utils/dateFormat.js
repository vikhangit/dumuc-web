import moment from "moment";

export const DateTimeLog = (dateLog, addHours) => {
    let timelog = new Date(dateLog);
    if(addHours >=60){
      timelog.setHours(timelog.getHours() + (Number(addHours) /60));
    }else{
      timelog.setMinutes(timelog.getMinutes() + Number(addHours));
    }
    let date = `${timelog.getDate() < 10 ? "0" : ""}${timelog.getDate()}`;
    let month = `${timelog.getMonth() + 1 < 10 ? "0" : ""}${
      timelog.getMonth() + 1
    }`;
    let year = timelog.getFullYear();
    let hours = `${timelog.getHours() < 10 ? "0" : ""}${timelog.getHours()}`;
    let minutes = `${
      timelog.getMinutes() < 10 ? "0" : ""
    }${timelog.getMinutes()}`;
    let seconds = `${
      timelog.getSeconds() < 10 ? "0" : ""
    }${timelog.getSeconds()}`;
    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const getTimeChat = (date) => {
  moment.locale("vi");
  return moment(date)
    .fromNow()

    .replace("seconds", "giây")
    .replace("second", "giây")
    .replace("minutes", "phút")
    .replace("minute", "phút")
    .replace("hours", "giờ")
    .replace("hour", "giờ")
    .replace("days", "ngày")
    .replace("day", "ngày")
    .replace("a ", "1 ")
    .replace("an ", "1 ")
    .replace("month", "tháng")
    .replace("year", "năm")
    .replace("in", "")
    .replace("ago", "")
    .replace("few", "");
};

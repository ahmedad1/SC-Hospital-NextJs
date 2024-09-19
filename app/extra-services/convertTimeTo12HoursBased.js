export default function convertTimeTo12HoursBased(time) {
    time = time.split(":");
    time = time.slice(0, 2);
    let hours = time[0];
    let AMorPM = " Am";
    if (+hours > 12) {
      hours -= 12;
      AMorPM = " Pm";
    }else if(+hours==12)
      AMorPM=" Pm" 
    else if (+hours == 0) hours = 12;
    time[0] = hours.toString().padStart(2, "0");

    return time.join(":") + AMorPM;
  }
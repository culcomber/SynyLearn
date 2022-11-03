const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime,durationMinutes) {
    // todo 组匹配
    const matchTime = /(.+):(.+)/;
    const time = startTime.match(matchTime);
    const hour = Number(time[1]);
    const min = Number(time[2]);

    const timeStart = dayStart.match(matchTime);
    const hourStart = Number(timeStart[1]);
    const minStart = Number(timeStart[2]);

    if (hour < hourStart || (hour === hourStart && min < minStart)) {
        console.log(false);
        return false;
    }
    const timeEnd = dayEnd.match(matchTime);
    const hourEnd = Number(timeEnd[1]);
    const minEnd = Number(timeEnd[2]);

    const minNew = (min + Number(durationMinutes)) % 60;
    const hourMore = (min + Number(durationMinutes)) / 60;
    //todo 除法会保留小数
    const hourNew = parseInt(hourMore.toString()) + hour;

    const result = hourNew < hourEnd || (hourNew === hourEnd && minNew <= minEnd);
    console.log(result);
    return result;
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false

function scheduleMeeting1(startTime,durationMinutes) {
    // todo 解构赋值 判空处理
    var [ , meetingStartHour, meetingStartMinutes ] = startTime.match(/^(\d{1,2}):(\d{2})$/) || [];

    // todo Number
    durationMinutes = Number(durationMinutes);

    if (typeof meetingStartHour == "string" && typeof meetingStartMinutes == "string") {
        let durationHours = Math.floor(durationMinutes / 60);
        durationMinutes = durationMinutes - (durationHours * 60);
        let meetingEndHour = Number(meetingStartHour) + durationHours;
        let meetingEndMinutes = Number(meetingStartMinutes) + durationMinutes;

        if (meetingEndMinutes >= 60) {
            meetingEndHour = meetingEndHour + 1;
            meetingEndMinutes = meetingEndMinutes - 60;
        }

        // re-compose fully-qualified time strings
        // (to make comparison easier)
        let meetingStart = `${meetingStartHour.padStart(2,"0")}:${meetingStartMinutes.padStart(2,"0")}`;
        let meetingEnd = `${String(meetingEndHour).padStart(2,"0")}:${String(meetingEndMinutes).padStart(2,"0")}`;

        // NOTE: since expressions are all strings,
        // comparisons here are alphabetic, but it's
        // safe here since they're fully qualified
        // time strings (ie, "07:15" < "07:30")
        return (
            meetingStart >= dayStart &&
            meetingEnd <= dayEnd
        );
    }

    return false;
}

import {
    GymAttendanceState,
    type ClientGymAttendanceItem,
} from "~/reactQuery/gymAttendance/services";

const ratingWindowMs = 24 * 60 * 60 * 1000;

export const sortAttendancesNewestFirst = (
    attendances: ClientGymAttendanceItem[],
) =>
    [...attendances].sort(
        (first, second) =>
            new Date(second.createdMoment).getTime() -
            new Date(first.createdMoment).getTime(),
    );

export const getLatestRateableAttendance = (
    attendances: ClientGymAttendanceItem[],
    now = Date.now(),
) => {
    const latestUsedAttendance = sortAttendancesNewestFirst(attendances).find(
        (attendance) =>
            attendance.gymAttendanceState === GymAttendanceState.Used,
    );

    if (
        !latestUsedAttendance ||
        latestUsedAttendance.givenRate != null ||
        latestUsedAttendance.expirePaymentCode === null
    ) {
        return undefined;
    }

    const expiresAt = new Date(latestUsedAttendance.expirePaymentCode).getTime();
    return Number.isFinite(expiresAt) && now <= expiresAt + ratingWindowMs
        ? latestUsedAttendance
        : undefined;
};

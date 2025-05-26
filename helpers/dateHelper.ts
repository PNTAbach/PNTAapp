export const getDayInInt = (day: string): number => {
    if (day === 'Monday') return 0;
    else if (day === 'Tuesday') return 1;
    else if (day === 'Wednesday') return 2;
    else if (day === 'Thursday') return 3;
    else if (day === 'Friday') return 4;
    else if (day === 'Saturday') return 5;
    else if (day === 'Sunday') return 6;
    else return -1;
};
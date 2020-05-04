/**
 * microCMSから受け取った日付データを表示用に整形して返す
 * @param d 日付データ
 * @param detail 詳細表示を行うか(trueのときはx時x分まで表示)
 */
const generateDisplayDate = (d: string, detail?: boolean): string => {
  const date = new Date(d);
  const dateNum = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
  };
  if (detail)
    return `${dateNum.year}年${dateNum.month}月${dateNum.day}日 ${dateNum.hour}時${dateNum.minutes}分`;
  return `${dateNum.year}年${dateNum.month}月${dateNum.day}日`;
};

export default generateDisplayDate;

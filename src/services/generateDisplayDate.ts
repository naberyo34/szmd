// microCMSから受け取った日付データから表示用の文字列を生成する
const generateDisplayDate = (d: string): string => {
  const date = new Date(d);
  const dateNum = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };

  return `${dateNum.year}年${dateNum.month}月${dateNum.day}日`;
};

export default generateDisplayDate;

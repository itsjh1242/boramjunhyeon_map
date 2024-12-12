class Config {
  // 처음 만난 날짜
  firstMeet: Date;
  // 연애 시작 날짜
  firstDate: Date;

  constructor() {
    this.firstMeet = new Date("2024-08-02");
    this.firstDate = new Date("2024-12-01");
  }

  daysFromFirstMeet() {
    const today = new Date();
    const diffInMs = Math.abs(today.getTime() - this.firstMeet.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  daysFromFirstDate() {
    const today = new Date();
    const diffInMs = Math.abs(today.getTime() - this.firstDate.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }
}

export default Config;

interface dataPoint {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  userId: string;
  isStart: boolean;
  isRemote: boolean;
}

function startup() {
  edom.init();
  new app().render(edom.body);
}

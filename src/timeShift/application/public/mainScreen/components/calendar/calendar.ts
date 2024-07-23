class calendar implements Component {
  private readonly month: number;
  private readonly year: number;
  private readonly event: (day: number, month: number, year: number) => void;

  public constructor(
    month: number,
    year: number,
    event: (day: number, month: number, year: number) => void,
  ) {
    this.month = month;
    this.year = year;
    this.event = event;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    const now: Date = new Date();
    return {
      tag: "div",
      classes: ["calendar"],
      children: [
        ...["M", "D", "M", "D", "F", "S", "S"].map((day: string) =>
          new button(day, () => {}, [
            "squareButton",
            "disabledButton",
          ]).instructions(),
        ),
        ...Array.from(
          { length: this.jsWeekdayToOffset(this.getWeekdayOfFirstDay()) },
          (_, i) => i + 1,
        ).map((i: number) =>
          new button("", () => {}, [
            "squareButton",
            "disabledButton",
          ]).instructions(),
        ),
        ...Array.from({ length: this.getDaysInMonth() }, (_, i) => i + 1).map(
          (day: number) =>
            new button(
              day.toString(),
              () => this.event(day, this.month + 1, this.year),
              ["squareButton", ...(now.getFullYear() === this.year && now.getMonth() === this.month && now.getDate() === day ? ["timeShift_button_inverted"] : [])],
            ).instructions(),
        ),
      ],
    };
  }

  private jsWeekdayToOffset(jsWeekDay: number): number {
    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // bloody americans, bloody javascript

    if (jsWeekDay === 0) {
      return 6;
    }
    return jsWeekDay - 1;
  }

  private getWeekdayOfFirstDay(): number {
    return new Date(this.year, this.month, 1).getDay();
  }

  private getDaysInMonth(): number {
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  public unload() {}
}

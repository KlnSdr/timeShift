class calendarPanel implements Component {
  private readonly calendarId: string = "calendar" + Math.random().toString(36);
  private readonly monthOutLabelId: string =
    "monthOutLabel" + Math.random().toString(36);

  private currentMonth: number = new Date().getMonth();
  private currentYear: number = new Date().getFullYear();

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["calendarPanel"],
      children: [
        {
          tag: "div",
          classes: ["calendarHeader"],
          children: [
            new button("<", this.decrementMonth.bind(this), [
              "squareButtonSmol",
            ]).instructions(),
            {
              tag: "label",
              text: `${this.getCurrentMonthName()} ${this.getCurrentYear()}`,
              id: this.monthOutLabelId,
            },
            new button(">", this.incrementMonth.bind(this), [
              "squareButtonSmol",
            ]).instructions(),
          ],
        },
        this.createCalendar(),
      ],
    };
  }

  public unload() {}

  private decrementMonth(self: edomElement) {
    this.currentMonth--;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    this.updateCalendarComponent(self);
    this.updateMonthOutLabel();
  }

  private incrementMonth(self: edomElement) {
    this.currentMonth++;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    this.updateCalendarComponent(self);
    this.updateMonthOutLabel();
  }

  private updateCalendarComponent(bttn: edomElement) {
    const panel = bttn.parent?.parent;
    edom.findById(this.calendarId)?.delete();
    edom.fromTemplate([this.createCalendar()], panel);
  }

  private updateMonthOutLabel() {
    edom.findById(this.monthOutLabelId)!.text =
      `${this.getCurrentMonthName()} ${this.getCurrentYear()}`;
  }

  private createCalendar(): edomTemplate {
    const _calendar: edomTemplate = new calendar(
      this.currentMonth,
      this.currentYear,
    ).instructions();
    _calendar.id = this.calendarId;
    return _calendar;
  }

  private getCurrentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString("de", {
      month: "long",
    });
  }

  private getCurrentYear(): number {
    return this.currentYear;
  }
}

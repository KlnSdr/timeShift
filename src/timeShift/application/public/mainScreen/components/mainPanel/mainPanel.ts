class mainPanel implements Component {
  private infoTablePanel: infoTablePanel = new infoTablePanel();

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    setTimeout(() => {
      this.loadAndOpenDay(
        new Date().getDate(),
        new Date().getMonth() + 1,
        new Date().getFullYear(),
      );
    }, 100);
    return {
      tag: "div",
      classes: ["mainPanel"],
      children: [
        new startStopPanel().instructions(),
        new calendarPanel(this.loadAndOpenDay.bind(this)).instructions(),
        this.infoTablePanel.instructions(),
      ],
    };
  }

  private loadAndOpenDay(day: number, month: number, year: number) {
    fetch(`{{CONTEXT}}/rest/time-tracking/${year}/${month}/${day}`, {})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP " + response.status);
      })
      .then(({ data }: { data: dataPoint[] }) => {
        this.infoTablePanel.update(data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  public unload() {}
}

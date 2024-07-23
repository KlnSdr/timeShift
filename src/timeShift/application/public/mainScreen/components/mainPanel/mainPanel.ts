class mainPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["mainPanel"],
      children: [
        new startStopPanel().instructions(),
        new calendarPanel(mainPanel.loadAndOpenDay).instructions(),
        new infoTablePanel().instructions(),
      ],
    };
  }

  private static loadAndOpenDay(day: number, month: number, year: number) {
    fetch(`{{CONTEXT}}/rest/time-tracking/${year}/${month}/${day}`, {})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP " + response.status);
      })
      .then(({ data }: { data: dataPoint[] }) => {
        console.log(data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  public unload() {}
}

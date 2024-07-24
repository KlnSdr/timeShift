class infoTablePanel implements Component {
  private readonly idPanel: string =
    "infoTablePanel" + Math.random().toString(36).substring(7);
  private readonly idTblBuchungen: string =
    "tblBuchungen" + Math.random().toString(36).substring(7);
  private readonly idTblSalden: string =
    "tblSalden" + Math.random().toString(36).substring(7);

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["infoTablePanel"],
      id: this.idPanel,
      children: [],
    };
  }

  public update(data: dataPoint[]) {
    const tblBuchungen: edomElement | undefined = edom.findById(
      this.idTblBuchungen,
    );
    const tblSalden: edomElement | undefined = edom.findById(this.idTblSalden);
    if (tblBuchungen) {
      tblBuchungen.delete();
    }
    if (tblSalden) {
      tblSalden.delete();
    }

    edom.fromTemplate(
      [
        new infoTable(
          "Buchungen",
          this.idTblBuchungen,
          data,
          infoTablePanel.renderDataBuchungen,
        ).instructions(),
        new infoTable(
          "Saldenübersicht",
          this.idTblSalden,
          data,
          infoTablePanel.renderDataSalden,
        ).instructions(),
      ],
      edom.findById(this.idPanel),
    );
  }

  private static renderDataSalden(data: dataPoint[]): edomTemplate[] {
    const enhancedData: {
      text: string;
      time: string;
      clazz: string[];
      additionalText: string;
    }[] = infoTablePanel.enhanceData(data);
    const firstArrival: string = enhancedData.filter((d) => d.text === "kommen")
      .length
      ? enhancedData.filter((d) => d.text === "kommen")[0].time
      : "--:--";
    const lastDeparture: string = enhancedData.filter((d) => d.text === "gehen")
      .length
      ? enhancedData.filter((d) => d.text === "gehen")[
          enhancedData.filter((d) => d.text === "gehen").length - 1
        ].time
      : "--:--";
    const totalPresence: string =
      infoTablePanel.calculateTotalPresence(enhancedData);
    const totalBreak: string = infoTablePanel.calculateTotalBreak(enhancedData);
    const totalWork: string = infoTablePanel.calculateTotalWork(
      totalPresence,
      totalBreak,
    );
    return [
      {
        tag: "tr",
        children: [
          {
            tag: "td",
            text: "Kommen",
          },
          {
            tag: "td",
            text: firstArrival,
          },
        ],
      },
      {
        tag: "tr",
        children: [
          {
            tag: "td",
            text: "Gehen",
          },
          {
            tag: "td",
            text: lastDeparture,
          },
        ],
      },
      {
        tag: "tr",
        children: [
          {
            tag: "td",
            text: "Anwesenheit",
          },
          {
            tag: "td",
            text: totalPresence,
          },
        ],
      },
      {
        tag: "tr",
        children: [
          {
            tag: "td",
            text: "Pausenzeit",
          },
          {
            tag: "td",
            text: totalBreak,
          },
        ],
      },
      {
        tag: "tr",
        children: [
          {
            tag: "td",
            text: "Arbeitszeit",
          },
          {
            tag: "td",
            text: totalWork,
          },
        ],
      },
    ];
  }

  private static renderDataBuchungen(data: dataPoint[]): edomTemplate[] {
    return infoTablePanel
      .enhanceData(data)
      .map(
        (point: {
          text: string;
          time: string;
          clazz: string[];
          additionalText: string;
        }) => {
          return {
            tag: "tr",
            children: [
              {
                tag: "td",
                classes: ["fa", ...point.clazz],
              },
              {
                tag: "td",
                text: point.time,
              },
              {
                tag: "td",
                text: point.text,
              },
              {
                tag: "td",
                text: point.additionalText,
              },
            ],
          };
        },
      );
  }

  private static calculateTotalWork(
    totalPresence: string,
    totalBreak: string,
  ): string {
    if (totalPresence !== "--:--" && totalBreak !== "--:--") {
      const [hoursPresence, minutesPresence] = totalPresence.split(":");
      const [hoursBreak, minutesBreak] = totalBreak.split(":");
      let totalHours: number = parseInt(hoursPresence) - parseInt(hoursBreak);
      let totalMinutes: number =
        parseInt(minutesPresence) - parseInt(minutesBreak);
      if (totalMinutes < 0) {
        totalHours -= 1;
        totalMinutes += 60;
      }
      return `${totalHours}:${totalMinutes}`;
    }
    return "--:--";
  }

  private static calculateTotalBreak(
    data: {
      text: string;
      time: string;
      clazz: string[];
      additionalText: string;
    }[],
  ): string {
    const breaks: string[] = data
      .filter((d) => d.text === "Ruhepause")
      .map((d) => d.additionalText.replace(" h", ""));

    if (breaks.length) {
      let sumHours: number = 0;
      let sumMinutes: number = 0;
      breaks.forEach((b) => {
        const [hours, minutes] = b.split(":");
        sumHours += parseInt(hours);
        sumMinutes += parseInt(minutes);
      });
      sumHours += Math.floor(sumMinutes / 60);
      sumMinutes = sumMinutes % 60;
      return `${sumHours}:${sumMinutes}`;
    }

    return "--:--";
  }

  private static calculateTotalPresence(
    data: {
      text: string;
      time: string;
      clazz: string[];
      additionalText: string;
    }[],
  ): string {
    const firstArrival: string | undefined = data.filter(
      (d) => d.text === "kommen",
    ).length
      ? data.filter((d) => d.text === "kommen")[0].time
      : undefined;
    const lastDeparture: string | undefined = data.filter(
      (d) => d.text === "gehen",
    ).length
      ? data.filter((d) => d.text === "gehen")[
          data.filter((d) => d.text === "gehen").length - 1
        ].time
      : undefined;

    if (!(firstArrival && lastDeparture)) {
      return "--:--";
    }

    const arrival: string[] = firstArrival.split(":");
    const departure: string[] = lastDeparture.split(":");
    const arrivalMinutes: number =
      parseInt(arrival[0]) * 60 + parseInt(arrival[1]);
    const departureMinutes: number =
      parseInt(departure[0]) * 60 + parseInt(departure[1]);
    const totalMinutes: number = departureMinutes - arrivalMinutes;
    const totalHours: number = Math.floor(totalMinutes / 60);
    const totalMinutesMod: number = totalMinutes % 60;

    return `${totalHours}:${totalMinutesMod}`;
  }

  private static enhanceData(
    data: dataPoint[],
  ): { text: string; clazz: string[]; time: string; additionalText: string }[] {
    const out: {
      text: string;
      clazz: string[];
      time: string;
      additionalText: string;
    }[] = [];

    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      out.push({
        text: point.isStart ? "kommen" : "gehen",
        clazz: [
          point.isStart ? "fa-arrow-circle-right" : "fa-arrow-circle-left",
          point.isStart ? "green" : "red",
        ],
        time: `${point.hour}:${point.minute}`,
        additionalText: "",
      });

      if (!point.isStart && i < data.length) {
        const nextPoint = data[i + 1];
        if (nextPoint) {
          const diff =
            (nextPoint.hour - point.hour) * 60 +
            nextPoint.minute -
            point.minute;
          out.push({
            text: "Ruhepause",
            clazz: ["fa-pause-circle", "yellow"],
            time: out[out.length - 1].time,
            additionalText: `${Math.floor(diff / 60)}:${diff % 60 < 10 ? "0" : ""}${diff % 60} h`,
          });
        }
      }
    }
    return out;
  }

  public unload() {}
}

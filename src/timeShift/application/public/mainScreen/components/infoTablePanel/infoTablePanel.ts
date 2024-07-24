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
          () => [],
        ).instructions(),
      ],
      edom.findById(this.idPanel),
    );
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

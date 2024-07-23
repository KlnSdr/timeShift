class startStopPanel implements Component {
  private readonly buttonId: string =
    "startStopButton" + Math.random().toString(36).substring(7);
  private text: string = "";

  constructor() {
    this.getButtonContent()
      .then((text: string) => {
        this.text = text;
        const bttn: edomElement | undefined = edom.findById(this.buttonId);
        if (bttn) {
          bttn.text = this.text;
        }
      })
      .catch((error: string) => {
        alert("Error: " + error);
      });
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    const bttn: edomTemplate = new button(
      this.text,
      this.toggleAttendance.bind(this),
    ).instructions();
    bttn.id = this.buttonId;

    return {
      tag: "div",
      classes: ["startStopPanel"],
      children: [
        {
          tag: "h1",
          text: this.getCurrentTime(),
        },
        bttn,
      ],
    };
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private toggleAttendance(self: edomElement): void {
    fetch("{{CONTEXT}}/rest/time-tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRemote: false }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data: dataPoint) => {
        this.text = data.isStart ? "gehen" : "kommen";
        self.text = this.text;
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  private getButtonContent(): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch("{{CONTEXT}}/rest/time-tracking/get-next-state", {}).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((json) => {
              resolve(json["nextState"]);
            });
          } else {
            reject(response.statusText);
          }
        },
      );
    });
  }

  public unload() {}
}

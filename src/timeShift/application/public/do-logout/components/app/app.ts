class app implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      text: "you are being redirected to the login page...",
    };
  }

  public unload() {}
}

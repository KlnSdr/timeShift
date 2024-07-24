function startup() {
  edom.init();
  new app().render(edom.body);
  fetch("{{CONTEXT}}/rest/users/logout", {})
    .then((response) => {
      if (response.ok) {
        window.location.href = "{{CONTEXT}}/hades/login/";
        return;
      }
      throw new Error("Failed to logout");
    })
    .catch((error) => {
      console.error(error);
      window.location.href = "{{CONTEXT}}/hades/login/";
    });
}

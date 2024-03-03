function app() {
  return {
    prompt: "",
    placeholder: null,
    preview: "",

    init() {
      this.updatePreview();
    },

    updatePreview() {
      const regex = /{{(.*?)}}/;
      const match = this.prompt.match(regex);
      if (match) {
        const placeholderName = match[1];
        if (!this.placeholder || this.placeholder.name !== placeholderName) {
          this.placeholder = { name: placeholderName, value: "" };
        }
      } else {
        this.placeholder = null;
      }
      this.preview = this.prompt.replace(
        regex,
        this.placeholder ? this.placeholder.value : "",
      );
    },
  };
}

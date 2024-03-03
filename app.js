function app() {
  return {
    prompt: "",
    placeholders: [],
    preview: "",

    init() {
      this.updatePreview();
    },

    updatePreview() {
      const regex = /{{(.*?)}}/g;
      let match;
      let newPlaceholders = [];
      while ((match = regex.exec(this.prompt)) !== null) {
        const placeholderName = match[1];
        const existingPlaceholder = this.placeholders.find(
          (p) => p.name === placeholderName,
        );
        if (existingPlaceholder) {
          newPlaceholders.push(existingPlaceholder);
        } else {
          newPlaceholders.push({ name: placeholderName, value: "" });
        }
      }
      this.placeholders = newPlaceholders;
      this.preview = this.prompt;
      this.placeholders.forEach((placeholder) => {
        const regex = new RegExp(`{{${placeholder.name}}}`, "g");
        this.preview = this.preview.replace(regex, placeholder.value);
      });
    },
  };
}

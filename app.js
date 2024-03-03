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

    // Method to safely convert Markdown to HTML
    convertMarkdownToHtml(markdownText) {
      if (marked && typeof marked.parse === "function") {
        return marked.parse(markdownText);
      } else {
        console.error("Markdown conversion library not available.");
        return markdownText; // Return the original text if conversion is not possible
      }
    },

    get renderedPreview() {
      return this.convertMarkdownToHtml(this.preview);
    },

    copyToClipboard() {
      navigator.clipboard
        .writeText(this.preview)
        .then(() => {
          // Optional: Display a message or change the button text to indicate the text was copied
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          // Optional: Display an error message if the copy failed
          console.error("Error copying text to clipboard", err);
        });
    },
  };
}
